import { View } from "../../interfaces/view";
import { ViewTemplate } from "../../types/viewTemplate";
import { State } from '../../core/state';

export class PlainMustacheView implements View {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/view/plain-mustache/1.0";
    
    constructor(viewTemplate: ViewTemplate, state: State) {

    }
}