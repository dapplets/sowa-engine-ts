// хранит входной JSON, статусы исполнения транзакций
export class State {
    // setter'ы, которые дёргают _scheduleNextRun
    // KeyValue or Hashmap<key, any, parentKey>
    // txBuilder.status.something

    constructor(metadata: any) { }
}