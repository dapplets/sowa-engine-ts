import { ViewTemplate } from './viewTemplate';
import { TxTemplate } from './txTemplate';
import { RegKey } from 'src/core/regKey';

export type DappletRuntime = {
    // contexts/registries/usings/aliases
    aliases: Map<string, RegKey>;

    // // rel 2.0?
    // variables: {
    //     //DiP-02.1: "name" is better than "key"?
    //     [key: string]: string;
    // };

    views: ViewTemplate[];

    transactions: {
        [key: string]: TxTemplate
    };
}