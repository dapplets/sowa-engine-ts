import 'mocha'
import { expect } from "chai"
import * as cbor from "cbor"
import * as rlp from "rlp"
import * as ethers from "ethers"

describe('comparison of [rlp] and [cbor]', () => {

    const data = [new Uint8Array(8), new Uint8Array(8), [[new Uint8Array(8)], [new Uint8Array(8)]]]

    it('rlp ethers', () => {
        const dataAsHex = ["0x0000000000000000", "0x0000000000000000", [["0x0000000000000000"], ["0x0000000000000000"]]]
        const encoded = ethers.utils.RLP.encode(dataAsHex)
        const decoded = ethers.utils.RLP.decode(encoded)
        expect(decoded).deep.eq(dataAsHex)
        console.log("rlp ethers", ethers.utils.arrayify(encoded).length) // 40 bytes
    })

    it('rlp.js', () => {
        const encoded = rlp.encode(data)
        const decoded = rlp.decode(encoded)
        expect(decoded).deep.eq(data)
        console.log("rlp.js", encoded.length) // 40 bytes
    })

    it('cbor', () => {
        const encoded = cbor.encode(data)
        const decoded = cbor.decode(encoded)
        expect(decoded).deep.eq(data)
        console.log("cbor", encoded.length) // 40 bytes
    })
})