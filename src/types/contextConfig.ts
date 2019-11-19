import { DappletProvider } from '../interfaces/dappletProvider';
import { ViewConstructor } from '../interfaces/view';
import { TypeConverter } from '../types/typeConverter';
import { TxBuilderConstructor } from '../interfaces/txBuilder';
import { FormatterConstructor } from '../interfaces/formatter';
import { Signers } from '../interfaces/signers';

export type ContextConfig = {
    providers?: DappletProvider[]
    views?: ViewConstructor[]
    builders?: TxBuilderConstructor[]
    formatters?: FormatterConstructor[]
    typeConverter?: TypeConverter
    signers: Signers
}
