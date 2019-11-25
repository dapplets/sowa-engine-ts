import { View, BaseView, Glyph, GlyphType } from "../../../interfaces/view"

export class PlainMustacheView extends BaseView implements View {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/view/plain-mustache/1.0"
    glyphs: Glyph[] = []

    public render() {
    }

    public parse() {
        let { template } = this.viewTemplate
        if (typeof template === "string" && template) {
            const r = /{{\s*([\w\.]+)\s*}}/g
            
            let p0=0
            let evaluateExpr = (expr:string) => this.state.get(expr)
            for (let m:RegExpExecArray|null; m = (r.exec(template))!=null;) {
                let p1 = r.lastIndex - m[0].length
                let text = template.substr(p0,p1-p0)
                this.glyphs.push({type:GlyphType.TEXT, value: text})
                this.glyphs.push({type:GlyphType.EXPR, value: ()=>evaluateExpr(m![1])})
                p0 = r.lastIndex
            }
            this.glyphs.push({type:GlyphType.TEXT, value: template.substr(p0)})
            
        }
        console.log("VIEW UPDATED", template)
    }



}