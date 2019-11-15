import { DappletRuntime } from '../types/dappletRuntime';
import { DappletTemplate } from '../types/dappletTemplate';

export function resolveAliasMap(aliasMap: { [alias: string]: string }): Map<string, string> {
    const map: Map<string, string> = new Map();

    //ToDo: endless recursion protection
    function replacer(key: string, aliasMap: { [alias: string]: string }): string {
        return aliasMap[key].replace(/@[a-zA-Z_$][0-9a-zA-Z_$]*/gm, (ref: string) => replacer(ref, aliasMap))
    }

    for (const key in aliasMap) {
        map.set(key, replacer(key, aliasMap));
    }

    return map;
}

export function toDappletRuntime(raw: DappletTemplate): DappletRuntime {
    return {
        aliases: resolveAliasMap(raw.aliases),
        variables: raw.variables,
        transactions: raw.transactions,
        views: raw.views,
        compatibleViewClasses: [],
        compatibleTxBuilderClasses: []
    };
}