import { View } from "../../interfaces/view";
import { ViewTemplate } from "../../types/viewTemplate";
import { State } from 'src/core/state';

export class PlainMustacheView implements View {
    public static readonly REG_KEYS = ["http://types.dapplets.org/view/plain-mustache/1.0"];

    constructor(public readonly viewTemplate: ViewTemplate, public state: State) { }
}