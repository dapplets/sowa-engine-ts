import { TxBuilderConstructor } from "./txBuilder"
import { FormatterConstructor } from "./formatter"
import { TypeConverterConstructor } from "./typeConverter"

export interface Extension {
    txBuilder: TxBuilderConstructor,
    formatters: FormatterConstructor[]
}