import { ContextConfig } from './types/contextConfig'
import { GithubDappletProvider } from './providers/githubDappletProvider'
import { CameraFormatter } from './extensions/formatters/cameraFormatter'
import { EthereumExtension } from './extensions/ethereum'
import { GridMustacheView } from './extensions/views/grid-mustache-view'
import { PlainMustacheView } from './extensions/views/plain-mustache-view'

const DEFAULT_CONFIG: ContextConfig = {
    providers: [new GithubDappletProvider()], // new SwarmDappletProvider()
    views: [GridMustacheView, PlainMustacheView],
    formatters: [CameraFormatter],
    extensions: [new EthereumExtension()]
    // ToDo: unify classes ([new X] vs [X])
}

export { DEFAULT_CONFIG }