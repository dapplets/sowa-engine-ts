// ToDo: what sense in Signer interface? There is no common interface between extension-specific signers.
export interface Signer {
    signAndSend(payload: any, listener: (state: any, msg: any) => void): Promise<void>
}