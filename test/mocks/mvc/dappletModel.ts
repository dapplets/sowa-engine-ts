import { DappletContext } from "../../../src/index"
import { TestDappletProvider } from "../testDappletProvider"
import { DappletEngine } from "../../../src/core/dappletEngine"
import { EthereumExtension } from '../../../src/extensions/ethereum'
import { WalletEthSigner } from '../walletEthSigner'
import { HtmlGridMustacheRenderer } from '../../../src/extensions/views/grid-mustasche-view/htmlGridMustacheRenderer'
import { HtmlPlainMustacheRenderer } from '../../../src/extensions/views/plain-mustache-view/htmlPlainMustacheRenderer'
import { GridMustacheView } from '../../../src/extensions/views/grid-mustasche-view/gridMustacheView'
import { PlainMustacheView } from '../../../src/extensions/views/plain-mustache-view/plainMustacheView'

import * as cbor from "cbor"
import { Glyph } from "../../../src/interfaces/view"

export class DappletModel {
    private _dappletContext: DappletContext
    private _engine?: DappletEngine

    constructor() {
        this._dappletContext = new DappletContext({
            providers: [new TestDappletProvider()],
            extensions: [new EthereumExtension(new WalletEthSigner())],
            views: [
                GridMustacheView.attachRenderer(new HtmlGridMustacheRenderer()),
                PlainMustacheView.attachRenderer(new HtmlPlainMustacheRenderer())
            ]
        })
    }

    async sendRequest(frames: any) {
        const bin = cbor.encode(frames)
        this._engine = await this._dappletContext.processRequest(bin)
    }

    async approve() {
        //await this._engine?.approve()
    }

    bindGlyphsChanged(callback: (glyphs: Glyph[][]) => void) {
        //this._onGlyphsChanged = callback
    }
}