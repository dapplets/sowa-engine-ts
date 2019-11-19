import { Signer } from '../../interfaces/signers'

export class SwarmSigner implements Signer {
    public readonly GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/solidity/1.0"
    
    public signAndSend(payload: any): string {
        throw new Error("Method not implemented.");
    }
}
