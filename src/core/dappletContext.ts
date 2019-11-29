import { DappletRequest } from "../types/dappletRequest"
import { DappletEngine, HistoryItem } from "./dappletEngine"
import { ContextConfig } from '../types/contextConfig'
import { DEFAULT_CONFIG } from "../defaultConfig"
import { DappletTemplate } from '../types/dappletTemplate'
import { DappletExecutable } from './dappletExecutable'
import * as cbor from "cbor"

// DappletContext (DC) is created in the moment of a wallet starting.
// DC is Singleton class.
// DC loads and verifies DappletTemplates and other resources referenced in Frames. And rejects the Request if any errors.

export type ID = string     //Maybe BigInt is more suitable as Id

export class DappletContext {
    public readonly config: ContextConfig

    constructor(config: ContextConfig = DEFAULT_CONFIG) {
        // ToDo: may be a deep merging is needed here
        this.config = { ...DEFAULT_CONFIG, ...config }
    }

    engines : { [key:string]: DappletEngine} = {}

    async processRequest(cborBinary: Buffer): Promise<DappletEngine> {
        const request: DappletRequest = cbor.decode(cborBinary)
        // dapplet loading and prepare for execution
        const dapplets = await Promise.all(
            request.map(([dappletId, metadata], idx) =>
                this._loadDapplet(dappletId)
                    .then(dappletTemplate => new DappletExecutable(
                        dappletTemplate,
                        metadata || [],
                        this.config,
                        "F" + idx             // ToDo: how to address frame for subscriptions?
                    ))
            )
        )
        
        const engineId = this.newId()
        const engine = new DappletEngine(engineId, dapplets, this)
        this.engines[engineId] = engine
        return engine // ToDo: what should processRequest return?
        // ToDo: return { 
        //    onDappletRequest: function(...), 
        //    onFetchStatus: function(...), 
        //}
    }

    //ToDo: clear distinguish between GUIDs and IDs

    //ToDo: there are three kinds of IDs: 
    // 1) by anyone randomly generated GUIDs (long)
    // 2) centrally created sequencial IDs (short)
    // we short ids are better, but which one we'll use where?
    public newId(): ID {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
    }

    async processHistoryRequest(cborBinary: Buffer): Promise<Buffer> {
        const [engineId, startingFrom] = cbor.decode(cborBinary)
        const events = this.fetchHistory(engineId, startingFrom)
        return cbor.encode(events)
    }

    //ToDo: create (extensible?/unified?) format for events. 
    //Browser will know only START/FINISH?
    //later we can add more specific events
    //return only some filtered events to browser app? (depends on topic? only from root level)
    //but the root level subscription returns ALL nested events currently. 
    public fetchHistory(engineId: string, startingFrom: number) : HistoryItem[] {
        const engine = this.engines[engineId];
        return engine?.eventHistory.slice(startingFrom)
    }

    private async _loadDapplet(dappletId: string): Promise<DappletTemplate> {
        for (const provider of this.config.providers || []) {
            try {
                // ToDo: check hashes of dapplet templates and its audit status
                const dapplet = await provider.loadDapplet(dappletId)
                if (dapplet) return dapplet
            } catch (err) { }
        }
        throw Error(`All configured providers don't contain the dapplet ${dappletId}.`)
    }
}