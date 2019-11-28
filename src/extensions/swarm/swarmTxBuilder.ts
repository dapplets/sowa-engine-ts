import { TxBuilder } from "../../interfaces/txBuilder"
import { TxTemplate } from '../../types/txTemplate'
import { State } from '../../core/state'
import { SwarmSigner, SwarmData } from './swarmSigner'

type SwarmTxTemplate = TxTemplate & {
    data?: string
}

export class SwarmTxBuilder implements TxBuilder {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/swarm/1.0"
    
    public txConfig: any

    constructor(public readonly txTemplate: SwarmTxTemplate, public readonly state: State, public signer: SwarmSigner) { }

    public isReadyToRun(): boolean {
        throw Error("Method not implemented.")
    }

    public isWaiting(): boolean {
        throw Error("Method not implemented.")
    }

    public prepareTxPayload() {
        throw Error("Method not implemented.")
    }

       // Writable `State` must be in every txBuilder own
    // Also, dappletFrameExecutor contains own state, where typed txMeta is available.

    public signAndSend(data:SwarmData): Promise<void> {
        return new Promise((resolve,reject)=>{
            //ToDo: implement it later
            /*
           this.signer.signAndSend(data, (tx_state, msg) => {
               PubSub.publish(this.topic, {tx_state, msg})
               if (tx_state == EthTxState.MINED) resolve(msg)
               else if (tx_state == TxState.REJECTED) reject(msg)
           })
           */
       })
   }

}