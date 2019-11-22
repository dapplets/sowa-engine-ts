import { BigNumber } from 'bignumber.js'

export enum InternalTypes {
    Integer = "int",
    Bytes = "bytes",
    Text = "text",
    Boolean = "bool"
}

type CborTypes = BigNumber | number | Uint8Array | boolean

export type TypedValue = [CborTypes | CborTypes[], InternalTypes]