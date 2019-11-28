import { DappletTemplate } from '../types/dappletTemplate'
import { TxTemplate } from '../types/txTemplate'
import { ContextConfig } from '../types/contextConfig'
import { ViewConstructor, View } from "../interfaces/view"
import { ViewTemplate } from '../types/viewTemplate'
import { TxBuilder, TxBuilderConstructor } from "../interfaces/txBuilder"
import { State } from './state'
import { Extension } from '../interfaces/extension'
import { Signer } from 'src/interfaces/signer'

type VariablesDeclType = { [alias: string]: string }

export class DappletExecutable {
    public aliases = new Map<string, string>()
    public state: State
    public transactions: { [key: string]: TxBuilder } = {}
    public views: View[] = []
    public activeView: View

    constructor(template: DappletTemplate, txMetadata: any[], config: ContextConfig) {
        this.aliases = this._createAliasMap(template.aliases)
        this.state = this._createState(template.variables || {}, txMetadata)
        this._loadCompatibleViews(template.views, config.views || [])
        this._createTxBuilders(template.transactions, config.extensions || [])
        this._validate()

        this.activeView = this.views[0] //ToDo: MayBe implement another view selection strategy 
    }

    public prepare(): [Signer, any][] {
        const data: [Signer, any][] = []
        for (let type in this.transactions) {
            //ToDo: error! two builders with the same type will not work!!!
            //ToDo: use name/id ?
            const builder = this.transactions[type]
            if (builder.isReadyToRun()) {
                data.push([builder.signer, builder.prepareTxPayload()])
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
        for (const txName in txDecls) {
            const globalName = this.aliases.get(txDecls[txName].type)
            if (!globalName) throw Error(`Alias for ${txDecls[txName].type} is not defined in usings.`)
            const builder = extensions.map(e => { 
                const ctor = e.txBuilders.find(b => b.GLOBAL_NAME == globalName)
                return ctor && new ctor(txDecls[txName], this.state, e.signer)
            }).find(b=>b)
            if (!builder) throw Error(`TxBuilder "${globalName}" is not supported.`)
            this.transactions[txName] = builder
        }
    }

    private _validate() {
        //if (this.views.length === 0) throw Error("There aren't any compatible views.")
    }
}