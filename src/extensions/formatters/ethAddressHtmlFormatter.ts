export class EthAddressHtmlFormatter {
    private static readonly globalName: string = "http://types.dapplets.org/ethereum/formatters/address/1.0";
    private static readonly targetViewGlobalName: string = "http://types.dapplets.org/views/htmlMustache/1.0";
    public static readonly REG_KEY = [EthAddressHtmlFormatter.globalName, EthAddressHtmlFormatter.targetViewGlobalName];

    public txConfig: any;

    public async run(): Promise<any> {
        
    }

    public on(event: string, callback: Function): void {

    }
}