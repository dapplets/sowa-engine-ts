import { EthTxBuilder, EthTxTemplate } from './ethTxBuilder'
import { StateProxy } from './stateProxy'
import { ViperTypeConverter } from './viperTypeConverter'
import { State } from '../../core/state'
import { Signer } from '../../interfaces/signer';

// ToDo: maybe split Viper and Solidity builders into different extensions?
export class ViperBuilder extends EthTxBuilder {
    public static GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/viper/1.0"
    constructor(txTemplate: EthTxTemplate, state: State, topic: string) {
        super(txTemplate, new StateProxy(state, new ViperTypeConverter()), topic)
    }
}