import { DappletFrameExecutor } from "./dappletFrameExecutor";
import { DappletContext } from './dappletContext';
import { DappletFrameRuntime } from '../types/dappletFrameRuntime';

export class DappletEngine {
    private _frameExecutors: DappletFrameExecutor[] = [];

    constructor(dappletFrames: DappletFrameRuntime[], private _context: DappletContext) {
        for (const frame of dappletFrames) {
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