import { PlainMustacheRenderer } from "../../../src/extensions/views/plain-mustache-view/plainMustacheRenderer"
import { GlyphType, Glyph } from "../../../src/interfaces/view"

export class WalletPlainMustacheRenderer implements PlainMustacheRenderer {
    public render(glyphs: Glyph[]): void {
        let result = ""
        for (const glyph of glyphs) {
            if (glyph.type === GlyphType.TEXT) result += glyph.value
            else if (glyph.type === GlyphType.EXPR) result += glyph.value()[0]
        }
        console.log("PlainMustacheRenderer: " + result);
    }
}