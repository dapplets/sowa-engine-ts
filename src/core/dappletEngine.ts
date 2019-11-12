import { DappletFrameExecutor } from "./dappletFrameExecutor";
import { DappletRequest } from "../types/dappletRequest";
import { DappletProvider } from "../interfaces/dappletProvider";
import { FrameStatus } from "../types/statusEnum";
import { FeatureRegistry } from './featureRegistry';

export class DappletEngine {
    private _frameExecutors: DappletFrameExecutor[] = [];
    private _statusChangedHandler: (statuses: FrameStatus[]) => void = () => {};

    constructor(dappletRequest: DappletRequest, featureRegistry: FeatureRegistry) {
        for (const frame of dappletRequest.frames) {
            const executor = new DappletFrameExecutor(frame.dappletId, frame.txMeta, featureRegistry);
            executor.onStatusChanged((s) => this._newExecutorStatus(executor, s));
            this._frameExecutors.push(executor);
        }
    }

    // // вызывается при изменении Storage/State
    // // в момент когда приходят события от TxBuilder
    // private _scheduleNextRun() {

    // }

    public async load(dappletProviders: DappletProvider[]): Promise<void> {
        const promises = this._frameExecutors.map(f => f.load(dappletProviders));
        await Promise.all(promises);
    }

    public validate() {
        this._frameExecutors.map(f => f.validate());
    }

    async run(): Promise<void> {
        const promises = this._frameExecutors.map(f => f.run());
        await Promise.all(promises);
    }

    public onStatusChanged(handler: (statuses: FrameStatus[]) => void) {
        this._statusChangedHandler = handler;
    }

    private _newExecutorStatus(executor: DappletFrameExecutor, status: FrameStatus) {
        const statuses = this._frameExecutors.map(ex => ex.status)
        this._statusChangedHandler(statuses);
    }
}