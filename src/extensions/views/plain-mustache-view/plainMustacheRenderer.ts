import { Glyph } from '../../../interfaces/view';

export interface PlainMustacheRenderer {
    render(glyphs: Glyph[]): void
}