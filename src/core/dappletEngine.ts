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

    private run(): void {
        //prepare transactions
        const framePayloads = this._frameExecutables.map(f => f.prepare())
        //pre-send processing and checks (like multisigs)

        //send all transactions
        framePayloads.forEach(framePayload => {
            framePayload.forEach((data,dappletId)=>{
                //ToDo: create a subscribtion here
                this._context.config.signers.get(name)!.signAndSend(data)
            })
        })
    }
}