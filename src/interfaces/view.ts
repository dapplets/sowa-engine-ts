import { ViewTemplate } from 'src/types/viewTemplate';
import { State } from 'src/core/state';

export interface View {
}

export interface ViewConstructor {
    GLOBAL_NAME: string;
    new (viewTemplate: ViewTemplate, state: State): View;
}