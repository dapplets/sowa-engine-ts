import { DappletTemplate } from "../types/dappletTemplate";

export interface DappletProvider {
    loadDapplet(id: string): Promise<DappletTemplate>; // async
}