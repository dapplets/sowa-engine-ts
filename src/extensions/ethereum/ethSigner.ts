import { Signer, TxEventListener } from 'src/interfaces/signer';

export type EthData = { to: string, data: string }
export interface  EthSigner extends Signer {
    signAndSend(payload: EthData, listener: TxEventListener): Promise<void>
}
