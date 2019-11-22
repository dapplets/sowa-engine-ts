export interface Signer { // ToDo: Think about how to rename it
    signAndSend(payload: any): Promise<void>
    GLOBAL_NAME: string
}

export class Signers {
    constructor(private signers: Signer[]) { }

    get(name: string): Signer | undefined {
        return this.signers.find(s => s.GLOBAL_NAME == name)
    }
}