export interface Signer { // ToDo: Think about how to rename it
    signAndSend(payload: any, listener: (state: any, msg: any) => void): Promise<void>
}