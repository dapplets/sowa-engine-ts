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

// DappletContext (DC) is created in the moment of a wallet starting.
// DC is Singleton class.
// DC catches dapplet requests.
// DC creates dappletEngines and runs them.
// package: wallet
// instantated once on Wallet start
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
        for (let i = 0; i < request.frames.length; i++) {
            const dapplet = await this._loadDapplet(request.frames[i].dappletId);
            this._validateDapplet(dapplet);
            request.frames[i].dapplet = dapplet;
        }

        const engine = new DappletEngine(request, this);
        engine.run();

        //const activity = new DappletActivity(request, this);
        return {};
    }

    private async _loadDapplet(dappletId: string): Promise<DappletTemplate> {
        for (const provider of this.dappletProviders) {
            try {
                const dapplet = await provider.loadDapplet(dappletId);
                if (!dapplet) continue;
                return dapplet;
            } catch (err) { }
        }
        throw Error(`All configured providers don't contain the dapplet ${dappletId}.`);
    }

    private _validateDapplet(dapplet: DappletTemplate) {
        const incompatibleFeatures: string[][] = [];

        // validate and init views
        let isCompatibleViewFound = false;
        // ToDo: think about whose view is priority (wallet developer vs dapplet developer)
        for (const viewTemplate of dapplet.views) {
            const regKeys = dapplet.aliases[viewTemplate.type];
            if (!regKeys) throw new Error(`Alias ${viewTemplate.type} is not defined in usings.`);
            const viewClass = this.featureRegistry.get(regKeys);

            // ToDo: validate formatters

            if (!viewClass) continue;

            isCompatibleViewFound = true;
            break;
        }

        // validate and init txBuilders
        for (const txName in dapplet.transactions) {
            const txAlias = dapplet.transactions[txName].type;
            const regKeys = dapplet.aliases[txAlias];
            const txBuilderClass = this.featureRegistry.get(regKeys);
            if (!txBuilderClass) {
                incompatibleFeatures.push(regKeys);
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