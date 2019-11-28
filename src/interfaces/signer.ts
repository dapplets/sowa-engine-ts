export type TxEventListener = (state:any, msg:any)=>void

export interface Signer { // ToDo: Think about how to rename it
    signAndSend(payload: any, listener: TxEventListener): Promise<void>
}