import { Glyph } from 'src/interfaces/view';

export interface PlainMustacheRenderer {
    render(glyphs: Glyph[]): void
}