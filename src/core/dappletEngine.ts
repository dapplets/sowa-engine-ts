import { DappletContext } from './dappletContext';
import { DappletExecutable } from './dappletExecutable';

export class DappletEngine {

    constructor(private _frameExecutables: DappletExecutable[], private _context: DappletContext) {
    }

    // // It's called when Storage/State is changing.
    // // in the moment of receiving events from TxBuilder
    // private _scheduleNextRun() {

    // }

    async start(): Promise<void> {
        for (const exec of this._frameExecutables) {
            exec.activeView.render()
        }
    }

    public onApproved() {
        run()
    }

    private async run(): Promise<void> {
        const promises = this._frameExecutables.map(f => f.run());
        await Promise.all(promises);
    }
}