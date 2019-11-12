import { DappletProvider } from '../interfaces/dappletProvider';
import { DappletTemplate } from '../types/dappletTemplate';
import fetch from "node-fetch";

export class SwarmDappletProvider implements DappletProvider {
    async loadDapplet(id: string): Promise<DappletTemplate> {
        if (!id) throw new Error("Invalid Dapplet ID");
        const response = await fetch("https://swarm-gateways.net/" + id);
        const json = await response.json();
        return json;
    }
}