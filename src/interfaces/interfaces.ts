export class Feature {
    static readonly GLOBAL_NAME:string
    //static readonly REG_KEY? : string[]
    constructor(...args: any[]) { 
        if (args.length>0) throw new Error("feature subclass is missing constructor for " + args.length + "arguments");
    }
}