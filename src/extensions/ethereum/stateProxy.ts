import { State } from '../../core/state'
import { InternalTypes } from '../../types/internalTypes'
import { TypeConverter } from '../../interfaces/typeConverter'
    
export class StateProxy {
    constructor(private _state: State, private typeConverter:TypeConverter) { }

    public get(key: string, externalType?: string): any {
        const data = this._state.get(key)
        if (!externalType) return data
        return data && this.typeConverter.int2ext(data,externalType)
    }

    public set(key: string, data: any, externalType: string): any {
        // external type => internal type
        this._state.set(key, this.typeConverter.ext2int(data,externalType))
    }
}
