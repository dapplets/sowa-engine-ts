import { View, Glyph } from "../../../interfaces/view"
import { PlainMustacheView } from '../plain-mustache-view/plainMustacheView'

export class GridMustacheView extends PlainMustacheView implements View {
    public readonly GLOBAL_NAME = "http://types.dapplets.org/view/grid-mustache/1.0"

    public render() {
    
    }

    public parse() : Glyph[] {
        return super.parse();
        // check TEXT nodes and insert markup
    }
}