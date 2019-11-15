import { DappletTemplate } from '../types/dappletTemplate';
import { TxTemplate } from '../types/txTemplate';
import { ViewTemplate } from '../types/viewTemplate';

export class DappletExecutable {
    public aliases = new Map<string, string>();
    public variables?: { [key: string]: string; };
    public transactions: { [key: string]: TxTemplate; };
    public views: ViewTemplate[];

    constructor(template: DappletTemplate) {
        this._resolveAliasMap(template.aliases);
        this.variables = template.variables;
        this.transactions = template.transactions;
        this.views = template.views;
    }

    private _resolveAliasMap(aliasMap: { [alias: string]: string }) {
        //ToDo: endless recursion protection
        function replacer(key: string, aliasMap: { [alias: string]: string }): string {
            return aliasMap[key].replace(/@[a-zA-Z_$][0-9a-zA-Z_$]*/gm, (ref: string) => replacer(ref, aliasMap))
        }

        for (const key in aliasMap) {
            this.aliases.set(key, replacer(key, aliasMap));
        }
    }
}