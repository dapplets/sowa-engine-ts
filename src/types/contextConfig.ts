import { FeatureRegistry } from '../core/featureRegistry';
import { DappletProvider } from '../interfaces/dappletProvider';

export type ContextConfig = {
    providers?: DappletProvider[];
    features?: FeatureRegistry;
}