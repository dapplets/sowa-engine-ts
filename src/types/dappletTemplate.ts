export type DappletTemplate = {
    // contexts/registries/usings/aliases
    alias: {
        [key: string]: string    
    };

    // rel 2.0?
    variables: {
        //DiP-02.1: "name" is better than "key"?
        [key: string]: string;
    };

    views: {
        type: string;
        template: string | { 
            main: string;
            //DiP-02.2: "name" is better than "key"?
            [key: string]: string
        }
    }[];

    transactions: {
        [key: string]: {
            type: string;
            when?: string;
            [key: string]: any;
        }
    };
}