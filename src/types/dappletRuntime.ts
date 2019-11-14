import { ViewTemplate } from './viewTemplate';
import { TxTemplate } from './txTemplate';
import { RegKey } from 'src/core/regKey';
import { View } from 'src/interfaces/view';
import { Type } from './type';
import { TxBuilder } from 'src/interfaces/txBuilder';

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

    compatibleViewClasses: Type<View>[];
    compatibleTxBuilderClasses: Type<TxBuilder>[];
}