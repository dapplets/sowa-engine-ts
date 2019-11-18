export interface Formatter { // ToDo: Think about how to rename it
    exec(input: any): any;
}

export interface FormatterConstructor {
    GLOBAL_NAME: string;
    TARGET_VIEW: string;
    new (): Formatter;
}