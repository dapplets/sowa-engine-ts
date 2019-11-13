import { State } from "./state";
import { DappletTemplate } from "../types/dappletTemplate";
import { TxBuilder } from "../interfaces/txBuilder";
import { FeatureRegistry } from './featureRegistry';
import { View } from '../interfaces/view';

export class DappletFrameExecutor {
    private _state: State;
    private _txBuilders: { [key: string]: TxBuilder } = {};
    private _features: { [alias: string]: any } = {};
    private _compatibleView?: View;

    constructor(public readonly dapplet: DappletTemplate, txMeta: any, private _featureRegistry: FeatureRegistry) {
        this._state = new State(txMeta);
    }

    public async run(): Promise<void> {
        const dapplet = this.dapplet!;

        for (const txName in dapplet.transactions) {
            const txTemplate = dapplet.transactions[txName];
            const regKeys = dapplet.aliases[txTemplate.type];
            const txBuilderClass = this._featureRegistry.get(regKeys);
            if (!txBuilderClass) throw new Error("TxBuilderClass is not found");
            const builder = new txBuilderClass(txTemplate, this._state);
            this._txBuilders[txName] = builder;
        }
    }
}