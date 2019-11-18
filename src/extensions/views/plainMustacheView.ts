import { View } from "../../interfaces/view";
import { ViewTemplate } from "../../types/viewTemplate";
import { State } from '../../core/state';
import { utils } from "ethers";

export class PlainMustacheView implements View {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/view/plain-mustache/1.0"

    constructor(private viewTemplate: ViewTemplate, private state: State) {

    }

    public render() {
        let { template } = this.viewTemplate

        if (typeof template === "string" && template) {
            const mustaches = new Array(...(template.match(/{{\s*[\w\.]+\s*}}/g) || []))
            for (const mustache of mustaches) {
                const variable = (new Array(...mustache.match(/[\w\.]+/)))[0]
                const bin = this.state.get(variable)
                if (!bin) continue

                // ToDo: This code is chain-specific!
                const decodedValue = utils.defaultAbiCoder.decode(["string"], bin)[0]
                template = template.replace(mustache, decodedValue)
            }
        }

        console.log("VIEW UPDATED", template)
    }
}