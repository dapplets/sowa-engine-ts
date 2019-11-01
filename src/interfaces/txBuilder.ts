import { Specifiable } from "./specifiable";
import { State } from "../impl/core/state";

export interface TxBuilder extends Specifiable {
    txConfig: any;
    state: State;
    run(): Promise<any>; // async
    on(event: string, callback: Function): void; // чтобы запустить новую стейт машину
}