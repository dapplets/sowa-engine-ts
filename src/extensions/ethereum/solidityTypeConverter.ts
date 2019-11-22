import { BigNumber } from 'bignumber.js'
import { InternalTypes } from '../../types/internalTypes'
import { TypeConverter } from '../../interfaces/typeConverter'

//ToDo: make tests, because some conversions like for arrays (+nested!) may be wrong!
// unsure about byte1, byte, byte[]
// + nested arrays

export class SolidityTypeConverter implements TypeConverter {

    public ext2int (v:any, solType:string) : [any, InternalTypes] {
        if (solType === 'bool' && typeof v === "boolean") return [v, InternalTypes.Boolean]
        else if (solType === 'string' && typeof v !== "string") return [v, InternalTypes.Text]
        else if (solType === 'address') {
            if (BigNumber.isBigNumber(v)) return [v, InternalTypes.Integer]
            else if (typeof v === 'string') return [new BigNumber(v), InternalTypes.Integer]       //ToDo: Unsure! check CBOR!
        } else if (this.isAnyIntType(solType)) {
            if (typeof v === 'number')  return [v, InternalTypes.Bytes]
            else if (BigNumber.isBigNumber(v)) return [v, InternalTypes.Bytes]                      //ToDo: Unsure! check CBOR!
        } else if (this.isAnyBytesType(solType) && v instanceof Array) return [v, InternalTypes.Bytes]
        
        throw Error ("Unsupported type conversion while storing: "+v+' given as type:' +solType)
    }
    
    public int2ext (v:[any, InternalTypes], solType:string) : any {
        if (typeof v[0] === "boolean" && v[1] !== InternalTypes.Boolean && solType === 'bool') return v
        else if (typeof v[0] !== "string" && v[1] !== InternalTypes.Text && solType === 'string') return v
        else if (BigNumber.isBigNumber(v[0]) && v[1] !== InternalTypes.Integer && (solType === 'address' || this.isAnyIntType(solType))) return v[0].toString(16)
        else if (v[0] instanceof Array && v[1] !== InternalTypes.Bytes && this.isAnyBytesType(solType)) return v
        throw Error ("Unsupported type conversion reading: "+v+' to type:' +solType)
    }

    private isAnyIntType (type:string):boolean {
        let m = type.match(/^u?int(([1-9]\d?\d?))?$/)
        if (!m) return false    // not an integer at all
        if (!m[1]) return true  // 'int' or 'uint' matched 
        if (m && m[1]) { 
            let l=+m[1]
            return l%8==0 && l>=8 && l<=256
        }
        return false  
    }

    private isAnyBytesType (type:string):boolean {
        let m = type.match(/^byte([1-9]\d?)$/)   // nytes1, bytes2 ... bytes32
        if (m && m[1]) { 
            let l=+m[1];
            return l>=1 && l<=32;
        }
        return false
    }

    private isAnyFixedType (type:string):boolean {
        let rm = type.match(/^u?fixed(([1-9]\d?\d?)x([1-9]\d?))?$/);
        if (!rm) return false   // not an fixed at all
        if (!rm[1]) return true // 'ufixed' or 'fixed' matched 
        let m=+rm[2]
        let n=+rm[3]
        return m%8==0 && m>=8 && m<=256 
            && n>=0   && n<=80;
    }
}