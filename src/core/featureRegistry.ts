import { RegKey } from './regKey';

export class FeatureRegistry {

    private _storage = new Map<string, any>();

    constructor(features: any[]) {
        this.put(features);
    }

    public put(features: any[]) {
        for (const f of features) {
            const raw: string[] = f["REG_KEY"];
            if (!raw) throw new Error("Invalid feature class. The feature doesn't contain REG_KEY property.");
            const regKey = new RegKey(raw);
            this._storage.set(regKey.toString(), f);
        }
    }

    public get(regKey: RegKey) {
        return this._storage.get(regKey.toString());
    }
}