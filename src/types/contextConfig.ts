import { FeaturesRegistry } from 'src/core/featuresRegistry';
import { DappletProvider } from 'src/interfaces/dappletProvider';

export type ContextConfig = {
    provider: DappletProvider;
    features: FeaturesRegistry;
}