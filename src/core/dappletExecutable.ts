import { DappletTemplate } from '../types/dappletTemplate';
import { TxTemplate } from '../types/txTemplate';
import { ContextConfig } from 'src/types/contextConfig';
import { ViewConstructor, View } from "../interfaces/view"
import { ViewTemplate } from '../types/viewTemplate';
import { TxBuilder } from "../interfaces/txBuilder"
import { State } from './state';

type VariablesDeclType = {[alias: string]: string }

export class DappletExecutable {
    public aliases : Map<string, string>;
    // public variables?: { [key: string]: string; };
    public state:State;
    public transactions: { [key: string]: TxTemplate; };
    public views: ViewTemplate[];

    constructor(template: DappletTemplate, requestData : Uint8Array, context: ContextConfig) {
        this.aliases = this._createAliasMap(template.aliases)
        this.state = this._createState(template.variables, requestData)
        this.views = this._loadCompatibleViews(template.views, context.views)
        this.transactions = this._createTxBuilders(template.transactions, context.builders)
        this._validate();
    }

    private _createAliasMap(aliasMap: { [alias: string]: string }) : Map<string, string> {
        //ToDo: endless recursion protection
        function replacer(key: string, aliasMap: { [alias: string]: string }): string {
            return aliasMap[key].replace(/@[a-zA-Z_$][0-9a-zA-Z_$]*/gm, (ref: string) => replacer(ref, aliasMap))
        }

        for (const key in aliasMap) {
            this.aliases.set(key, replacer(key, aliasMap));
        }
    }

    private _createState(variablesDecl: VariablesDeclType, requestData: Uint8Array) {
        //ToDo: 
    }

    private _loadCompatibleViews(viewDecls: ViewTemplate[], viewCtors: ViewConstructor[]): View[] {
        return viewCtors.map(ctor => {
            const viewDecl = viewDecls.find(viewDecl => {
                const globalName = this.aliases.get(viewDecl.type)
                return ctor.GLOBAL_NAME == globalName
            })
            return viewDecl && new ctor(viewDecl, this.state)
        }).filter(v=>!!v) as View[]
    }

    private _createTxBuilders(transactions: { [key: string]: TxTemplate; }, builders: TxBuilder[]): { [key: string]: TxTemplate; } {
        throw new Error("Method not implemented.");
    }

    private _validate() {
        const incompatibleFeatures: string[] = [];

        // validate and init views
        let isCompatibleViewFound = false;
        // ToDo: think about whose view is priority (wallet developer vs dapplet developer)
        for (const viewTemplate of this.views) {
            const viewGlobalName = this.aliases.get(viewTemplate.type);
            if (!viewGlobalName) throw new Error(`Alias for ${viewTemplate.type} is not defined in usings.`);
            const viewClass = this.config.getByName(viewGlobalName);
            if (!viewClass) continue;

            // ToDo: validate formatters
            //dapplet.compatibleViewClasses.push(viewClass);

            isCompatibleViewFound = true;
            break;
        }

        // validate and init txBuilders
        for (const txName in this.transactions) {
            const txAlias = this.transactions[txName].type;
            const txBuilderGlobalName = this.aliases.get(txAlias);
            if (!txBuilderGlobalName) throw new Error(`Alias for ${txAlias} is not defined in usings.`);
            const txBuilderClass = this.config.builders.find(b=>b["GLOBAL_NAME"]txBuilderGlobalName);
            if (!txBuilderClass) {
                incompatibleFeatures.push(txBuilderGlobalName);
            } else {
                //dapplet.compatibleViewClasses.push(txBuilderClass);
            }
        }
        
        if (incompatibleFeatures.length > 0 || !isCompatibleViewFound) {
            throw new IncompatibleDappletError(incompatibleFeatures);
        }
    }

}