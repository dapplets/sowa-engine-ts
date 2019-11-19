import { DappletContext } from './dappletContext';
import { DappletExecutable } from './dappletExecutable';
const MIN_WAIT_FOR_NEXT_RUN_MLS = 1000

export class DappletEngine {

    isRunning: boolean=false;
    isStateDirty: boolean=false;
 
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
        //ToDo: do we need notifications from state or we can just recalculate all "when"?
        this._frameExecutables.forEach(f => f.state.onUpdate(this.setStateIsDirty))
        run()
    }

    private run(): void {
        if (!this.isRunning && this.isStateDirty){
            this.isRunning=true;
            //prepare transactions
            const framePayloads = this._frameExecutables.map(f => f.prepare())
            //pre-send processing and checks (like multisigs)

            //ToDo: make overall payload checks 

            //send all transactions
            framePayloads.forEach(framePayload => {
                framePayload.forEach((data,dappletId)=>{
                    //ToDo: create a subscribtion here
                    this._context.config.signers.get(name)!.signAndSend(data)
                })
            })
            this.isStateDirty = false;
            this.isRunning=false;
        }
        setTimeout(this.run,MIN_WAIT_FOR_NEXT_RUN_MLS)
    }

    private setStateIsDirty() {
        this.isStateDirty = true;
    }
}