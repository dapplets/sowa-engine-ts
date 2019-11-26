import 'mocha'
import { expect, } from "chai"
import { BigNumber } from 'bignumber.js'
import { SolidityTypeConverter } from "../../../src/extensions/ethereum/solidityTypeConverter"
import { InternalTypes, TypedValue } from '../../../src/types/internalTypes'

describe('ethereum solidity type converter', () => {
    it('should convert internal types to external', async () => {
        const converter = new SolidityTypeConverter()

        type TestData = { int: TypedValue, ext: { value: any, type: string } }
        const data: TestData[] = [
            { int: [true, InternalTypes.Boolean], ext: { value: true, type: 'bool' } },
            { int: ["hello", InternalTypes.String], ext: { value: "hello", type: 'string' } },
            { int: [new BigNumber("0xdeadbeef"), InternalTypes.Integer], ext: { value: "deadbeef", type: 'int' } },
            { int: [new BigNumber("0xae0b8354fadc920014d089c715816af080aa62e3aa8459090d0c2da9a3309534"), InternalTypes.Integer], ext: { value: "ae0b8354fadc920014d089c715816af080aa62e3aa8459090d0c2da9a3309534", type: 'uint256' } },
            { int: [new BigNumber("0xae0b8354fadc920014d089c715816af080aa62e3aa8459090d0c2da9a3309534"), InternalTypes.Integer], ext: { value: "ae0b8354fadc920014d089c715816af080aa62e3aa8459090d0c2da9a3309534", type: 'uint' } },
            { int: [new BigNumber("0x0641db6d8aaf28763981e093f8d061286f1a4728"), InternalTypes.Integer], ext: { value: "641db6d8aaf28763981e093f8d061286f1a4728", type: 'address' } },
            { int: [new BigNumber("0x0641db6d8aaf28763981e093f8d061286f1a4728"), InternalTypes.Integer], ext: { value: "641db6d8aaf28763981e093f8d061286f1a4728", type: 'uint160' } },
            { int: [new BigNumber("0x4fcd464f209b42ebda2cb110f2b69b8f0e1862b80aa328615bd290ffc6e0d25e"), InternalTypes.Integer], ext: { value: "4fcd464f209b42ebda2cb110f2b69b8f0e1862b80aa328615bd290ffc6e0d25e", type: 'uint256' } },
            { int: [[0, 15, 255], InternalTypes.Bytes], ext: { value: "000fff", type: 'uint256' } }
        ]

        for (const d of data) {
            expect(converter.int2ext(d.int, d.ext.type)).eq(d.ext.value)
            expect(converter.ext2int(d.ext.value, d.ext.type)).members(d.int)
        }
    })
})