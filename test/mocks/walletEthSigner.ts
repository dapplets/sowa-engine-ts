import { EthSigner } from "../../src/extensions/ethereum/ethSigner"
import * as ethers from "ethers"

export class WalletEthSigner implements EthSigner {
    async signAndSend(transaction: { to: string, data: string }): Promise<void> {
        const provider = ethers.getDefaultProvider('rinkeby')
        let privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
        let wallet = new ethers.Wallet(privateKey, provider)
        let tx = await wallet.sendTransaction(transaction)
        console.log(tx)
    }
}