import { Extension } from '../../interfaces/extension'
import { SwarmSigner } from './swarmSigner'
import { SwarmTxBuilder } from './swarmTxBuilder'

export class SwarmExtension implements Extension {
    constructor(public signer: SwarmSigner) {
        SwarmTxBuilder.prototype.signer = signer
    }

    txBuilders = [SwarmTxBuilder]
    formatters = []
}