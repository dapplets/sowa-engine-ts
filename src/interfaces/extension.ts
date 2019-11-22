import { TxBuilderConstructor } from "./txBuilder"
import { FormatterConstructor } from "./formatter"

export interface Extension {
    txBuilder: TxBuilderConstructor,
    formatters: FormatterConstructor[]
}