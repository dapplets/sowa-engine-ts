import { Feature } from './feature';

export interface Formatter extends Feature { // ToDo: придумать другое имя
    exec(input: any): any;
}