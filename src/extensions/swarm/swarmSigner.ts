import { Signer } from 'src/interfaces/signer'

export type SwarmData = { to: string, data: string }
export enum SwarmTxState {CREATED=1, SIGNED=2, SENT=3, REPLACED=4, MINED=5, ERR=99}
export type SwarmTxStateMsg = {
    txid?: BigInteger
    events?: any                  //ToDo: later: use Dapplets to display events 
}
export interface SwarmSigner extends Signer {
    signAndSend(payload:  any, listener: (state:SwarmTxState, msg:SwarmTxStateMsg)=>void): Promise<void>
}
