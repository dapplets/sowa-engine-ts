import { View, ViewConstructor } from "../../interfaces/view";
import { ViewTemplate } from "../../types/viewTemplate";
import { State } from '../../core/state';

export class PlainMustacheView implements View {
    public static readonly REG_KEY = ["http://types.dapplets.org/view/plain-mustache/1.0"];

}