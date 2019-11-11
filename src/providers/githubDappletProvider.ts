import { DappletProvider } from 'src/interfaces/dappletProvider';
import { DappletTemplate } from 'src/types/dappletTemplate';
import fetch from "node-fetch";

export class GithubDappletProvider implements DappletProvider {
    async loadDapplet(id: string): Promise<DappletTemplate> {
        if (!id) throw new Error("Invalid Dapplet ID");
        const response = await fetch("https://dapplets.github.io/dapplet-examples/" + id + ".json");
        const json = await response.json();
        return json;
    }
}