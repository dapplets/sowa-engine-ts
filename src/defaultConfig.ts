import { ContextConfig } from './types/contextConfig'
import { GithubDappletProvider } from './providers/githubDappletProvider'
import { CameraFormatter } from './extensions/formatters/cameraFormatter'
import { EthereumExtension } from './extensions/ethereum'
import { NOPEthSigner } from './core/NOPSigner'

const DEFAULT_CONFIG: ContextConfig = {
    providers: [new GithubDappletProvider()], // new SwarmDappletProvider()
    views: [],
    formatters: [CameraFormatter],
    extensions: [new EthereumExtension(new NOPEthSigner())]
    // ToDo: unify classes ([new X] vs [X])
}

export { DEFAULT_CONFIG }