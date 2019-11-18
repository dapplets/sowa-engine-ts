import { DappletTemplate } from '../types/dappletTemplate';
import { TxTemplate } from '../types/txTemplate';
import { ContextConfig } from '../types/contextConfig';
import { ViewConstructor, View } from "../interfaces/view"
import { ViewTemplate } from '../types/viewTemplate';
import { TxBuilderConstructor, TxBuilder } from "../interfaces/txBuilder"
import { State } from './state';

type VariablesDeclType = { [alias: string]: string }

export class DappletExecutable {
    public aliases = new Map<string, string>();
    public state: State;
    public transactions: { [key: string]: TxBuilder; } = {};
    public views: View[] = [];

    constructor(template: DappletTemplate, requestData: Uint8Array, config: ContextConfig) {
        this.aliases = this._createAliasMap(template.aliases)
        this.state = this._createState(template.variables || {}, requestData)
        this.views = this._loadCompatibleViews(template.views, config.views || [])
        this.transactions = this._createTxBuilders(template.transactions, config.builders || [])
        this._validate();
    }

    private _createAliasMap(aliasMap: { [alias: string]: string }): Map<string, string> {
        //ToDo: endless recursion protection
        function replacer(key: string, aliasMap: { [alias: string]: string }): string {
            return aliasMap[key].replace(/@[a-zA-Z_$][0-9a-zA-Z_$]*/gm, (ref: string) => replacer(ref, aliasMap))
        }

        for (const key in aliasMap) {
            this.aliases.set(key, replacer(key, aliasMap));
        }

        return this.aliases
    }

    private _createState(variablesDecl: VariablesDeclType, requestData: Uint8Array) {
        return new State(variablesDecl, requestData);
    }

    private _loadCompatibleViews(viewDecls: ViewTemplate[], viewCtors: ViewConstructor[]): View[] {
        for (const viewDecl of viewDecls) {
            const globalName = this.aliases.get(viewDecl.type)
            if (!globalName) throw Error(`Alias for ${viewDecl.type} is not defined in usings.`)
            const ctor = viewCtors.find(v => v.GLOBAL_NAME === globalName)
            if (!ctor) {
                console.warn(`View "${globalName}" is not compatible.`)
                continue
            }
            this.views.push(new ctor(viewDecl, this.state))
        }
        return this.views
    }

    private _createTxBuilders(txDecls: { [key: string]: TxTemplate; }, builderCtors: TxBuilderConstructor[]): { [key: string]: TxBuilder; } {
        for (const txName in txDecls) {
            const globalName = this.aliases.get(txDecls[txName].type)
            if (!globalName) throw Error(`Alias for ${txDecls[txName].type} is not defined in usings.`)
            const ctor = builderCtors.find(b => b.GLOBAL_NAME === globalName)
            if (!ctor) throw Error(`TxBuilder "${globalName}" is not compatible.`)
            this.transactions[txName] = new ctor(txDecls[txName], this.state)
        }
        return this.transactions
    }

    private _validate() {
        //if (this.views.length === 0) throw Error("There aren't any compatible views.");
    }
}