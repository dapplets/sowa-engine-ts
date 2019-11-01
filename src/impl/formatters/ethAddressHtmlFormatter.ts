import { Feature } from 'src/interfaces/feature';

export class EthAddressHtmlFormatter implements Feature {
    public readonly globalName: string = "http://types.dapplets.org/ethereum/formatters/address/1.0";
    public readonly viewGlobalName: string = "http://types.dapplets.org/views/htmlMustache/1.0";
    public readonly regKey = [this.globalName, this.viewGlobalName];

    public txConfig: any;
    public state: State;

    public async run(): Promise<any> {
        
    }

    public on(event: string, callback: Function): void {

    }
}