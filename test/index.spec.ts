import 'mocha'
import { expect } from "chai"
import * as cbor from "cbor"

import { DappletContext } from "../src/index"
import { TestDappletProvider } from "./mocks/testDappletProvider"
import { EthereumExtension } from '../src/extensions/ethereum'
import { WalletEthSigner } from './mocks/walletEthSigner'
import { HtmlGridMustacheRenderer } from '../src/extensions/views/grid-mustasche-view/htmlGridMustacheRenderer'
import { HtmlPlainMustacheRenderer } from '../src/extensions/views/plain-mustache-view/htmlPlainMustacheRenderer'
import { GridMustacheView } from '../src/extensions/views/grid-mustasche-view/gridMustacheView'
import { PlainMustacheView } from '../src/extensions/views/plain-mustache-view/plainMustacheView'

describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('send dapplet request', async () => {
    const context = new DappletContext({
      providers: [new TestDappletProvider()],
      extensions: [new EthereumExtension(new WalletEthSigner())],
      views: [
        GridMustacheView.attachRenderer(new HtmlGridMustacheRenderer()),
        PlainMustacheView.attachRenderer(new HtmlPlainMustacheRenderer())
      ]
    })

    const TX_META = [
      1162074690288005122,
      "Let us create an open directory for speaker applications for conferences. Organizers can pick bests and community will see the whole offer. \n \nI suppose @EFDevcon was unable to select #devcon5 speakers by value and did it by speakers publicity. \n\nI would see rejected applications",
      "Dmitry Palchun",
      "@Ethernian",
      "https://pbs.twimg.com/profile_images/814615689868836864/cyMqCC1B_bigger.jpg"
    ]
    const DAPPLET_REQUEST = [["5"], ["4", TX_META]]

    const bin = cbor.encode(DAPPLET_REQUEST)
    await context.processRequest(bin)

    //expect(result).to.be.not.null.not.undefined
  })
})