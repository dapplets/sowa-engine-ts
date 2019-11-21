import { ContextConfig } from "./types/contextConfig";
import { EthTxBuilder } from "./support/ethereum/ethTxBuilder";
import { GithubDappletProvider } from './providers/githubDappletProvider';
import { CameraFormatter } from './extensions/formatters/cameraFormatter';
import { EthAddressHtmlFormatter } from './support/ethereum/ethAddressHtmlFormatter';
import { PlainMustacheView } from './extensions/views/plainMustacheView';
import { Signers } from './interfaces/signers';
import { EthSigner } from "./extensions/signers/ethSigner";
import { SwarmSigner } from "./extensions/signers/swarmSigner";

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