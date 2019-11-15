import { DappletTemplate } from './dappletTemplate';

export type DappletFrame = {
    dappletId: string;
    dapplet?: DappletTemplate;
    txMeta?: Uint8Array;
}