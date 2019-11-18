import { TxBuilder } from "../interfaces/txBuilder";
import { View } from '../interfaces/view';
import { DappletExecutable } from './dappletExecutable';

export class DappletFrameExecutor {
    private _txBuilders: { [key: string]: TxBuilder } = {};
    private _features: { [alias: string]: any } = {};
    private _compatibleView?: View;

    constructor(public readonly dapplet: DappletExecutable) {}

    public async run(): Promise<void> {
        const dapplet = this.dapplet!;

        // for (const txName in dapplet.transactions) {
        //     const txTemplate = dapplet.transactions[txName];
        //     const txBuilderGlobalName = dapplet.aliases.get(txTemplate.type);
        //     if (!txBuilderGlobalName) throw new Error(`${txTemplate.type} is not found.`);
        //     const txBuilderClass = this._featureRegistry.getByName(txBuilderGlobalName);
        //     if (!txBuilderClass) throw new Error("TxBuilderClass is not found");
        //     const builder = new txBuilderClass(txTemplate, this.dapplet.state);
        //     this._txBuilders[txName] = builder;
        // }
    }
}