import { View, BaseView } from "../../../interfaces/view"

export class PlainMustacheView extends BaseView implements View {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/view/plain-mustache/1.0"

    public render() {
        let { template } = this.viewTemplate

        if (typeof template === "string" && template) {
            const mustaches = new Array(...(template.match(/{{\s*[\w\.]+\s*}}/g) || []))
            for (const mustache of mustaches) {
                const variable = (new Array(...mustache.match(/[\w\.]+/)))[0]
                const [value, type] = this.state.get(variable)
                if (!value) continue
                //ToDo: 'value.toString()' - is a nasty hack! will be fixed. 
                template = template.replace(mustache, value.toString())
            }
        }

        console.log("VIEW UPDATED", template)
    }
}