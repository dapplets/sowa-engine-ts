import { InternalTypes, TypedValue } from '../types/internalTypes'
import { ethers } from 'ethers'
import { isArrayish } from 'ethers/utils/bytes'

// It stores incoming request data and statuses of transaction execution (?)
export class State {
    // May be here is setters which call _scheduleNextRun when it changes
    // KeyValue or Hashmap<key, any, parentKey>
    // txBuilder.status.something

    private _map = new Map<string, TypedValue>()
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

    // ToDo: maybe it's better to check CBOR types in binary representation? Every CBOR type is encoded as special binary code, which we can check.
    // ToDo: no sense to return a function
    private _getValidator(type: InternalTypes): (value: any) => boolean {
        switch (type) {
            case InternalTypes.Integer: return (v) => typeof v === "number"
            case InternalTypes.Bytes: return (v) => { throw Error("TODO!") }
            case InternalTypes.String: return (v) => typeof v === "string"
            case InternalTypes.Boolean: return (v) => typeof v === "boolean"
            // ToDo: do we support a float type from IEEE 754? 
            // Answer: yes, at the same time we'll check the converting of unsupported types into byte array
            default: return (v) => { throw Error("Incompatible CBOR type.") }
        }
    }

    public get(keysAndFormatters: string): TypedValue | undefined {
        if (!keysAndFormatters) throw Error("An empty key is not allowed.")
        const parsed = keysAndFormatters.split(":")
        const key = parsed.shift()
        if (!key) throw Error("An empty key is not allowed.")
        const formatters = parsed

        let value = this._map.get(key)

        if (value) {
            for (const formatter of formatters) {
                value = this._format(formatter, value)
            }
        }

        return value
    }

    public set(key: string, value: TypedValue) {
        if (key.indexOf(":") !== -1) throw Error("Key contains the prohibited characters.")
        this._map.set(key, value)
        this._updateHandlers.forEach(callback => callback())
    }

    public onUpdate(callback: () => void) {
        this._updateHandlers.push(callback)
    }

    // ToDo: understand what formatters should be built-in
    // ToDo: implement built-in formatters
    // ToDo: get rid of dependency of ethers.js
    private _format(formatter: string, value: TypedValue): TypedValue {
        switch (formatter) {
            case "toUtf8Bytes": {
                if (typeof value[0] !== "string") throw Error("toUtf8Bytes doesn't support non-string parameters.")
                return [ethers.utils.toUtf8Bytes(value[0]), InternalTypes.Bytes]
            }
            case "sha256": {
                if (!isArrayish(value[0])) throw Error("sha256 doesn't support non-bytes parameters.")
                return [ethers.utils.arrayify(ethers.utils.sha256(value[0])), InternalTypes.Bytes]
            }
            default: throw Error(`The formatter "${formatter}" is not supported.`)
        }
    }

    public toObject(): object {
        const obj = {}
        this._map.forEach((v, k) => { obj[k] = v })
        return obj
    }
}