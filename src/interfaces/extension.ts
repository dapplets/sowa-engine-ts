import { TxBuilderConstructor } from "./txBuilder"
import { FormatterConstructor } from "./formatter"
import { Signer } from "./signer"

export interface Extension {
    signer: Signer
    txBuilders: TxBuilderConstructor[],
    formatters: FormatterConstructor[]
}