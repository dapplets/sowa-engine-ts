import { PlainMustacheView } from "../../../src/extensions/views/plain-mustache-view/plainMustacheView"
import { GlyphType } from "../../../src/interfaces/view"

export class PlainMustacheRenderer extends PlainMustacheView {
    public render(): void {
        const glyphs = this.parse()
        let result = ""
        for (const glyph of glyphs) {
            if (glyph.type === GlyphType.TEXT) result += glyph.value
            else if (glyph.type === GlyphType.EXPR) result += glyph.value()[0]
        }
        console.log("PlainMustacheRenderer: " + result);
    }
}