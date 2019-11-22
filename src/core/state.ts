import { InternalTypes } from '../types/internalTypes'

// It stores incoming request data and statuses of transaction execution (?)
export class State {
    // May be here is setters which call _scheduleNextRun when it changes
    // KeyValue or Hashmap<key, any, parentKey>
    // txBuilder.status.something

    private _map = new Map<string, [any, InternalTypes]>()
    private _updateHandlers: (() => void)[] = []

    constructor(variablesTemplate?: { [variable: string]: string }, values?: any[]) {
        if (!variablesTemplate && !values) return
        if (!variablesTemplate || !values) throw Error("Variables template and Values are required together.")

        const variables = Object.keys(variablesTemplate)
        const types = Object.values(variablesTemplate) as InternalTypes[]

        if (variables.length !== values.length) throw Error("The number of variables and values must be equal.")

        for (let i = 0; i < variables.length; i++) {
            const variable = variables[i],
                type = types[i],
                value = values[i]

            if (!this._getValidator(type)(value)) throw Error(`Invalid type of ${variable}. Expected '${type}' type.`)

            this._map.set(variable, [value, type])
        }
    }

    private _getValidator(type: InternalTypes): (value: any) => boolean {
        // RFC 8610: Concise Data Definition Language (CDDL)
        switch (type) {
            case InternalTypes.Integer: return (v) => typeof v === "number"
            case InternalTypes.Bytes: return (v) => { throw Error("TODO!") }
            case InternalTypes.Text: return (v) => typeof v === "string"
            case InternalTypes.Boolean: return (v) => typeof v === "boolean"
            default: return (v) => { throw Error("Incompatible CBOR type.") }
        }
    }

    public get(key: string): [any, InternalTypes] | undefined {
        return this._map.get(key)
    }

    public set(key: string, value: any, type: InternalTypes) {
        this._map.set(key, [value, type])
        this._updateHandlers.forEach(callback => callback())
    }

    public onUpdate(callback: () => void) {
        this._updateHandlers.push(callback)
    }
}