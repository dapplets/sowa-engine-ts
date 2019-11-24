import { EthSigner } from "../../src/extensions/ethereum/ethSigner"

export class NOPEthSigner implements EthSigner {
    signAndSend(payload: { to: string, data: string }): Promise<void> {
        return new Promise((resolve,reject) => {
            console.log("NoOp signer called: Did nothing", payload)
            resolve ()
        })
    }
}