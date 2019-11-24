import { Extension } from '../../interfaces/extension'
import { SolidityBuilder } from './solidityBuilder'
import { EthTxBuilder } from './ethTxBuilder'
import { EthAddressHtmlFormatter } from './ethAddressHtmlFormatter'
import { EthSigner } from './ethSigner'
import { TxTemplate } from '../../types/txTemplate'

export class EthereumExtension implements Extension {
    constructor(public signer: EthSigner) {}

    txBuilders = [SolidityBuilder]
    formatters = [EthAddressHtmlFormatter]
}