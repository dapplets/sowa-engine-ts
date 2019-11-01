import { TxBuilder } from "../../interfaces/txBuilder";
import { State } from "../core/state";

export class EthTxBuilder implements TxBuilder {
    public globalName: string = "http://types.dapplets.org/ethereum/txbuilders/solidity/1.0";
    public regKey = [this.globalName];

    public txConfig: any;
    public state: State;

    public async run(): Promise<any> {

    }

    public on(event: string, callback: Function): void {

    }
}