import { EthTxBuilder, EthTxTemplate } from './ethTxBuilder'
import { StateProxy } from './stateProxy'
import { ViperTypeConverter } from './viperTypeConverter'
import { State } from '../../core/state'
import { Signer } from '../../interfaces/signer';

export class ViperBuilder extends EthTxBuilder{
    public static GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/viper/1.0"
    constructor(public readonly txTemplate: EthTxTemplate, state: State, signer: Signer, topic: string) {
        super(txTemplate,new StateProxy(state, new ViperTypeConverter()), signer, topic)
    }
}