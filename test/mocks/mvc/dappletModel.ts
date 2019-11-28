import { DappletContext } from "../../../src/index"
import { TestDappletProvider } from "../testDappletProvider"
import { DappletEngine } from "../../../src/core/dappletEngine"
import { EthereumExtension } from '../../../src/extensions/ethereum'
import { WalletEthSigner } from '../walletEthSigner'
import { GridMustacheRenderer } from '../views/gridMustacheRenderer'
import { PlainMustacheRenderer } from '../views/plainMustacheRenderer'

import * as cbor from "cbor"
import { Glyph } from "../../../src/interfaces/view"

export class DappletModel {
    private _dappletContext: DappletContext
    private _engine?: DappletEngine

    constructor() {
        this._dappletContext = new DappletContext({
            providers: [new TestDappletProvider()],
            extensions: [new EthereumExtension(new WalletEthSigner())],
            views: [GridMustacheRenderer, PlainMustacheRenderer]
        })
    }

    async sendRequest(frames: any) {
        const bin = cbor.encode(frames)
        this._engine = await this._dappletContext.processRequest(bin)
    }

    async approve() {
        await this._engine?.approve()
    }

    bindGlyphsChanged(callback: (glyphs: Glyph[][]) => void) {
        //this._onGlyphsChanged = callback
    }
}