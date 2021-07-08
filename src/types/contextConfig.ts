import { FeaturesRegistry } from '../core/featuresRegistry';
import { DappletProvider } from '../interfaces/dappletProvider';

export type ContextConfig = {
    provider?: DappletProvider;
    features?: FeaturesRegistry;
}