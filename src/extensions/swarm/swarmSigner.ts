import { Signer } from 'src/interfaces/signer';
export interface SwarmSigner extends Signer {
    signAndSend(payload: any): Promise<void>
}
