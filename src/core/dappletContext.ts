import { DappletProvider } from "../interfaces/dappletProvider";
import { DappletRequest } from "../types/dappletRequest";
import { DappletEngine } from "./dappletEngine";
import { ContextConfig } from '../types/contextConfig';
import { DEFAULT_CONFIG } from "../defaultConfig";
import { FeatureRegistry } from './featureRegistry';
import { DappletTxResult } from '../interfaces/dappletTxResult';
import { DappletTemplate } from '../types/dappletTemplate';
import { IncompatibleDappletError } from '../errors/incompatibleDappletError';
import { DappletExecutable } from './dappletExecutable';

// DappletContext (DC) is created in the moment of a wallet starting.
// DC is Singleton class.
// DC loads and verifies DappletTemplates and other resources referenced in Frames. And rejects the Request if any errors.
export class DappletContext {
    public dappletProviders: DappletProvider[];

    constructor(public readonly config: ContextConfig = DEFAULT_CONFIG) {
        config = { ...DEFAULT_CONFIG, ...config };
        this.dappletProviders = config.providers! || [];
    }

    async processRequest(request: DappletRequest): Promise<DappletTxResult> {
        // dapplet loading and prepare for execution
        const frameExecutables = await Promise.all(
            request.frames.map(f =>
                this._loadDapplet(f.dappletId)
                    .then(dappletTemplate => new DappletExecutable(
                        dappletTemplate,
                        f.txMeta,
                        this.config
                    ))
            )
        );

        const engine = new DappletEngine(frameExecutables, this);
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

    async loadResource(id: string): Promise<ArrayBuffer> {
        throw new Error("NOT IMPLEMENTED");
    }
}