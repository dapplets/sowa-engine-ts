import { State } from "../core/state";

export interface TxBuilder {
    txConfig: any;
    state: State;
    run(): Promise<any>; // async
    on(event: string, callback: Function): void; // чтобы запустить новую стейт машину
}