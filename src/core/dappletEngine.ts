import { DappletFrameExecutor } from "./dappletFrameExecutor";
import { DappletRequest } from "../types/dappletRequest";
import { DappletProvider } from "../interfaces/dappletProvider";
import { FrameStatus } from "../types/statusEnum";
import { FeaturesRegistry } from './featuresRegistry';

export class DappletEngine {
    private _frameExecutors: DappletFrameExecutor[] = [];
    private _statusChangedHandler: (statuses: FrameStatus[]) => void = () => {};

    constructor(dappletRequest: DappletRequest, featuresRegistry: FeaturesRegistry) {
        for (const frame of dappletRequest.frames) {
            const executor = new DappletFrameExecutor(frame.dappletId, frame.txMeta, featuresRegistry);
            executor.onStatusChanged((s) => this._newExecutorStatus(executor, s));
            this._frameExecutors.push(executor);
        }
    }

    // // вызывается при изменении Storage/State
    // // в момент когда приходят события от TxBuilder
    // private _scheduleNextRun() {

    // }

    public async load(dappletProvider: DappletProvider): Promise<void> {
        const promises = this._frameExecutors.map(f => f.load(dappletProvider));
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