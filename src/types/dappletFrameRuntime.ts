import { DappletRuntime } from './dappletRuntime';

export type DappletFrameRuntime = {
    dappletId: string;
    dapplet: DappletRuntime;
    txMeta?: Uint8Array;
}