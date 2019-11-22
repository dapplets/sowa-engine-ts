import { ViewTemplate } from '../types/viewTemplate';
import { State } from '../core/state';

export interface View {
    render(): void
}

export interface ViewConstructor {
    GLOBAL_NAME: string;
    new(viewTemplate: ViewTemplate, state: State): View;
}

//BaseView incapsulates functionality common for all views
//Maybe use abstract base class instead of intreface?

export abstract class BaseView implements View {

    constructor(protected viewTemplate: ViewTemplate, protected state: State) {
        state.onUpdate(() => this.render())
    }

    abstract render(): void
}