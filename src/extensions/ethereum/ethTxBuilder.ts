import { TxBuilder } from "../../interfaces/txBuilder"
import { TxTemplate } from '../../types/txTemplate'
import * as ethers from "ethers"
import { StateProxy } from './stateProxy'
import { EthSigner } from "./ethSigner"
import * as PubSub from "pubsub-js"

export type EthData = { to: string, data: string }
export enum EthTxState { CREATED = 1, SIGNED = 2, SENT = 3, REPLACED = 4, MINED = 5, REJECTED = 6, ERR = 99 } //ToDo: REORG?
export type EthTxStateMsg = {
    txid?: BigInteger
    events?: any                  //ToDo: later: use Dapplets to display events 
}

type EthTxConfig = {
    methodSig: string | null
    argTypes: string[]
    varList: string[]
}

export type EthTxTemplate = TxTemplate & {
    function?: string // It's nullable because simple coin transfering doesn't require declaration of function 
    args?: string[]
}

export abstract class EthTxBuilder implements TxBuilder {
    public txConfig: any
    private status: EthTxState = EthTxState.CREATED
    private config: EthTxConfig

    constructor(public readonly txTemplate: EthTxTemplate, protected state: StateProxy, public readonly signer: EthSigner, private readonly topic: string) {
        this.config = {
            methodSig: txTemplate.function ? ethers.utils.id(txTemplate.function).substring(0, 10) : null,
            argTypes: txTemplate.function ? txTemplate.function.match(/\((.*)\)/)![1].split(',') : [],
            varList: txTemplate.args || [],
        }

        if (this.config.varList.length !== this.config.argTypes.length) {
            throw Error("The number of arguments and values must be equal.")
        }
    }

    // Writable `State` must be in every txBuilder own
    // Also, dappletFrameExecutor contains own state, where typed txMeta is available.

    public signAndSend(data: EthData): Promise<void> {
        return new Promise((resolve, reject) => {
            this.signer.signAndSend(data, (tx_state, msg) => {
                PubSub.publish(this.topic, { tx_state, msg })
                if (tx_state == EthTxState.MINED) resolve()
                else if (tx_state == EthTxState.REJECTED) reject(msg)
            })
        })
    }

    public prepareTxPayload(): string {
        const { varList, argTypes, methodSig } = this.config
        if (!varList || !varList.length) return ""

        const values = varList.map((varname, n) => this.state.get(varname, argTypes[n]))
        // ToDo: encoding is broken
        const argBytes = ethers.utils.defaultAbiCoder.encode(argTypes, values).substring(2)
        return methodSig + argBytes
    }

    public isReadyToRun(): boolean {
        return this.status == EthTxState.CREATED
            && !this.isWaiting()
    }

    public isWaiting(): boolean {
        const when = this.txTemplate.when
        return !!when && !!this.evaluateExpression(when)
    }

    //ToDo: refactor to EL class
    public evaluateExpression(expr: string): any {
        return this.state.get(expr)
    }
}