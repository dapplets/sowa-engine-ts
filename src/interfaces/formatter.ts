import { Specifiable } from './specifiable';

export interface Formatter extends Specifiable { // ToDo: придумать другое имя
    exec(input: any): any;
}