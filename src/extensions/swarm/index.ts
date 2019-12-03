import { Extension } from '../../interfaces/extension'
import { SwarmSigner } from './swarmSigner'
import { SwarmTxBuilder } from './swarmTxBuilder'

export class SwarmExtension implements Extension {
    txBuilders = [SwarmTxBuilder]
    formatters = []
}