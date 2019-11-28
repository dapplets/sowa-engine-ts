import { DappletRequest } from "../types/dappletRequest"
import { DappletEngine } from "./dappletEngine"
import { ContextConfig } from '../types/contextConfig'
import { DEFAULT_CONFIG } from "../defaultConfig"
import { DappletTxResult } from '../interfaces/dappletTxResult'
import { DappletTemplate } from '../types/dappletTemplate'
import { DappletExecutable } from './dappletExecutable'
import * as cbor from "cbor"

// DappletContext (DC) is created in the moment of a wallet starting.
// DC is Singleton class.
// DC loads and verifies DappletTemplates and other resources referenced in Frames. And rejects the Request if any errors.
export class DappletContext {
    public readonly config: ContextConfig

    constructor(config: ContextConfig = DEFAULT_CONFIG) {
        this.config = { ...DEFAULT_CONFIG, ...config }
    }

    async processRequest(cborBinary: Buffer): Promise<DappletEngine> {
        const request: DappletRequest = cbor.decode(cborBinary)
        // dapplet loading and prepare for execution
        const dapplets = await Promise.all(
            request.map((frame, idx) =>
                this._loadDapplet(frame[0]) // dappletId
                    .then(dappletTemplate => new DappletExecutable(
                        dappletTemplate,
                        frame[1] || [],
                        this.config,
                        "F"+idx             //ToDo: how to address frame for subscriptions?
                    ))
            )
        )
        
        const root_topic = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
        const engine = new DappletEngine(dapplets, this, root_topic)
        return engine
    }

    private async _loadDapplet(dappletId: string): Promise<DappletTemplate> {
        for (const provider of this.config.providers || []) {
            try {
                const dapplet = await provider.loadDapplet(dappletId)
                if (dapplet) return dapplet
            } catch (err) { }
        }
        throw Error(`All configured providers don't contain the dapplet ${dappletId}.`)
    }

    async loadResource(id: string): Promise<ArrayBuffer> {
        throw Error("NOT IMPLEMENTED")
    }
}