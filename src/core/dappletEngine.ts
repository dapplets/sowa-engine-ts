import { DappletContext, ID } from './dappletContext'
import { DappletExecutable } from './dappletExecutable'
import PubSub from 'pubsub-js'

const MIN_WAIT_FOR_NEXT_RUN_MLS = 1000

const FINAL_STATE = 128

export enum State {
    INIT = 1,
    WAITING_FOR_APPROVAL = 2,
    EXECUTING = 4,
    FINISHED = FINAL_STATE,
    ERROR = 99
}

export type HistoryItem = any        //ToDo: make history events more specific?

export class DappletEngine {

    needReEvaluate: boolean = true

    public eventHistory: HistoryItem[] = []

    constructor(public readonly id: ID, public readonly frameExecutables: DappletExecutable[], private _context: DappletContext) {
        PubSub.subscribe(this.id, (e: any) => this.eventHistory.push(e))
        PubSub.publish(this.id, State.INIT)
    }

    async start(): Promise<void> {
        for (const exec of this.frameExecutables) {
            //exec.activeView.render()
        }
        PubSub.publish(this.id, State.WAITING_FOR_APPROVAL)
    }

    public async onApproved() {
        PubSub.publish(this.id, State.EXECUTING)
        //ToDo: do we need notifications from state or we can just recalculate all "when"?
        this.frameExecutables.forEach(f => f.state.onUpdate(() => this.needReEvaluate = true))
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
                    framePayload.forEach(([builder, data]) => {
                        ++n
                        builder.signAndSend(data).then(() => {
                            --n                                       //ToDo: publish TX_FINISHED? (will duplicate own builder's event)
                        }).catch(e => {
                            PubSub.publish(this.id, State.ERROR)   //ToDo: publish errmsg
                        })
                    })
                })
            }
            await this.sleep(MIN_WAIT_FOR_NEXT_RUN_MLS)
        } while (n > 0) //ToDo: check it: loop finishes if some tx are waiting for unrealistic conditions. Correct?
        PubSub.publish(this.id, State.FINISHED)

        PubSub.unsubscribe(this.id)  //cleanup on engine stop
    }

    private sleep(millis: number) {
        return new Promise(resolve => setTimeout(resolve, millis))
    }
}