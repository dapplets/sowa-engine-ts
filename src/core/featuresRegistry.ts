import { Type } from '../types/type';

export class FeaturesRegistry {

    private _storage = new Map<string, Type<any>>();

    constructor(...features: Type<any>[]) {
        this.put(...features);
    }

    public put(...features: Type<any>[]) {
        for (const f of features) {
            const regKeys: string[] = f["REG_KEYS"];
            if (!regKeys) throw new Error("Invalid feature class. The feature doesn't contain REG_KEYS property.");
            const key = regKeys.join("|");
            this._storage.set(key, f);
        }

    }

    public get(...regKeys: string[]) {
        const key = regKeys.join("|");
        const featureClass = this._storage.get(key);
        return featureClass;
    }

}

// let dappletTemplate
// let registry: FeaturesRegistry = new FeaturesRegistry();
// let module = registry.get([ETHEREUM_SUPPORT_FORMATTER_URI, HTML_MUSTASHE_VIEW]);

// // == inside DappletEngine view evaluation================
// let view = registry.get(HTML_MUSTASHE_VIEW);
// view.parse(dappletTemplate.views[0]).usedGlobalNames.forEach(globalName => {
//     let module = registry.get([globalName, view.globalName]);
// })
// // ==================