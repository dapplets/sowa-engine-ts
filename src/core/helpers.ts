import { RegKey } from './regKey';
import { DappletRuntime } from '../types/dappletRuntime';
import { DappletTemplate } from '../types/dappletTemplate';

function _replaceSubaliases(value: string, aliasMap: { [alias: string]: string[] | string }): string {
    const subaliases = value.match(/@[a-zA-Z_$][0-9a-zA-Z_$]*/gm);
    if (!subaliases) return value;

    for (const subaliase of subaliases) {
        const subAliasValue = aliasMap[subaliase];
        if (!subAliasValue) throw Error(`Alias ${subaliase} is not found.`);
        if (subAliasValue instanceof Array) throw Error("Subalias can not be array");
        value = value.replace(subaliase, _replaceSubaliases(subAliasValue, aliasMap));
    }

    return value;
}

export function resolveAliasMap(aliasMap: { [alias: string]: string[] | string }): Map<string, RegKey> {
    const map: Map<string, RegKey> = new Map();

    for (const alias in aliasMap) {
        if (alias[0] === "@") continue;

        const values = aliasMap[alias];

        if (values instanceof Array) {
            map.set(alias, new RegKey(values.map(v => _replaceSubaliases(v, aliasMap))))
        } else {
            map.set(alias, new RegKey(_replaceSubaliases(values, aliasMap)));
        }
    }

    return map;
}

export function toDappletRuntime(raw: DappletTemplate): DappletRuntime {
    return {
        aliases: resolveAliasMap(raw.aliases),
        transactions: raw.transactions,
        views: raw.views,
        compatibleViewClasses: [],
        compatibleTxBuilderClasses: []
    };
}