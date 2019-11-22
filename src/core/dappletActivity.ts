import { DappletRequest } from '../types/dappletRequest'
import { DappletContext } from './dappletContext'

// package: wallet
// just an example of the gui class
export class DappletActivity {
    constructor(private _dappletRequest: DappletRequest, private _dappletContext: DappletContext) { }

    async onStart() {
        //this._dappletContext.processRequest(this._dappletRequest)
    }
}