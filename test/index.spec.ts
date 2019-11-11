import 'mocha';
import { expect } from "chai";

import { DappletContext } from "../src/index";

import { TestDappletProvider } from "./mocks/testDappletProvider";


describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('needs tests', async () => {
    const DAPPLET_REQUEST = {
      frames: [
        {
          dappletId: "4",
          txMeta: {
            "id": "1162074690288005122",
            "text": "Let us create an open directory for speaker applications for conferences. Organizers can pick bests and community will see the whole offer. \n \nI suppose @EFDevcon was unable to select #devcon5 speakers by value and did it by speakers publicity. \n\nI would see rejected applications",
            "authorFullname": "Dmitry Palchun",
            "authorUsername": "@Ethernian",
            "authorImg": "https://pbs.twimg.com/profile_images/814615689868836864/cyMqCC1B_bigger.jpg"
          }
        }
      ]
    }

    const DAPPLET_TEMPLATE = {
      aliases: {
        "view-plain-mustache": ["http://types.dapplets.org/view/plain-mustache/1.0"],
        "view-html-mustache": ["http://types.dapplets.org/view/html-mustache/1.0"],
        "builder-tx-sol": ["http://types.dapplets.org/ethereum/txbuilders/solidity/1.0"]
      },

      views: [
        {
          type: "view-html-mustache",
          template: "<div style=\"margin-bottom: 16px;\"><img style=\"float:left;height:48px;margin-right:8px;\" src=\"{{authorImg}}\"\/><div><b>{{authorFullname}}<\/b><\/div><div style=\"font-size:smaller;color:#777;\">{{authorUsername}}<\/div><\/div><div style=\"clear:both;\">{{text}}<\/div><div style=\"font-size:10px;color:#777;margin-top:10px;\">ID {{id}}<\/div>"
        },
        {
          type: "view-plain-mustache",
          template: "Add the tweet #{{id}} \"{{text}}\" from user @{{authorUsername}} to the registry."
        }
      ],

      transactions: {
        "addTweetToRegistry": {
          type: "builder-tx-sol",
          from: "&Addresses[0]",
          to: "0xccf7930d9b1fa67d101e3de18de5416dc66bd852",
          function: "storeTweetHash(uint256,uint256)",
          args: ["id:bigNumberify", "text:toUtf8Bytes:sha256"]
        }
      }
    }

    const provider = new TestDappletProvider();
    provider.add("4", DAPPLET_TEMPLATE);
    const dappletContext = new DappletContext({ provider });
    const result = await dappletContext.processRequest(DAPPLET_REQUEST);

    console.log("result", result);

    expect(result).to.be.not.null.not.undefined;
  })
})