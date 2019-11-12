import { DappletFrameExecutor } from "./dappletFrameExecutor";
import { DappletRequest } from "../types/dappletRequest";
import { DappletProvider } from "../interfaces/dappletProvider";
import { FrameStatus } from "../types/statusEnum";
import { FeatureRegistry } from './featureRegistry';
import { DappletContext } from './dappletContext';

export class DappletEngine {
    private _frameExecutors: DappletFrameExecutor[] = [];
    private _statusChangedHandler: (statuses: FrameStatus[]) => void = () => {};

    constructor(dappletRequest: DappletRequest, private _context: DappletContext) {
        for (const frame of dappletRequest.frames) {
            const executor = new DappletFrameExecutor(frame.dappletId, frame.txMeta, this._context.featureRegistry);
            executor.onStatusChanged((s) => this._newExecutorStatus(executor, s));
            this._frameExecutors.push(executor);
        }
    }

    // // It's called when Storage/State is changing.
    // // in the moment of receiving events from TxBuilder
    // private _scheduleNextRun() {

    // }

    public async load(): Promise<void> {
        const promises = this._frameExecutors.map(f => f.load(this._context.dappletProviders));
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