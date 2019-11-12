import { ContextConfig } from "./types/contextConfig";
import { FeaturesRegistry } from "./core/featuresRegistry";
import { EthTxBuilder } from "./extensions/txBuilders/ethTxBuilder";
import { GithubDappletProvider } from './providers/githubDappletProvider';
import { CameraFormatter } from './extensions/formatters/cameraFormatter';
import { EthAddressHtmlFormatter } from './extensions/formatters/ethAddressHtmlFormatter';
import { PlainMustacheView } from './extensions/views/plainMustacheView';

const DEFAULT_CONFIG: ContextConfig = {
    providers: [new GithubDappletProvider()],
    features: new FeaturesRegistry(EthTxBuilder, CameraFormatter, EthAddressHtmlFormatter, PlainMustacheView)
};

export { DEFAULT_CONFIG }