import { View, Glyph, GlyphType } from "../../../interfaces/view"
import { ViewTemplate } from '../../../types/viewTemplate'
import { State } from '../../../core/state'
import { PlainMustacheRenderer } from './plainMustacheRenderer'

type PlaintMustacheTemplate = string

export class PlainMustacheView implements View { //  extends BaseView
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/view/plain-mustache/1.0"

    protected renderer?: PlainMustacheRenderer

    constructor(protected viewTemplate: ViewTemplate<PlaintMustacheTemplate>, protected state: State) { }

    public parse(): Glyph[] {
        let glyphs: Glyph[] = []
        let { template } = this.viewTemplate
        if (typeof template === "string" && template) {
            const r = /{{\s*([\w\.]+)\s*}}/g

            let p0 = 0
            let evaluateExpr = (expr: string) => this.state.get(expr)
            let m: RegExpExecArray | null
            while ((m = r.exec(template)) !== null) {
                let p1 = r.lastIndex - m[0].length
                let text = template.substr(p0, p1 - p0)
                glyphs.push({ type: GlyphType.TEXT, value: text })
                const expr = m![1]
                glyphs.push({ type: GlyphType.EXPR, value: () => evaluateExpr(expr) })
                p0 = r.lastIndex
            }
            glyphs.push({ type: GlyphType.TEXT, value: template.substr(p0) })

        }
        return glyphs
    }

    public render(): void {
        this.renderer?.render(this.parse())
    }

    public static attachRenderer(renderer: PlainMustacheRenderer) {
        PlainMustacheView.prototype.renderer = renderer
        return PlainMustacheView
    }
}