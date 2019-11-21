import { ContextConfig } from "./types/contextConfig";
import { EthTxBuilder } from "./extensions/ethereum/ethTxBuilder";
import { GithubDappletProvider } from './providers/githubDappletProvider';
import { CameraFormatter } from './extensions/formatters/cameraFormatter';
import { EthAddressHtmlFormatter } from './extensions/ethereum/ethAddressHtmlFormatter';
import { PlainMustacheView } from './extensions/views/plain-mustache-view/plainMustacheView';
import { Signers } from './interfaces/signers';
import { EthSigner } from "./extensions/ethereum/ethSigner";
import { SwarmSigner } from "./extensions/swarm/swarmSigner";

//import { SwarmDappletProvider } from './providers/swarmDappletProvider';

const DEFAULT_CONFIG: ContextConfig = {
    providers: [new GithubDappletProvider()], // new SwarmDappletProvider()
    views: [PlainMustacheView],
    builders: [EthTxBuilder],
    formatters: [CameraFormatter, EthAddressHtmlFormatter],
    signers: new Signers([new EthSigner(), new SwarmSigner()]),
    typeConverter: DefaultTypeConverter,
};

function DefaultTypeConverter(fromType: string, toType: string, value: any): any {
    throw "NOT IMPLEMENTED DefaultTypeConverter"
}

export { DEFAULT_CONFIG }