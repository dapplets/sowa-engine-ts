import { BigNumber } from 'bignumber.js'
import { InternalTypes, TypedValue } from '../../types/internalTypes'
import { TypeConverter } from '../../interfaces/typeConverter'
import { ethers } from 'ethers'

//ToDo: make tests, because some conversions like for arrays (+nested!) may be wrong!
// unsure about byte1, byte, byte[]
// + nested arrays

// ToDo: maybe split Viper and Solidity builders into different extensions?
// ToDo: Is type converter used by someone else besides StateProxy? Maybe it needs to collapse TypeConverter into StateProxy?
// ToDo: Move to SolidityBuilder as private class?
export class SolidityTypeConverter implements TypeConverter {

    public ext2int(v: any, solType: string): TypedValue {
        // ToDo: Are Bignumber.js and BN.js compatible? Ethers.js uses BN, but CBOR - Bignumber.
        if (solType === 'bool' && typeof v === "boolean") return [v, InternalTypes.Boolean]
        else if (solType === 'string' && typeof v === "string") return [v, InternalTypes.String]
        else if (solType === 'address') {
            if (BigNumber.isBigNumber(v)) return [v, InternalTypes.Integer]
            else if (typeof v === 'string') return [new BigNumber(v), InternalTypes.Integer]       //ToDo: Unsure! check CBOR!
        } else if (this.isAnyIntType(solType)) {
            if (typeof v === 'number') return [v, InternalTypes.Integer]
            else if (BigNumber.isBigNumber(v)) return [v, InternalTypes.Integer]                      //ToDo: Unsure! check CBOR!
        } else if (this.isAnyBytesType(solType) && v instanceof Array) return [v, InternalTypes.Bytes]

        throw Error("Unsupported type conversion while storing: " + v + ' given as type:' + solType)
    }

    public int2ext(v: TypedValue, solType: string): any {
        if (typeof v[0] === "boolean" && v[1] === InternalTypes.Boolean && solType === 'bool') return v[0]
        else if (typeof v[0] === "string" && v[1] === InternalTypes.String && solType === 'string') return v[0]
        else if (typeof v[0] === "number" && v[1] === InternalTypes.Integer && this.isAnyIntType(solType)) return v[0]
        else if (BigNumber.isBigNumber(v[0]) && v[1] === InternalTypes.Integer && (solType === 'address' || this.isAnyIntType(solType))) return v[0].toString(16)
        else if ((Array.isArray(v[0]) || v[0] instanceof Uint8Array) && v[1] === InternalTypes.Bytes && this.isAnyBytesType(solType)) return v[0]
        else if ((Array.isArray(v[0]) || v[0] instanceof Uint8Array) && v[1] === InternalTypes.Bytes && v[0].length <= 32 && this.isAnyIntType(solType)) return ethers.utils.hexlify(v[0] as ArrayLike<number>)
        throw Error("Unsupported type conversion reading: " + v + ' to type:' + solType)
    }

    private isAnyIntType(type: string): boolean {
        let m = type.match(/^u?int(([1-9]\d?\d?))?$/) // uint8 ... uint256, int8 ... int256, uint, int
        if (!m) return false    // not an integer at all
        if (!m[1]) return true  // 'int' or 'uint' matched 
        if (m && m[1]) {
            let l = +m[1]
            return l % 8 == 0 && l >= 8 && l <= 256
        }
        return false
    }

    private isAnyBytesType(type: string): boolean {
        let m = type.match(/^byte([1-9]\d?)$/)   // nytes1, bytes2 ... bytes32
        if (m && m[1]) {
            let l = +m[1];
            return l >= 1 && l <= 32;
        }
        return false
    }

    private isAnyFixedType(type: string): boolean {
        let rm = type.match(/^u?fixed(([1-9]\d?\d?)x([1-9]\d?))?$/);
        if (!rm) return false   // not an fixed at all
        if (!rm[1]) return true // 'ufixed' or 'fixed' matched 
        let m = +rm[2]
        let n = +rm[3]
        return m % 8 == 0 && m >= 8 && m <= 256
            && n >= 0 && n <= 80;
    }
}