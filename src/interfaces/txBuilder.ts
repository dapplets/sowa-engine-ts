import { State } from "../core/state";

export interface TxBuilder {
    txConfig: any;
    state: State;
    run(): Promise<any>; // async
    on(event: string, callback: Function): void; // for running of new state machine
}