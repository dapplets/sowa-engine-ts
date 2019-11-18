import { TxBuilder } from "../../interfaces/txBuilder";
import { TxTemplate } from '../../types/txTemplate';
import { State as Storage } from '../../core/state';

enum State {INIT, RUNNING}

export class EthTxBuilder implements TxBuilder {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/solidity/1.0";
    public txConfig: any;
    private state:State = State.INIT;

    constructor(public readonly txTemplate: TxTemplate, public readonly storage: Storage) { 
    }
    
    // Writable `State` must be in every txBuilder own
    // Also, dappletFrameExecutor contains own state, where typed txMeta is available.

   
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