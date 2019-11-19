import { TxBuilder } from "../../interfaces/txBuilder";
import { TypeConverter } from "../../types/typeConverter";
import { TxTemplate } from '../../types/txTemplate';
import { State as Storage } from '../../core/state';
import * as ethers from "ethers";

enum State {INIT, RUNNING}
type EthTxConfig = {
    argTypes: string[]
    methodSig: string
    varList: string[]
}

export class EthTxBuilder implements TxBuilder {

    public static readonly GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/solidity/1.0";
    public txConfig: any;
    private state:State = State.INIT;
    private config: EthTxConfig

    constructor(public readonly txTemplate: TxTemplate, public readonly storage: Storage, public readonly typeConverter: TypeConverter) {
        this.config = {
            methodSig: ethers.utils.id(txTemplate.function).substring(0,10),
            argTypes:  txTemplate.function.match(/\((.*)\)/)![1].split(','),
            varList:   txTemplate.args,
        }
    }
    
    // Writable `State` must be in every txBuilder own
    // Also, dappletFrameExecutor contains own state, where typed txMeta is available.

    public prepareTxPayload(){
        const {varList, argTypes, methodSig} = this.config
        const vars = varList.map((varname,n)=>{
            const [value, type] = this.storage.getTyped(varname)
            //ToDo: check undefined
            return this.typeConverter(type, argTypes[n], value)
        })
        const argBytes = ethers.utils.defaultAbiCoder.encode(argTypes,vars).substring(2)
        return methodSig + argBytes
    }

    public sendTx(payload:string){
        //ToDo: construct Tx, sign, send
    }

    public isReadyToRun() : boolean  { 
        return this.state == State.INIT 
            &&  !this.isWaiting() 
    }

    public isWaiting():boolean {
        const when = this.txTemplate.when
        return !!when && !!this.evaluateExpression(when)
    }

    public async run(): Promise<any> {
        this.state = State.RUNNING;
    }

    public on(event: string, callback: Function): void {

    }

    //ToDo: refactor to EL class
    public evaluateExpression(expr:string): any {
        return this.storage.get(expr);
    }
}