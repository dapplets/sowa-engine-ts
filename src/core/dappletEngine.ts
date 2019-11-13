import { DappletFrameExecutor } from "./dappletFrameExecutor";
import { DappletRequest } from "../types/dappletRequest";
import { DappletContext } from './dappletContext';

export class DappletEngine {
    private _frameExecutors: DappletFrameExecutor[] = [];

    constructor(dappletRequest: DappletRequest, private _context: DappletContext) {
        for (const frame of dappletRequest.frames) {
            if (!frame.dapplet) throw Error("Dapplet is not loaded.");
            const executor = new DappletFrameExecutor(frame.dapplet, frame.txMeta, this._context.featureRegistry);
            this._frameExecutors.push(executor);
        }
    }

    // // It's called when Storage/State is changing.
    // // in the moment of receiving events from TxBuilder
    // private _scheduleNextRun() {

    // }

    async run(): Promise<void> {
        const promises = this._frameExecutors.map(f => f.run());
        await Promise.all(promises);
    }
}