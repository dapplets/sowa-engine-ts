import 'mocha';
import { assert } from "chai";
import { resolveAliasMap } from "../../src/core/helpers";
import { RegKey } from '../../src/core/regKey';

describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('regkey transformation', async () => {
    const input = {
      "@baseUrl": "http://dapplet.org",
      "@shortName2": "@baseUrl/first",
      "first": "@baseUrl/first",
      "second": "@shortName2/second"
    };

    const expected = new Map<string, RegKey>();
    expected.set("first", new RegKey(["http://dapplet.org/first"]));
    expected.set("second", new RegKey(["http://dapplet.org/first/second"]));

    const actual = resolveAliasMap(input);

    assert.deepEqual(actual, expected);
  })
})