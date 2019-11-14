import { DappletTemplate } from './dappletTemplate';

export type LoadedDappletFrame = {
    dappletId: string;
    dapplet: DappletTemplate;
    txMeta: any;
}