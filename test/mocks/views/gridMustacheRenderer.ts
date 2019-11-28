import { GridMustacheView, GridMustacheTemplate } from "../../../src/extensions/views/grid-mustasche-view/gridMustacheView"

type HtmlCssParser = {
    css: string
    html: string
    classes: string[]
    my: string
}

export class GridMustacheRenderer extends GridMustacheView {
    private _parse(template: GridMustacheTemplate, isRow?: boolean, prefix?: string) {
        if (!prefix) prefix = "cell"
        const result: HtmlCssParser = {
            css: "",
            html: "",
            classes: [],
            my: prefix
        }

        if (!Array.isArray(template)) return result

        for (let i = 0; i < template.length; i++) {
            const row = template[i]
            const r = prefix + i
            if (Array.isArray(row)) {
                var subresult = this._parse(row, !isRow, r)
                result.css += subresult.css
                result.html += subresult.html
                result.classes.push(subresult.my)
            } else {
                if (row.split("").map(v => v === "<").reduce((a, v) => a && v)) {
                    for (let j = 0; j < row.length; j++) {
                        result.classes.push(result.classes[result.classes.length - 1])
                    }
                    continue
                }
                result.classes.push(r)
                result.css += `.${r} { grid-area: ${r}; }\r\n`
                result.html += `<div class="${r}">${row}</div>\r\n`
            }
        }

        result.html = `<div class="${result.my}">${result.html}</div>`
        var areas = !!isRow ? `"${result.classes.join(" ")}"` : result.classes.map(c => '"' + c + '"').join(" ")
        result.css = `.${result.my} { 
          display: grid; 
          grid-area: ${result.my}; 
          grid-template-areas: ${areas};
          grid-auto-columns: 1fr;
        }\r\n` + result.css

        return result
    }

    public render(): void {
        const result = this._parse(this.viewTemplate.template)
        console.log("GridMustacheRenderer", result)
    }
}