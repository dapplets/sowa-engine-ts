import { ViewTemplate } from '../types/viewTemplate';
import { State } from '../core/state';

export interface View {
    render(): void
}

export interface ViewConstructor {
    GLOBAL_NAME: string;
    new (viewTemplate: ViewTemplate, state: State): View;
}