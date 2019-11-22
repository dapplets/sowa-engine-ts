import { State } from '../../core/state'
import { InternalTypes } from '../../types/internalTypes'

export class StateProxy {
    constructor(private _state: State) { }

    public get(key: string, externalType?: string): any {
        const data = this._state.get(key)
        if (!externalType) return data
        // internal type => external type
        // ToDo: convert BN to hex string
        return data
    }

    public set(key: string, value: string, externalType: string): any {
        // external type => internal type
        this._state.set(key, value, InternalTypes[externalType])
    }
}