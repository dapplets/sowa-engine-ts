import { Feature } from "../interfaces/feature";

export class FeaturesRegistry {

    private _storage = new Map<string[], Feature>();

    constructor(features: Feature[]) {
        features?.forEach(f => this.put(f));
    }

    public put(feature: Feature) {
        this._storage.set(feature.regKey, feature);
    }

    public get(...name: string[]) {
        return this._storage.get(name);
    }

}

let dappletTemplate
let registry: FeaturesRegistry = new FeaturesRegistry();
let module = registry.get([ETHEREUM_SUPPORT_FORMATTER_URI, HTML_MUSTASHE_VIEW]);

// == inside DappletEngine view evaluation================
let view = registry.get(HTML_MUSTASHE_VIEW);
view.parse(dappletTemplate.views[0]).usedGlobalNames.forEach(globalName => {
    let module = registry.get([globalName, view.globalName]);
})
// ==================