import { State } from "./state";
import { DappletTemplate } from "../types/dappletTemplate";
import { TxBuilder } from "../interfaces/txBuilder";
import { FeatureRegistry } from './featureRegistry';
import { View } from '../interfaces/view';
import { DappletRuntime } from '../types/dappletRuntime';
import { RegKey } from './regKey';

export class DappletFrameExecutor {
    private _state: State;
    private _txBuilders: { [key: string]: TxBuilder } = {};
    private _features: { [alias: string]: any } = {};
    private _compatibleView?: View;

    constructor(public readonly dapplet: DappletRuntime, txMeta: any, private _featureRegistry: FeatureRegistry) {
        this._state = new State(dapplet.variables, txMeta);
    }

    public async run(): Promise<void> {
        const dapplet = this.dapplet!;

        for (const txName in dapplet.transactions) {
            const txTemplate = dapplet.transactions[txName];
            const txBuilderGlobalName = dapplet.aliases.get(txTemplate.type);
            if (!txBuilderGlobalName) throw new Error(`${txTemplate.type} is not found.`);
            const txBuilderClass = this._featureRegistry.getByName(txBuilderGlobalName);
            if (!txBuilderClass) throw new Error("TxBuilderClass is not found");
            const builder = new txBuilderClass(txTemplate, this._state);
            this._txBuilders[txName] = builder;
        }
    }
}