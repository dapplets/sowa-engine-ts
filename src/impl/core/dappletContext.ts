import { DappletProvider } from "../../interfaces/dappletProvider";
import { DappletRequest } from "../../types/dappletRequest";
import { DappletEngine } from "./dappletEngine";
import { DappletActivity } from "../views/dappletActivity";
import { ContextConfig } from 'src/types/contextConfig';
import { DEFAULT_CONFIG } from "../../defaultConfig";
import { FeaturesRegistry } from '../featuresRegistry';

// создается в момент старта кошелька и singleton
// к нему приходят request'ы
// он создает dappletEngines и запускает их
// package: wallet
// instantated once on Wallet start
export class DappletContext {
    private _dappletProvider: DappletProvider;
    private _featuresRegistry: FeaturesRegistry;

    constructor(config?: ContextConfig) {
        if (!config) config = DEFAULT_CONFIG;

        this._dappletProvider = config.provider;
        this._featuresRegistry = config.features;
    }

    //typeSupport: Map<PID,(rawData:string,type:PID)=>typedValue> = new Map

    async processRequest(request: DappletRequest) {
        const engine = new DappletEngine(request, this._featuresRegistry);
        await engine.load(this._dappletProvider);
        if (!engine.validate()) throw new Error("Invalid dapplet");

        const activity = new DappletActivity(request, this);
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