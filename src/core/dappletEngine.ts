import { DappletFrameExecutor } from "./dappletFrameExecutor";
import { DappletContext } from './dappletContext';
import { DappletFrame } from 'src/types/dappletFrame';

export class DappletEngine {
    private _frameExecutors: DappletFrameExecutor[] = [];

    constructor(dapplets: DappletFrame[], private _context: DappletContext) {
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