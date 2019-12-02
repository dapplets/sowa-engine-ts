import { TxTemplate } from '../types/txTemplate'
import { State } from '../core/state'
import { Signer } from './signer'

export interface TxBuilder {
    signer: Signer
    txConfig: any
    isReadyToRun(): boolean
    isWaiting(): boolean
    prepareTxPayload(): any
    signAndSend(data: any): Promise<void>
}

export interface TxBuilderConstructor {
    GLOBAL_NAME: string
    new(txTemplate: TxTemplate, state: State, signer: Signer, topic: string): TxBuilder
}