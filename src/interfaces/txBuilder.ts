import { TxTemplate } from 'src/types/txTemplate';
import { State } from 'src/core/state';

export interface TxBuilder {
    txConfig: any;
    run(): Promise<any>; // async
    on(event: string, callback: Function): void; // for running of new state machine
}

export interface TxBuilderConstructor {
    GLOBAL_NAME: string;
    new (txTemplate: TxTemplate, state: State): TxBuilder;
}