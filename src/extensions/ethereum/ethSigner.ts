import { Signer } from '../../interfaces/signer'
import { EthData, EthTxState, EthTxStateMsg } from '../../extensions/ethereum/ethTxBuilder'

// ToDo: what sense in Signer interface? There is no common interface between extension-specific signers.
export interface EthSigner extends Signer {
    signAndSend(payload: EthData, listener: (state: EthTxState, msg: EthTxStateMsg) => void): Promise<void>
}
