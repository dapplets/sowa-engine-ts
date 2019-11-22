import { TxBuilder } from "../../interfaces/txBuilder";
import { TxTemplate } from '../../types/txTemplate';
import { State } from '../../core/state';
import { SwarmSigner } from './swarmSigner';

type SwarmTxTemplate = TxTemplate & {
    data?: string
}

export class SwarmTxBuilder implements TxBuilder {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/solidity/1.0";
    public signer?: SwarmSigner
    public txConfig: any;

    constructor(public readonly txTemplate: SwarmTxTemplate, public readonly state: State) { }

    public isReadyToRun(): boolean {
        throw Error("Method not implemented.");
    }

    public isWaiting(): boolean {
        throw Error("Method not implemented.");
    }

    public prepareTxPayload() {
        throw Error("Method not implemented.");
    }

    public run(): Promise<any> {
        throw Error("Method not implemented.");
    }

    public on(event: string, callback: Function): void {
        throw Error("Method not implemented.");
    }
}