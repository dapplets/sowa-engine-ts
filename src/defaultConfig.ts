import { ContextConfig } from './types/contextConfig'
import { GithubDappletProvider } from './providers/githubDappletProvider'
import { CameraFormatter } from './extensions/formatters/cameraFormatter'
import { EthereumExtension } from './extensions/ethereum'
import { extensions } from '.'

const DEFAULT_CONFIG: ContextConfig = {
    providers: [new GithubDappletProvider()], // new SwarmDappletProvider()
    views: [
        extensions.views.gridMustache.GridMustacheView,
        extensions.views.plainMustache.PlainMustacheView
    ],
    formatters: [CameraFormatter],
    extensions: [new EthereumExtension()]
    // ToDo: unify classes ([new X] vs [X])
}

export { DEFAULT_CONFIG }