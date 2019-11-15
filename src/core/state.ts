import { utils, ethers } from "ethers";

// It stores incoming JSON data and statuses of transaction execution (?)
export class State {
    // May be here is setters which call _scheduleNextRun when it changes
    // KeyValue or Hashmap<key, any, parentKey>
    // txBuilder.status.something

    private _map = new Map<string, Uint8Array>();

    constructor(types?: { [variable: string]: string }, data?: Uint8Array) {
        if (!types && !data) return;
        if (!types || !data) throw Error("Types and Values are required together.");

        const varNames = Object.keys(types);
        const typeNames = Object.values(types);

        const decodedValues = utils.defaultAbiCoder.decode(typeNames, data);

        for (let i = 0; i < decodedValues.length; i++) {
            const hex = utils.defaultAbiCoder.encode([typeNames[i]], [decodedValues[i]]);
            const buf = utils.arrayify(hex);
            this._map.set(varNames[i], buf);
        }
    }

    public get(key: string): Uint8Array | undefined {
        return this._map.get(key);
    }

    public set(key: string, value: Uint8Array) {
        this._map.set(key, value);
    }
}