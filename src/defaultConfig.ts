import { ContextConfig } from "./types/contextConfig";
import { FeaturesRegistry } from "./impl/featuresRegistry";
import { EthTxBuilder } from "./impl/txBuilders/ethTxBuilder";
import { GithubDappletProvider } from './impl/providers/githubDappletProvider';

const DEFAULT_CONFIG: ContextConfig = {
    provider: new GithubDappletProvider(),
    features: new FeaturesRegistry([EthTxBuilder])
};

export { DEFAULT_CONFIG }