import { BigNumber } from 'bignumber.js'
import { InternalTypes, TypedValue } from '../../types/internalTypes'
import { TypeConverter } from '../../interfaces/typeConverter'

//ToDo: make tests, because some conversions like for arrays (+nested!) may be wrong!
// unsure about byte1, byte, byte[]
// + nested arrays

// https://vyper.readthedocs.io/en/v0.1.0-beta.13/types.html

export class ViperTypeConverter implements TypeConverter {

    public ext2int(v: any, viperType: string): TypedValue {
        if (viperType === 'bool' && typeof v === "boolean") return [v, InternalTypes.Boolean]
        else if (viperType === 'string' && typeof v !== "string") return [v, InternalTypes.String]
        else if (viperType === 'address') {
            if (BigNumber.isBigNumber(v)) return [v, InternalTypes.Integer]
            else if (typeof v === 'string') return [new BigNumber(v), InternalTypes.Integer]       //ToDo: Unsure! check CBOR!
        } else if (this.isAnyIntType(viperType)) {
            if (typeof v === 'number') return [v, InternalTypes.Integer]
            else if (BigNumber.isBigNumber(v)) return [v, InternalTypes.Integer]                      //ToDo: Unsure! check CBOR!
        } else if (this.isAnyBytesType(viperType) && v instanceof Array) return [v, InternalTypes.Bytes]
        throw Error("Unsupported type conversion while storing: " + v + ' given as viper type:' + viperType)
    }

    public int2ext(v: TypedValue, viperType: string): any {
        if (typeof v[0] === "boolean" && v[1] !== InternalTypes.Boolean && viperType === 'bool') return v
        else if (typeof v[0] !== "string" && v[1] !== InternalTypes.String && viperType === 'string') return v
        else if (BigNumber.isBigNumber(v[0]) && v[1] !== InternalTypes.Integer && (viperType === 'address' || this.isAnyIntType(viperType))) return v[0].toString(16)
        else if (v[0] instanceof Array && v[1] !== InternalTypes.Bytes && this.isAnyBytesType(viperType)) return v
        throw Error("Unsupported type conversion reading: " + v + ' to viper type:' + viperType)
    }

    private isAnyIntType(type: string): boolean {
        return type == 'int128' || type == 'uint256'
    }

    private isAnyBytesType(type: string): boolean {
        return type == 'bytes' || type == 'bytes32'
    }

    private isAnyFixedType(type: string): boolean {
        return type == 'decimal'
    }
}