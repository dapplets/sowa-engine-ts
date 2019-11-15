import 'mocha';
import { expect } from "chai";
import { DappletContext } from "../src/index";
import { TestDappletProvider } from "./mocks/testDappletProvider";
import { utils } from "ethers";

describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('send dapplet request', async () => {

    const jsonTxMeta = {
      "id:string": "1162074690288005122",
      "text:string": "Let us create an open directory for speaker applications for conferences. Organizers can pick bests and community will see the whole offer. \n \nI suppose @EFDevcon was unable to select #devcon5 speakers by value and did it by speakers publicity. \n\nI would see rejected applications",
      "authorFullname:string": "Dmitry Palchun",
      "authorUsername:string": "@Ethernian",
      "authorImg:string": "https://pbs.twimg.com/profile_images/814615689868836864/cyMqCC1B_bigger.jpg"
    };
    
    const types = Object.keys(jsonTxMeta).map(k => k.substr(k.indexOf(":") + 1));
    const values = Object.values(jsonTxMeta);
    const hexTxMeta = utils.defaultAbiCoder.encode(types, values);
    const binaryTxMeta = utils.arrayify(hexTxMeta);

    const DAPPLET_REQUEST = {
      frames: [{
        dappletId: "5"
      }, {
        dappletId: "4",
        txMeta: binaryTxMeta
      }]
    }

    const dappletContext = new DappletContext({
      providers: [new TestDappletProvider()]
    });
    const result = await dappletContext.processRequest(DAPPLET_REQUEST);

    console.log("result", result);

    expect(result).to.be.not.null.not.undefined;
  })
})