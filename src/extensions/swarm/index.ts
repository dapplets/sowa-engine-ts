import { Extension } from '../../interfaces/extension'
import { SwarmSigner } from './swarmSigner'
import { SwarmTxBuilder } from './swarmTxBuilder'
``
export class SwarmExtenstion implements Extension {
    constructor(public signer: SwarmSigner) {
        SwarmTxBuilder.prototype.signer = signer
    }

    txBuilders = [SwarmTxBuilder]
    formatters = []
}