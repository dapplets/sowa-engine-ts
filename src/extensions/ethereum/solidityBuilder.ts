import { EthTxBuilder, EthTxTemplate } from './ethTxBuilder'
import { StateProxy } from './stateProxy'
import { SolidityTypeConverter } from './solidityTypeConverter'
import { State } from '../../core/state'
import { Signer } from '../../interfaces/signer';

// ToDo: maybe split Viper and Solidity builders into different extensions?
export class SolidityBuilder extends EthTxBuilder {
    public static GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/solidity/1.0"
    constructor(public readonly txTemplate: EthTxTemplate, state: State, signer: Signer, topic: string) {
        super(txTemplate, new StateProxy(state, new SolidityTypeConverter()), signer, topic)
    }
}