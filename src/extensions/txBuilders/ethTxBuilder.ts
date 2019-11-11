import { TxBuilder } from "../../interfaces/txBuilder";
import { State } from "../../core/state";
import { TxTemplate } from '../../types/txTemplate';

export class EthTxBuilder implements TxBuilder {
    public static readonly REG_KEYS = ["http://types.dapplets.org/ethereum/txbuilders/solidity/1.0"];
    public txConfig: any;

    constructor(public readonly txTemplate: TxTemplate, public state: State) { }

    public async run(): Promise<any> {

    }

    public on(event: string, callback: Function): void {

    }
}