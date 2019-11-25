import { View, BaseView, Glyph, GlyphType } from "../../../interfaces/view"
import { ViewTemplate } from 'src/types/viewTemplate'
import { State } from 'src/core/state'

export class PlainMustacheView implements View { //  extends BaseView
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/view/plain-mustache/1.0"
    public glyphs: Glyph[] = []
    private _onGlyphsChanged?: (glyphs: Glyph[]) => void

    constructor(protected viewTemplate: ViewTemplate, protected state: State) {
        this.glyphs = this.parse()
        this.state.onUpdate(() => this._onGlyphsChanged && this._onGlyphsChanged(this.parse()))
    }

    public parse(): Glyph[] {
        let glyphs: Glyph[] = []
        let { template } = this.viewTemplate
        if (typeof template === "string" && template) {
            const r = /{{\s*([\w\.]+)\s*}}/g

            let p0 = 0
            let evaluateExpr = (expr: string) => this.state.get(expr)
            let m: RegExpExecArray | null;
            while ((m = r.exec(template)) != null) {
                let p1 = r.lastIndex - m[0].length
                let text = template.substr(p0, p1 - p0)
                glyphs.push({ type: GlyphType.TEXT, value: text })
                glyphs.push({ type: GlyphType.EXPR, value: () => evaluateExpr(m![1]) })
                p0 = r.lastIndex
            }
            glyphs.push({ type: GlyphType.TEXT, value: template.substr(p0) })

        }
        return glyphs
    }

    onGlyphsChanged(callback: (glyphs: Glyph[]) => void) {
        this._onGlyphsChanged = callback
    }
}