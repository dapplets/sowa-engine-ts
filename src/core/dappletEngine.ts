import { DappletContext } from './dappletContext'
import { DappletExecutable } from './dappletExecutable'
const MIN_WAIT_FOR_NEXT_RUN_MLS = 1000

export class DappletEngine {

    needReEvaluate: boolean = true

    constructor(public readonly frameExecutables: DappletExecutable[], private _context: DappletContext) {
    }

    // // It's called when Storage/State is changing.
    // // in the moment of receiving events from TxBuilder
    // private _scheduleNextRun() {

    // }

    async start(): Promise<void> {
        for (const exec of this.frameExecutables) {
            //exec.activeView.render()
        }
    }

    public async approve() {
        //ToDo: do we need notifications from state or we can just recalculate all "when"?
        this.frameExecutables.forEach(f => f.state.onUpdate(() => this.needReEvaluate = true));
        await this.run()
    }

    private async run() {
        let n = 0
        do {
            if (this.needReEvaluate) {
                this.needReEvaluate = false
                //prepare transactions
                const framePayloads = this.frameExecutables.map(f => f.prepare())
                //pre-send processing and checks (like multisigs)

                //ToDo: make overall payload checks 
                //1. iterate over frames
                //2. for each dependend frame of the frame DO
                //3. re-work payloads of the dependend frame

                //send all transactions
                framePayloads.forEach(framePayload => {
                    framePayload.forEach(([signer, data]) => {
                        ++n
                        signer.signAndSend(data).then(() => --n)
                    })
                })
            }
            await this.sleep(MIN_WAIT_FOR_NEXT_RUN_MLS)
        } while (n > 0) //ToDo: check it: loop finishes if some tx are waiting for unrealistic conditions. Correct?
    }

    private sleep(millis: number) {
        return new Promise(resolve => setTimeout(resolve, millis))
    }
}