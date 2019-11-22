import { InternalTypes } from '../types/internalTypes'

export interface TypeConverter { 
    int2ext(v:[any, InternalTypes], solType:string) : any
    ext2int(extValue:any, solType:string) : [any, InternalTypes]
}
