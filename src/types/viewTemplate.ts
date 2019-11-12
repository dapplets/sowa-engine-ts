export type ViewTemplate = {
    type: string;
    template: string | { 
        main: string;
        //DiP-02.2: "name" is better than "key"?
        [key: string]: string
    }
}