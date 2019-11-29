import { GridMustacheTemplate } from './gridMustacheView';

export interface GridMustacheRenderer {
    render(template: GridMustacheTemplate): void
}