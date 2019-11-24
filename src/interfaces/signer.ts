export interface Signer { // ToDo: Think about how to rename it
    signAndSend(payload: any): Promise<void>
}