import 'mocha';
import { assert } from "chai";
import { resolveAliasMap } from "../../src/core/helpers";

describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('aliases replacement', async () => {
    const input = {
      "@baseUrl": "http://dapplet.org",
      "@baseUrl2": "@baseUrl/first",
      "first": "@baseUrl/first",
      "second": "@baseUrl2/second"
    };

    const expected = new Map<string, string>();
    expected.set("@baseUrl", "http://dapplet.org");
    expected.set("@baseUrl2", "http://dapplet.org/first");
    expected.set("first", "http://dapplet.org/first");
    expected.set("second", "http://dapplet.org/first/second");

    const actual = resolveAliasMap(input);

    assert.deepEqual(actual, expected);
  })
})