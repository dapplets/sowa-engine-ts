import { DappletContext } from "../../../src/index"
import { TestDappletProvider } from "../testDappletProvider"
import { DappletEngine } from "../../../src/core/dappletEngine"
import { EthereumExtension } from '../../../src/extensions/ethereum'
import { WalletEthSigner } from '../walletEthSigner'

import * as cbor from "cbor"
import { Glyph } from "../../../src/interfaces/view"

export class DappletModel {
    private _dappletContext: DappletContext
    private _engine?: DappletEngine
    private _onGlyphsChanged?: (glyphs: Glyph[][]) => void

    constructor() {
        this._dappletContext = new DappletContext({
            providers: [new TestDappletProvider()],
            extensions: [new EthereumExtension(new WalletEthSigner())]
        })
    }

    async sendRequest(frames: any) {
        const bin = cbor.encode(frames)
        this._engine = await this._dappletContext.processRequest(bin)
        this._onGlyphsChanged && this._onGlyphsChanged(this._engine.frameExecutables.map(f => f.activeView.glyphs))
        this._engine.frameExecutables.forEach(f => {
            f.activeView.onGlyphsChanged(g => {
                if (!this._onGlyphsChanged) return
                const glyphs = this._engine?.frameExecutables.map(f => f.activeView.glyphs)
                glyphs && this._onGlyphsChanged(glyphs)
            })
        })
    }

    async approve() {
        await this._engine?.approve()
    }

    bindGlyphsChanged(callback: (glyphs: Glyph[][]) => void) {
        this._onGlyphsChanged = callback
    }
}