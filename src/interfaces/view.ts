import { ViewTemplate } from '../types/viewTemplate'
import { State } from '../core/state'

export type Glyph = {
    type: GlyphType;
    value: any;
}

export enum GlyphType { TEXT, EXPR }

export interface View {
    renderer?: any
    //glyphs: Glyph[]
    //parse(): void
    render(): void
    //onGlyphsChanged(callback: (glyphs: Glyph[]) => void): void
}

export interface ViewConstructor {
    GLOBAL_NAME: string
    new(viewTemplate: ViewTemplate<any>, state: State): View
}

//BaseView incapsulates functionality common for all views
//Maybe use abstract base class instead of intreface?

// export abstract class BaseView implements View {

//     constructor(protected viewTemplate: ViewTemplate<any>, protected state: State) {
//         state.onUpdate(() => this.render())
//     }

//     abstract glyphs: Glyph[];
//     abstract parse():void
//     abstract render(): void
//     abstract onGlyphsChanged(callback: (glyphs: Glyph[]) => void): void
// }