import { ContextConfig } from "./types/contextConfig"
import { GithubDappletProvider } from './providers/githubDappletProvider'
import { CameraFormatter } from './extensions/formatters/cameraFormatter'
import { PlainMustacheView } from './extensions/views/plain-mustache-view/plainMustacheView'
import { EthereumExtension } from './extensions/ethereum'
import { NOPEthSigner } from './core/NOPSigner'

const DEFAULT_CONFIG: ContextConfig = {
    providers: [new GithubDappletProvider()], // new SwarmDappletProvider()
    views: [PlainMustacheView],
    formatters: [CameraFormatter],
    extensions: [ new EthereumExtension(new NOPEthSigner())]
}

export { DEFAULT_CONFIG }