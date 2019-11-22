import { Extension } from '../../interfaces/extension';
import { SwarmSigner } from './swarmSigner';
import { SwarmTxBuilder } from './swarmTxBuilder'

export class SwarmExtenstion implements Extension {
    constructor(signer: SwarmSigner) {
        SwarmTxBuilder.prototype.signer = signer;
    }

    txBuilder = SwarmTxBuilder
    formatters = []
}