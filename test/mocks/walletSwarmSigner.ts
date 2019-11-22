import { SwarmSigner } from "../../src/extensions/swarm/swarmSigner"

export class WalletSwarmSigner implements SwarmSigner {
    public save(data: any): string {
        throw Error("Not implemented.")
    }
}