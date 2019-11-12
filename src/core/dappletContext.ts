import { DappletProvider } from "../interfaces/dappletProvider";
import { DappletRequest } from "../types/dappletRequest";
import { DappletEngine } from "./dappletEngine";
import { DappletActivity } from "./dappletActivity";
import { ContextConfig } from '../types/contextConfig';
import { DEFAULT_CONFIG } from "../defaultConfig";
import { FeatureRegistry } from './featureRegistry';
import { DappletTxResult } from '../interfaces/dappletTxResult';
import { FrameStatus } from '../types/statusEnum';

// создается в момент старта кошелька и singleton
// к нему приходят request'ы
// он создает dappletEngines и запускает их
// package: wallet
// instantated once on Wallet start
export class DappletContext {
    private _dappletProviders: DappletProvider[];
    private _featureRegistry: FeatureRegistry;

    constructor(config: ContextConfig = DEFAULT_CONFIG) {
        config = { ...DEFAULT_CONFIG, ...config };
        this._dappletProviders = config.providers!;
        this._featureRegistry = new FeatureRegistry(config.features);
    }

    //typeSupport: Map<PID,(rawData:string,type:PID)=>typedValue> = new Map

    async processRequest(request: DappletRequest): Promise<DappletTxResult> {
        const engine = new DappletEngine(request, this._featureRegistry);
        engine.onStatusChanged((statuses) => console.log(statuses.map(s => FrameStatus[s]).join(", ")));
        await engine.load(this._dappletProviders);
        engine.validate();
        
        //const activity = new DappletActivity(request, this);
        return {};
    }

    async loadResource(id: string): Promise<ArrayBuffer> {
        throw new Error("NOT IMPLEMENTED");
    }

    // createParser(parserPid: any, config: DappletConfig): IRequestDataParser {
    //     throw new Error("Method not implemented.");
    // }

    // createTxEngine(config: TransactionSection): TxEngine {
    //     for (const name in config) {
    //         let txConfig = config[name];
    //         switch (txConfig.type) {
    //             case EthereumSupport.PID:
    //                 return new EthereumSupport(txConfig)
    //             case TableMustasheView.PID:
    //                 return new IPFSSupport(txConfig)
    //             default:
    //                 break;
    //         }
    //     }
    //     throw new Error("Incompatible view")
    // }
}