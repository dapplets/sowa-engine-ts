import 'mocha'
import { expect } from "chai"
import * as cbor from "cbor"

import { DappletContext } from "../src/index"
import { TestDappletProvider } from "./mocks/testDappletProvider"
import { DappletEngine } from "../src/core/dappletEngine"
import { EthereumExtension } from '../src/extensions/ethereum'
import { WalletEthSigner } from './mocks/walletEthSigner'
import { DappletView } from './mocks/mvc/dappletView'
import { DappletModel } from './mocks/mvc/dappletModel'
import { DappletController } from './mocks/mvc/dappletController'

describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('send dapplet request', async () => {
    const model = new DappletModel()
    const view = new DappletView()
    const controller = new DappletController(model, view)

    await controller.handleSendRequest()
    controller.handleApprove()
    //expect(result).to.be.not.null.not.undefined
  })
})