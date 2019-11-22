import { Extension } from '../../interfaces/extension'
import { EthTxBuilder } from './ethTxBuilder'
import { EthAddressHtmlFormatter } from './ethAddressHtmlFormatter'
import { EthSigner } from './ethSigner'

export class EthereumExtenstion implements Extension {
    constructor(signer: EthSigner) {
        // ToDo: think
        EthTxBuilder.prototype.signer = signer
    }

    txBuilder = EthTxBuilder
    formatters = [EthAddressHtmlFormatter]
}