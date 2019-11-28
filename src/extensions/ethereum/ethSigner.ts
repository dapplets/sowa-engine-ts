import { Signer } from 'src/interfaces/signer';
import { EthData, EthTxState, EthTxStateMsg} from 'src/extensions/ethereum/ethTxBuilder';
export interface  EthSigner extends Signer {
    signAndSend(payload: EthData, listener: (state:EthTxState, msg:EthTxStateMsg)=>void): Promise<void>
}
