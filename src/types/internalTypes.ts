import { BigNumber } from 'bignumber.js'

export enum InternalTypes {
    Integer = "int",
    Bytes = "bytes",
    String = "string", // we use "string" instead of "text" in RFC 8610
    Boolean = "bool"
}

type CborTypes = BigNumber | number | Uint8Array | boolean | string

export type TypedValue = [CborTypes | CborTypes[], InternalTypes]