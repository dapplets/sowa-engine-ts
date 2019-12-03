import { TxBuilderConstructor } from "./txBuilder"
import { FormatterConstructor } from "./formatter"

export interface Extension {
    txBuilders: TxBuilderConstructor[],
    formatters: FormatterConstructor[]
}