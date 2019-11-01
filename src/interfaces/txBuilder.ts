import { Feature } from "./feature";
import { State } from "../impl/core/state";

export interface TxBuilder extends Feature {
    txConfig: any;
    state: State;
    run(): Promise<any>; // async
    on(event: string, callback: Function): void; // чтобы запустить новую стейт машину
}