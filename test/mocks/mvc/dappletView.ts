import { View, Glyph, GlyphType } from "../../../src/interfaces/view"

export class DappletView {
    constructor() { 
        // createElement('div')
        // ...
    }

    public displayGlyphs(glyphs: Glyph[][]) {
        let i = 0
        for (const frameGlyphs of glyphs) {
            let frame = ""
            for (const glyph of frameGlyphs) {
                if (glyph.type === GlyphType.TEXT) frame += glyph.value
                else if (glyph.type === GlyphType.EXPR) frame += glyph.value()
            }
            console.log(`FRAME #${i++}`, frame)
            // update html
        }
    }

    bindApproveHandler(handler: Function) {
        // button.addEventListener('click', handler)
    }
}