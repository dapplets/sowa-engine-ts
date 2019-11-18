import { DappletFrameExecutor } from "./dappletFrameExecutor";
import { DappletContext } from './dappletContext';
import { DappletExecutable } from './dappletExecutable';

export class DappletEngine {
    private _frameExecutors: DappletFrameExecutor[] = [];

    constructor(dapplets: DappletExecutable[], private _context: DappletContext) {
        for (const dapplet of dapplets) {
            const executor = new DappletFrameExecutor(dapplet);
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