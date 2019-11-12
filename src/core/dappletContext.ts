import { DappletProvider } from "../interfaces/dappletProvider";
import { DappletRequest } from "../types/dappletRequest";
import { DappletEngine } from "./dappletEngine";
import { DappletActivity } from "./dappletActivity";
import { ContextConfig } from '../types/contextConfig';
import { DEFAULT_CONFIG } from "../defaultConfig";
import { FeatureRegistry } from './featureRegistry';
import { DappletTxResult } from '../interfaces/dappletTxResult';
import { FrameStatus } from '../types/statusEnum';

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
        this.dappletProviders = config.providers!;
        this.featureRegistry = new FeatureRegistry(config.features || []);
    }

    async processRequest(request: DappletRequest): Promise<DappletTxResult> {
        const engine = new DappletEngine(request, this);
        engine.onStatusChanged((statuses) => console.log(statuses.map(s => FrameStatus[s]).join(", ")));
        await engine.load();
        engine.validate();
        
        //const activity = new DappletActivity(request, this);
        return {};
    }

    async loadResource(id: string): Promise<ArrayBuffer> {
        throw new Error("NOT IMPLEMENTED");
    }
}