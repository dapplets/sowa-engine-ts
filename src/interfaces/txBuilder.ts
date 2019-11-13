export interface TxBuilder {
    txConfig: any;
    run(): Promise<any>; // async
    on(event: string, callback: Function): void; // for running of new state machine
}