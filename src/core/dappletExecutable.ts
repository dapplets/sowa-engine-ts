import { DappletTemplate } from '../types/dappletTemplate'
import { TxTemplate } from '../types/txTemplate'
import { ContextConfig } from '../types/contextConfig'
import { ViewConstructor, View } from "../interfaces/view"
import { ViewTemplate } from '../types/viewTemplate'
import { TxBuilder } from "../interfaces/txBuilder"
import { State } from './state'
import { Extension } from '../interfaces/extension'

type VariablesDeclType = { [alias: string]: string }

export class DappletExecutable {
    //ToDo-2.1: better aliases map to GUIDs. and GUIDs to Documents separately (in ens)
    //ToDo-2.2: introduce documentation system based on GUIDs
    //ToDo-2.3: replace all strings with GUID aliases (think about "@" replacement and hierarchy)
    public aliases = new Map<string, string>()
    public state: State
    public transactions: { [key: string]: TxBuilder } = {}
    public views: View[] = []
    public activeView: View

    constructor(template: DappletTemplate, txMetadata: any[], config: ContextConfig, private parentTopic: string) {
        this.aliases = this._createAliasMap(template.aliases)
        this.state = this._createState(template.variables || {}, txMetadata)
        this._loadCompatibleViews(template.views, config.views || [])
        this._createTxBuilders(template.transactions, config.extensions || [])
        this._validate()

        //ToDo: This is a default selection. Set activeView in the callback handler onDappletRequest
        this.activeView = this.views[0]
    }

    public prepare(): [TxBuilder, any][] {
        const data: [TxBuilder, any][] = []
        for (let builderName in this.transactions) {
            const builder = this.transactions[builderName]  //ToDo: use array instead of Map
            if (builder.isReadyToRun()) {
                data.push([builder, builder.prepareTxPayload()])
            }
        }
        return data
    }

    private _createAliasMap(aliasMap: { [alias: string]: string }): Map<string, string> {
        //ToDo: add endless recursion protection
        function replacer(key: string, aliasMap: { [alias: string]: string }): string {
            return aliasMap[key].replace(/@[a-zA-Z_$][0-9a-zA-Z_$]*/gm, (ref: string) => replacer(ref, aliasMap))
        }

        for (const key in aliasMap) {
            this.aliases.set(key, replacer(key, aliasMap))
        }

        return this.aliases
    }

    // ToDo: no sense in the separate method (here is no anything besides `new`)
    private _createState(variablesDecl: VariablesDeclType, txMetadata: any[]) {
        return new State(variablesDecl, txMetadata)
    }

    private _loadCompatibleViews(viewDecls: ViewTemplate<any>[], viewCtors: ViewConstructor[]) {
        for (const viewDecl of viewDecls) {
            const globalName = this.aliases.get(viewDecl.type)
            if (!globalName) throw Error(`Alias for ${viewDecl.type} is not defined in usings.`)
            const ctor = viewCtors.find(v => v.GLOBAL_NAME === globalName)
            if (!ctor) {
                //console.warn(`View "${globalName}" is not compatible.`)
                continue
            }
            const view = new ctor(viewDecl, this.state)
            this.state.onUpdate(() => view.render())
            view.render()
            this.views.push(view)
        }
    }

    private _createTxBuilders(txDecls: { [key: string]: TxTemplate }, extensions: Extension[]) {
        for (const builderName in txDecls) {
            const globalName = this.aliases.get(txDecls[builderName].type)
            if (!globalName) throw Error(`Alias for ${txDecls[builderName].type} is not defined in usings.`)
            const builder = extensions.map(e => {
                const ctor = e.txBuilders.find(b => b.GLOBAL_NAME == globalName)
                // ToDo: Core shouldn't know about e.signer. Extension should take care about Signer-Builder relationship.
                return ctor && new ctor(txDecls[builderName], this.state, e.signer, this.parentTopic + "." + builderName)
            }).find(b => b)
            if (!builder) throw Error(`TxBuilder "${globalName}" is not supported.`)
            this.transactions[builderName] = builder
        }
    }

    private _validate() {
        //if (this.views.length === 0) throw Error("There aren't any compatible views.")
    }
}