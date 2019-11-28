import { View } from "../../../interfaces/view"
import { ViewTemplate } from 'src/types/viewTemplate'
import { State } from 'src/core/state'

export type GridMustacheTemplate = (string | GridMustacheTemplate)[]

export abstract class GridMustacheView implements View {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/view/grid-mustache/1.0"

    constructor(protected viewTemplate: ViewTemplate<GridMustacheTemplate>, protected state: State) { }

    public abstract render(): void
}