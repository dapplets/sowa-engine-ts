import { ViewTemplate } from 'src/types/viewTemplate';
import { State } from 'src/core/state';

export interface View {
    //new (viewTemplate: ViewTemplate, state: State): View;
}

export interface ViewConstructor {
    new (viewTemplate: ViewTemplate, state: State): View;
}