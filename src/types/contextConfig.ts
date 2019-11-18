import { FeatureRegistry } from '../core/featureRegistry';
import { DappletProvider } from '../interfaces/dappletProvider';
import { View, ViewConstructor } from '../interfaces/view';
import { TxBuilder } from '../interfaces/txBuilder';
import { Formatter } from '../interfaces/formatter';

export type ContextConfig = {
    providers?: DappletProvider[]
    views: ViewConstructor[]
    builders: TxBuilder[]
    formatters: Formatter[]
}
