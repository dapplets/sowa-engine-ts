import { EthTxBuilder, EthTxTemplate } from './ethTxBuilder'
import { StateProxy } from './stateProxy'
import { SolidityTypeConverter } from './solidityTypeConverter'
import { State } from '../../core/state'
import { Signer } from 'src/interfaces/signer';

export class SolidityBuilder extends EthTxBuilder{
    public static GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/solidity/1.0"
    constructor(public readonly txTemplate: EthTxTemplate, state: State, signer: Signer) {
        super(txTemplate,new StateProxy(state, new SolidityTypeConverter()), signer)
    }
}