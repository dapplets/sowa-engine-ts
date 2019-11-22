import { TxBuilder } from "../../interfaces/txBuilder";
import { TypeConverter } from "../../types/typeConverter";
import { TxTemplate } from '../../types/txTemplate';
import { State } from '../../core/state';
import * as ethers from "ethers";

enum Status { INIT, RUNNING }
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
    private status: Status = Status.INIT;
    private config: EthTxConfig

    constructor(public readonly txTemplate: EthTxTemplate, public readonly state: State, public readonly typeConverter: TypeConverter) {
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
            const typedValue = this.state.get(varname)
            if (!typedValue) return undefined
            const [value,type] = typedValue
            //ToDo: check undefined
            return typedValue && this.typeConverter(type, argTypes[n], value)
        })
        const argBytes = ethers.utils.defaultAbiCoder.encode(argTypes, vars).substring(2)
        return methodSig + argBytes
    }

    public isReadyToRun(): boolean {
        return this.status == Status.INIT
            && !this.isWaiting()
    }

    public isWaiting(): boolean {
        const when = this.txTemplate.when
        return !!when && !!this.evaluateExpression(when)
    }

    public async run(): Promise<any> {
        this.status = Status.RUNNING;
    }

    public on(event: string, callback: Function): void {

    }

    //ToDo: refactor to EL class
    public evaluateExpression(expr: string): any {
        return this.state.get(expr);
    }
}