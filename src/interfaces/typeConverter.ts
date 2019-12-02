import { InternalTypes, TypedValue } from '../types/internalTypes'

export interface TypeConverter {
    int2ext(v: TypedValue, solType: string): any
    ext2int(extValue: any, solType: string): TypedValue
}
