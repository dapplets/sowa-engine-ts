import { ViewTemplate } from '../types/viewTemplate'
import { State } from '../core/state'

export type Glyph{
    type: GlyphType;
    value:any;
}

export enum GlyphType {TEXT, EXPR}

export interface View {
    glyphs: Glyph[];
    parse(): void
    render(): void
}

export interface ViewConstructor {
    GLOBAL_NAME: string
    new(viewTemplate: ViewTemplate, state: State): View
}

//BaseView incapsulates functionality common for all views
//Maybe use abstract base class instead of intreface?

export abstract class BaseView implements View {

    constructor(protected viewTemplate: ViewTemplate, protected state: State) {
        state.onUpdate(() => this.render())
    }
    
    abstract glyphs: Glyph[];
    abstract parse():void
    abstract render(): void
}