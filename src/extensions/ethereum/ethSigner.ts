import { Signer } from '../../interfaces/signer'
import { EthData, EthTxState, EthTxStateMsg } from '../../extensions/ethereum/ethTxBuilder'

// ToDo: what sense in Signer interface? There is no common interface between extension-specific signers.
// DILEMMA: either we export concrete Signer types and have type control while linking native wallet signers 
//          OR we don't export them and map signers by builder's TypeGUID
// it depends on which implement of the ReactComponent is most convenient. 
export interface EthSigner extends Signer {
    signAndSend(payload: EthData, listener: (state: EthTxState, msg: EthTxStateMsg) => void): Promise<void>
}
