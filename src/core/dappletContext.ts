import { DappletProvider } from "../interfaces/dappletProvider";
import { DappletRequest } from "../types/dappletRequest";
import { DappletEngine } from "./dappletEngine";
import { DappletActivity } from "./dappletActivity";
import { ContextConfig } from '../types/contextConfig';
import { DEFAULT_CONFIG } from "../defaultConfig";
import { FeatureRegistry } from './featureRegistry';
import { DappletTxResult } from '../interfaces/dappletTxResult';
import { DappletTemplate } from '../types/dappletTemplate';
import { IncompatibleDappletError } from '../errors/incompatibleDappletError';
import { toDappletRuntime } from './helpers';
import { DappletRuntime } from 'src/types/dappletRuntime';
import { RegKey } from './regKey';

// DappletContext (DC) is created in the moment of a wallet starting.
// DC is Singleton class.
// DC loads and verifies DappletTemplates and other resources referenced in Frames. And rejects the Request if any errors.
export class DappletContext {
    public dappletProviders: DappletProvider[];
    public featureRegistry: FeatureRegistry;

    constructor(config: ContextConfig = DEFAULT_CONFIG) {
        config = { ...DEFAULT_CONFIG, ...config };
        this.dappletProviders = config.providers! || [];
        this.featureRegistry = new FeatureRegistry(config.features || []);
    }

    async processRequest(request: DappletRequest): Promise<DappletTxResult> {
        // dapplet loading and validation
        const frames = await Promise.all(
            request.frames.map(f =>
                this._loadDapplet(f.dappletId)
                    .then(d => {
                        const dappletRuntime = toDappletRuntime(d);
                        this._validateDapplet(dappletRuntime);
                        return {
                            dappletId: f.dappletId,
                            dapplet: dappletRuntime,
                            txMeta: f.txMeta
                        }
                    })
            )
        );

        const engine = new DappletEngine(frames, this);
        engine.run();

        //const activity = new DappletActivity(request, this);
        return {};
    }

    private async _loadDapplet(dappletId: string): Promise<DappletTemplate> {
        for (const provider of this.dappletProviders) {
            try {
                const dapplet = await provider.loadDapplet(dappletId);
                if (dapplet) return dapplet;
            } catch (err) { }
        }
        throw Error(`All configured providers don't contain the dapplet ${dappletId}.`);
    }

    private _validateDapplet(dapplet: DappletRuntime) {
        const incompatibleFeatures: RegKey[] = [];

        // validate and init views
        let isCompatibleViewFound = false;
        // ToDo: think about whose view is priority (wallet developer vs dapplet developer)
        for (const viewTemplate of dapplet.views) {
            const regKey = dapplet.aliases.get(viewTemplate.type);
            if (!regKey) throw new Error(`Alias ${viewTemplate.type} is not defined in usings.`);
            const viewClass = this.featureRegistry.get(regKey);

            // ToDo: validate formatters

            if (!viewClass) continue;

            isCompatibleViewFound = true;
            break;
        }

        // validate and init txBuilders
        for (const txName in dapplet.transactions) {
            const txAlias = dapplet.transactions[txName].type;
            const regKey = dapplet.aliases.get(txAlias);
            if (!regKey) throw new Error(`Alias ${txAlias} is not defined in usings.`);
            const txBuilderClass = this.featureRegistry.get(regKey);
            if (!txBuilderClass) {
                incompatibleFeatures.push(regKey);
            }
        }
        
        if (incompatibleFeatures.length > 0 || !isCompatibleViewFound) {
            throw new IncompatibleDappletError(incompatibleFeatures);
        }
    }

    async loadResource(id: string): Promise<ArrayBuffer> {
        throw new Error("NOT IMPLEMENTED");
    }
}