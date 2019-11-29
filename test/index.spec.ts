import 'mocha'
import { expect } from "chai"
import * as cbor from "cbor"

import { TestDappletProvider } from "./mocks/testDappletProvider"
import { WalletEthSigner } from './mocks/walletEthSigner'
import { DappletContext, extensions } from '../src'
import { HtmlGridMustacheRenderer } from '../src/extensions/views/grid-mustache-view'

describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('send dapplet request', async () => {
    const context = new DappletContext({
      providers: [new TestDappletProvider()],
      extensions: [new extensions.EthereumExtension(new WalletEthSigner())],
      views: [
        // ToDo: 1 Too long namespaces' length
        // ToDo: 2 Perhaps, renderers should be moved from the singleton context config, because they depend on instances of views. 
        //       We can not determine where the parsed template came from inside the singleton renderer.
        extensions.views.gridMustache.GridMustacheView.attachRenderer(new extensions.views.gridMustache.HtmlGridMustacheRenderer()),
        extensions.views.plainMustache.PlainMustacheView.attachRenderer(new extensions.views.plainMustache.HtmlPlainMustacheRenderer())
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

    // ToDo: 3 (solution for todo2) May be `processRequest()` should not return simple cbor response for browser.
    // ToDo: 4 (solution for todo2) split `processRequest` into two methods
    // ToDo: 5 (solution for todo2) create `Renderable` interface

    //expect(result).to.be.not.null.not.undefined
  })
})


class WalletRenderer {
  
}

class DappletComponent extends React.Component {

  state: {
    // html+css of frames
    views: []
  }

  didMount() {
    

    // we are in wallet context here
    // callback will be called when engine create view instances 
    processRequest(...., function configure(views: View[]){
      for(let v of views) v.attachRenderer(new WalletRenderer())

    })

    processRequest(cbor)
      .onDappletRequest((views: View[], txBuilders: TxBuilder[]) => {
        // Instead of View and TxBuilder we should use more simple interface (only one method `attach()` ?)
        // for(let v of views) { 
        //   v.globalID === ""
        //   v.attachRenderer(new WalletRenderer())
        // }

        this.setState({
          views: views
        })

        // attach singers for txBuilders
      }).onStateFetchRequest((engineId,startingFrom)=>events[]) : cborBytesArray
  
  }

  render() {
    return (<div>{this.state.views.map(v => this.createFrameComponent(v))}</div>)
  }

  createFrameComponent(v: View) {
    // compare global id
    return <PlainMustacheComponent v={v}/>
  }
}

class PlainMustacheComponent {
  view: View;

  state: {

  }

  didMount() {
    view.onChanged(() => {
      // change state of react component
    }) 
  }

  render() {
    // here is html
  }
}