export interface EthSigner {
    signAndSend(payload: { to: string, data: string }): Promise<void>
}
