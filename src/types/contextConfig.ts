import { DappletProvider } from '../interfaces/dappletProvider'
import { ViewConstructor } from '../interfaces/view'
import { FormatterConstructor } from '../interfaces/formatter'
import { Extension } from '../interfaces/extension'

export type ContextConfig = {
    providers?: DappletProvider[]
    views?: ViewConstructor[]
    formatters?: FormatterConstructor[]
    extensions?: Extension[]
}
