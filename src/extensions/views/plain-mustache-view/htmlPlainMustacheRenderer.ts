import { PlainMustacheRenderer } from "./plainMustacheRenderer"
import { GlyphType, Glyph } from "../../../interfaces/view"

export class HtmlPlainMustacheRenderer implements PlainMustacheRenderer {
    public render(glyphs: Glyph[]): void {
        let result = ""
        for (const glyph of glyphs) {
            if (glyph.type === GlyphType.TEXT) result += glyph.value
            else if (glyph.type === GlyphType.EXPR) result += glyph.value()[0]
        }
        console.log("PlainMustacheRenderer: " + result);
    }
}