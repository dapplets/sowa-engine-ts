import { FeaturesRegistry } from '../core/featuresRegistry';
import { DappletProvider } from '../interfaces/dappletProvider';

export type ContextConfig = {
    providers?: DappletProvider[];
    features?: FeaturesRegistry;
}