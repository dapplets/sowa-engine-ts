export class CameraFormatter {
    private static readonly globalName: string = "http://types.dapplets.org/ethereum/formatters/address/1.0";
    private static readonly targetViewGlobalName: string = "http://types.dapplets.org/views/htmlMustache/1.0";
    public static readonly REG_KEY = [CameraFormatter.globalName, CameraFormatter.targetViewGlobalName];

    public txConfig: any;

    public async run(): Promise<any> {

    }

    public on(event: string, callback: Function): void {

    }
}