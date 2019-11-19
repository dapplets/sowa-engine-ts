import { TxBuilder } from "../../interfaces/txBuilder";
import { TypeConverter } from "../../types/typeConverter";
import { TxTemplate } from '../../types/txTemplate';
import { State as Storage } from '../../core/state';
import * as ethers from "ethers";

enum State { INIT, RUNNING }
type EthTxConfig = {
    methodSig: string | null
    argTypes: string[]
    varList: string[]
}

type EthTxTemplate = TxTemplate & {
    function?: string // It's nullable because simple coin transfering doesn't require declaration of function 
    args?: string[]
}

export class EthTxBuilder implements TxBuilder {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/solidity/1.0";
    
    public txConfig: any;
    private state: State = State.INIT;
    private config: EthTxConfig

    constructor(public readonly txTemplate: EthTxTemplate, public readonly storage: Storage, public readonly typeConverter: TypeConverter) {
        this.config = {
            methodSig: txTemplate.function ? ethers.utils.id(txTemplate.function).substring(0, 10) : null,
            argTypes: txTemplate.function ? txTemplate.function.match(/\((.*)\)/)![1].split(',') : [],
            varList: txTemplate.args || [],
        }
    }

    // Writable `State` must be in every txBuilder own
    // Also, dappletFrameExecutor contains own state, where typed txMeta is available.

    public prepareTxPayload(): string {
        const { varList, argTypes, methodSig } = this.config
        if (!varList) return ""
        
        const vars = varList.map((varname, n) => {
            const [value, type] = this.storage.getTyped(varname)
            //ToDo: check undefined
            return this.typeConverter(type, argTypes[n], value)
        })
        const argBytes = ethers.utils.defaultAbiCoder.encode(argTypes, vars).substring(2)
        return methodSig + argBytes
    }

    public isReadyToRun(): boolean {
        return this.state == State.INIT
            && !this.isWaiting()
    }

    public isWaiting(): boolean {
        const when = this.txTemplate.when
        return !!when && !!this.evaluateExpression(when)
    }

    public async run(): Promise<any> {
        this.state = State.RUNNING;
    }

    public on(event: string, callback: Function): void {

    }

    //ToDo: refactor to EL class
    public evaluateExpression(expr: string): any {
        return this.storage.get(expr);
    }
}