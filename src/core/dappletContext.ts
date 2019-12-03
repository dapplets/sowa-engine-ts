import * as cbor from "cbor"

import { MixedRequest, DappletRequest, EventRequest, RequestType, } from "../types/dappletRequest"
import { DappletEngine, HistoryItem } from "./dappletEngine"
import { ContextConfig } from '../types/contextConfig'
import { DEFAULT_CONFIG } from "../defaultConfig"
import { DappletTemplate } from '../types/dappletTemplate'
import { DappletExecutable } from './dappletExecutable'
import { Renderable } from '../interfaces/renderable'
import { Signable } from '../interfaces/signable'

// DappletContext (DC) is created in the moment of a wallet starting.
// DC is Singleton class.
// DC loads and verifies DappletTemplates and other resources referenced in Frames. And rejects the Request if any errors.

export type ID = string     //Maybe BigInt is more suitable as Id

type DappletRequestLinker = (frames: { views: Renderable[], builders: Signable[] }[], approveCallback: () => void) => void
type EventPostProcessor = (events: any[]) => any[]
type EngineLinker = {
    onDappletRequest?: DappletRequestLinker,
    onEventRequest?: EventPostProcessor,
}

export class DappletContext {
    public readonly config: ContextConfig

    constructor(config: ContextConfig = DEFAULT_CONFIG) {
        // ToDo: may be a deep merging is needed here
        this.config = { ...DEFAULT_CONFIG, ...config }
    }

    engines: { [key: string]: DappletEngine } = {}

    async processRequest(cborBinary: Buffer, configurator: EngineLinker): Promise<Buffer> {
        const [requestType, request]: MixedRequest = cbor.decode(cborBinary)
        let result
        if (requestType == RequestType.DAPPLET) {              //Dapplet Request
            result = this.processDappletRequest(request as DappletRequest, configurator?.onDappletRequest)
        } else if (requestType == RequestType.FETCH_EVENTS) {       //fetch Event Request
            result = this.processEventRequest(request as EventRequest, configurator?.onEventRequest)
        } else {
            result = requestType
        }
        return Promise.resolve(cbor.encode(result))
    }

    async processDappletRequest(request: DappletRequest, linker?: DappletRequestLinker): Promise<any> {
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

        const frames = engine.frameExecutables.map(f => ({
            views: f.views.map(v => ({
                GLOBAL_NAME: Object.getPrototypeOf(v).constructor.GLOBAL_NAME,
                setRenderer: (r: any) => { v.renderer = r }
            })),
            builders: Object.getOwnPropertyNames(f.transactions).map(tx => ({
                GLOBAL_NAME: Object.getPrototypeOf(f.transactions[tx]).constructor.GLOBAL_NAME,
                setSigner: (s: any) => { f.transactions[tx].signer = s }
            }))
        }))

        linker?.(frames, () => engine.approve())

        this.engines[engineId] = engine
    }

    //ToDo: clear distinguish between GUIDs and IDs

    //ToDo: there are three kinds of IDs: 
    // 1) by anyone randomly generated GUIDs (long)
    // 2) centrally created sequencial IDs (short)
    // we short ids are better, but which one we'll use where?
    public newId(): ID {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
    }

    processEventRequest(request: EventRequest, linker?: EventPostProcessor): HistoryItem[] {
        const [engineId, startingFrom] = request
        const events = this.fetchHistory(engineId, startingFrom)
        return linker?.(events) ?? []
    }

    //ToDo: create (extensible?/unified?) format for events. 
    //Browser will know only START/FINISH?
    //later we can add more specific events
    //return only some filtered events to browser app? (depends on topic? only from root level)
    //but the root level subscription returns ALL nested events currently. 
    public fetchHistory(engineId: string, startingFrom: number): HistoryItem[] {
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