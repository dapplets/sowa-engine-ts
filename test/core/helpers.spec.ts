import 'mocha'
import { assert } from "chai"
import { DappletExecutable } from "../../src/core/dappletExecutable"
import { DappletTemplate } from '../../src/types/dappletTemplate'
import { DEFAULT_CONFIG } from '../../src/defaultConfig'
import { TestDappletProvider } from '../mocks/testDappletProvider'

describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('aliases replacement', async () => {
    const provider = new TestDappletProvider()
    const input: DappletTemplate = await provider.loadDapplet("7")

    const de = new DappletExecutable(input, [], DEFAULT_CONFIG)

    const expected = new Map<string, string>()
    expected.set("@baseUrl", "http://dapplet.org")
    expected.set("@baseUrl2", "http://dapplet.org/first")
    expected.set("first", "http://dapplet.org/first")
    expected.set("second", "http://dapplet.org/first/second")

    assert.deepEqual(de.aliases, expected)
  })
})