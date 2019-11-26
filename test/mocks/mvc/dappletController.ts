import { DappletModel } from "./dappletModel";
import { DappletView } from "./dappletView";
import { Glyph } from "../../../src/interfaces/view";

export class DappletController {
    constructor(private _model: DappletModel, private _view: DappletView) {
        this._model.bindGlyphsChanged(this.onGlyphsChanged)
        this._view.bindApproveHandler(this.handleApprove)
    }

    onGlyphsChanged = (glyphs: Glyph[][]) => {
        this._view.displayGlyphs(glyphs)
    }

    async handleSendRequest() {
        const TX_META = [
            1162074690288005122,
            "Let us create an open directory for speaker applications for conferences. Organizers can pick bests and community will see the whole offer. \n \nI suppose @EFDevcon was unable to select #devcon5 speakers by value and did it by speakers publicity. \n\nI would see rejected applications",
            "Dmitry Palchun",
            "@Ethernian",
            "https://pbs.twimg.com/profile_images/814615689868836864/cyMqCC1B_bigger.jpg"
        ]
        const DAPPLET_REQUEST = [["5"], ["4", TX_META]]
        await this._model.sendRequest(DAPPLET_REQUEST)
    }

    handleApprove() {
        this._model.approve()
    }
}