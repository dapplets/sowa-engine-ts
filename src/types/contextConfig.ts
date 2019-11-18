import { DappletProvider } from '../interfaces/dappletProvider';
import { ViewConstructor } from '../interfaces/view';
import { TxBuilderConstructor } from '../interfaces/txBuilder';
import { FormatterConstructor } from '../interfaces/formatter';

export type ContextConfig = {
    providers?: DappletProvider[]
    views: ViewConstructor[]
    builders: TxBuilderConstructor[]
    formatters: FormatterConstructor[]
}
