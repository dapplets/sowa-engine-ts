import { Feature } from 'src/interfaces/feature';

export class EthAddressHtmlFormatter implements Feature {
    public readonly globalName: string = "http://types.dapplets.org/ethereum/formatters/address/1.0";
    public readonly targetViewGlobalName: string = "http://types.dapplets.org/views/htmlMustache/1.0";
    public readonly regKey = [this.globalName, this.targetViewGlobalName];

    public txConfig: any;
    public state: State;

    public async run(): Promise<any> {
        
    }

    public on(event: string, callback: Function): void {

    }
}