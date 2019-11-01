import 'mocha';
import { expect } from "chai";

import { DappletContext } from "../src/index";


describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('needs tests', async () => {

    const dappletContext = new DappletContext();

    const dappletRequest = {
      frames: [
        {
          dappletId: "1",
          txMeta: {
            "id": "1162074690288005122",
            "text": "Let us create an open directory for speaker applications for conferences. Organizers can pick bests and community will see the whole offer. \n \nI suppose @EFDevcon was unable to select #devcon5 speakers by value and did it by speakers publicity. \n\nI would see rejected applications",
            "authorFullname": "Dmitry Palchun",
            "authorUsername": "@Ethernian",
            "authorImg": "https://pbs.twimg.com/profile_images/814615689868836864/cyMqCC1B_bigger.jpg"
          }
        }, {
          dappletId: "2"
        }
      ]
    }

    const result = await dappletContext.processRequest(dappletRequest);

    expect(result).to.be.not.null;

  })
})