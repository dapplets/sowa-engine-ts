import { View } from "../../../interfaces/view"
import { ViewTemplate } from 'src/types/viewTemplate'
import { State } from 'src/core/state'
import { GridMustacheRenderer } from './gridMustacheRenderer'

export type GridMustacheTemplate = (string | GridMustacheTemplate)[]

export class GridMustacheView implements View {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/view/grid-mustache/1.0"

    protected renderer?: GridMustacheRenderer

    constructor(protected viewTemplate: ViewTemplate<GridMustacheTemplate>, protected state: State) { }

    private _parseRow(template: GridMustacheTemplate): GridMustacheTemplate {
        for (let i = 0; i < template.length; i++) {
            const cell = template[i]
            if (typeof cell === "string") {
                template[i] = this._replaceMustache(cell)
            } else {
                template[i] = this._parseRow(cell)
            }
        }

        return template
    }

    private _replaceMustache(template: string): string {
        const r = /{{\s*([\w\.]+)\s*}}/g
        let m: RegExpExecArray | null
        while ((m = r.exec(template)) !== null) {
            const value = this.state.get(m[1])
            // ToDo: check types
            if (value && value[0] && typeof value[0] === "string") {
                template = template.replace(m[0], value[0])
            }            
        }
        return template
    }

    public render(): void {
        const replacedTemplate = this._parseRow(this.viewTemplate.template)
        this.renderer?.render(replacedTemplate)
    }

    public static attachRenderer(renderer: GridMustacheRenderer) {
        GridMustacheView.prototype.renderer = renderer
        return GridMustacheView
    }
}