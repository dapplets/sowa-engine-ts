// package: wallet
// just an example of the gui class
export class DappletActivity {
    constructor(private dappletRequest: DappletRequest, private dappletContext: DappletContext) { }

    async onStart() {
        this.engineContext.processRequest(this.dappletRequest);
    }
}