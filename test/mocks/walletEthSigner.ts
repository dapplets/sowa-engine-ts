import { EthSigner } from "../../src/extensions/ethereum/ethSigner"

export class WalletEthSigner implements EthSigner {
    signAndSend(payload: { to: string, data: string }): Promise<void> {
        throw Error("Method not implemented.")
    }
}