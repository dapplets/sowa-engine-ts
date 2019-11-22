import { DappletExecutable } from '../core/dappletExecutable'

export type DappletFrameExecutable = {
    dappletId: string
    dapplet: DappletExecutable
    txMeta?: Uint8Array
}