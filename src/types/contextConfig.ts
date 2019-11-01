import { FeaturesRegistry } from 'src/impl/featuresRegistry';
import { DappletProvider } from 'src/interfaces/dappletProvider';

export type ContextConfig = {
    provider: DappletProvider;
    features: FeaturesRegistry;
}