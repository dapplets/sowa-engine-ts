import { Extension } from '../../interfaces/extension'
import { SolidityBuilder } from './solidityBuilder'
import { EthAddressHtmlFormatter } from './ethAddressHtmlFormatter'
import { EthSigner } from './ethSigner'
import { ViperBuilder } from './viperBuilder'

export class EthereumExtension implements Extension {
    txBuilders = [SolidityBuilder, ViperBuilder]
    formatters = [EthAddressHtmlFormatter]
}