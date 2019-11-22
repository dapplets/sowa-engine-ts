import { TxTemplate } from './txTemplate'
import { ViewTemplate } from './viewTemplate'

export type DappletTemplate = {
    // contexts/registries/usings/aliases
    aliases: {
        [key: string]: string
    }

    // // rel 2.0?
    variables?: {
        //DiP-02.1: "name" is better than "key"?
        [key: string]: string
    }

    views: ViewTemplate[]

    transactions: {
        [key: string]: TxTemplate
    }
}