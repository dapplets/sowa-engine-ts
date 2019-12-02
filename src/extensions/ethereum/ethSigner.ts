import { Signer } from '../../interfaces/signer';
import { EthData, EthTxState, EthTxStateMsg } from '../../extensions/ethereum/ethTxBuilder';
export interface EthSigner extends Signer {
    signAndSend(payload: EthData, listener: (state: EthTxState, msg: EthTxStateMsg) => void): Promise<void>
}
