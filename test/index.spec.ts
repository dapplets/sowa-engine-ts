import 'mocha';
import { expect } from "chai";
import { DappletContext } from "../src/index";
import { TestDappletProvider } from "./mocks/testDappletProvider";
import { utils } from "ethers";
import * as cbor from "cbor"

describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('send dapplet request', async () => {

    const TX_META = [
      "1162074690288005122",
      "Let us create an open directory for speaker applications for conferences. Organizers can pick bests and community will see the whole offer. \n \nI suppose @EFDevcon was unable to select #devcon5 speakers by value and did it by speakers publicity. \n\nI would see rejected applications",
      "Dmitry Palchun",
      "@Ethernian",
      "https://pbs.twimg.com/profile_images/814615689868836864/cyMqCC1B_bigger.jpg"
    ]

    const DAPPLET_REQUEST = [["5"], ["4", TX_META]]
    const binary = cbor.encode(DAPPLET_REQUEST)

    const dappletContext = new DappletContext({
      providers: [new TestDappletProvider()]
    });
    const result = await dappletContext.processRequest(binary);

    console.log("result", result);

    expect(result).to.be.not.null.not.undefined;
  })
})