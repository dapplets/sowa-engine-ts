import { TxBuilder } from "../../interfaces/txBuilder";
import { State } from "../../core/state";
import { TxTemplate } from '../../types/txTemplate';
import { DappletEngine } from '../../core/dappletFrameExecutor';

export class EthTxBuilder implements TxBuilder {
    public static readonly REG_KEY = ["http://types.dapplets.org/ethereum/txbuilders/solidity/1.0"];
    public txConfig: any;
    public isDone = false;

    constructor(public readonly txTemplate: TxTemplate, private _frameExecutor: DappletEngine) { }

    // Writable `State` must be in every txBuilder own
    // Also, dappletFrameExecutor contains own state, where typed txMeta is available.

    public ready(): boolean {
        //this._frameExecutor.
        return true;
    }

    public async run(): Promise<any> {
        this.isDone = true;
    }

    public on(event: string, callback: Function): void {

    }
}