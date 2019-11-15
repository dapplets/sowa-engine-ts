import { ViewTemplate } from './viewTemplate';
import { TxTemplate } from './txTemplate';
import { View } from '../interfaces/view';
import { Type } from './type';
import { TxBuilder } from '../interfaces/txBuilder';

export type DappletRuntime = {
    // contexts/registries/usings/aliases
    aliases: Map<string, string>;

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