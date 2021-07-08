import { DappletProvider } from "../interfaces/dappletProvider";
import { DappletRequest } from "../types/dappletRequest";
import { DappletEngine } from "./dappletEngine";
import { DappletActivity } from "./dappletActivity";
import { ContextConfig } from '../types/contextConfig';
import { DEFAULT_CONFIG } from "../defaultConfig";
import { FeaturesRegistry } from './featuresRegistry';
import { DappletTxResult } from '../interfaces/dappletTxResult';
import { FrameStatus } from '../types/statusEnum';

// создается в момент старта кошелька и singleton
// к нему приходят request'ы
// он создает dappletEngines и запускает их
// package: wallet
// instantated once on Wallet start
export class DappletContext {
    private _dappletProvider: DappletProvider;
    private _featuresRegistry: FeaturesRegistry;

    constructor(config: ContextConfig = DEFAULT_CONFIG) {
        config = { ...DEFAULT_CONFIG, ...config };
        this._dappletProvider = config.provider!;
        this._featuresRegistry = config.features!;
    }

    //typeSupport: Map<PID,(rawData:string,type:PID)=>typedValue> = new Map

    async processRequest(request: DappletRequest): Promise<DappletTxResult> {
        const engine = new DappletEngine(request, this._featuresRegistry);
        engine.onStatusChanged((statuses) => console.log(statuses.map(s => FrameStatus[s]).join(", ")));
        await engine.load(this._dappletProvider);
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