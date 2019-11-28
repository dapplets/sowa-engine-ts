import { View } from "../../../interfaces/view"
import { ViewTemplate } from 'src/types/viewTemplate'
import { State } from 'src/core/state'
import { GridMustacheRenderer } from './gridMustacheRenderer'

export type GridMustacheTemplate = (string | GridMustacheTemplate)[]

export class GridMustacheView implements View {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/view/grid-mustache/1.0"
    
    protected renderer?: GridMustacheRenderer

    constructor(protected viewTemplate: ViewTemplate<GridMustacheTemplate>, protected state: State) { }

    public render(): void {
        this.renderer?.render(this.viewTemplate.template)
    }

    public static attachRenderer(renderer: GridMustacheRenderer) {
        GridMustacheView.prototype.renderer = renderer
        return GridMustacheView
    }
}