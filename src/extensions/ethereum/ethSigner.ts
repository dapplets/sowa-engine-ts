import { Signer } from 'src/interfaces/signer';

export interface  EthSigner extends Signer {
    signAndSend(payload: { to: string, data: string }): Promise<void>
}
