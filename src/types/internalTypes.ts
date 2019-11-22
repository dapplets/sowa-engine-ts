export enum InternalTypes {
    Integer = "int",
    Bytes = "bytes",
    Text = "text",
    Boolean = "bool"
}

export type TypedValue = [any, InternalTypes]