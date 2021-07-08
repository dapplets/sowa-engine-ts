// ToDo: it.

export class CameraFormatter {
    public static readonly globalName: string = "http://types.dapplets.org/ethereum/formatters/address/1.0";
    public static readonly targetViewGlobalName: string = "http://types.dapplets.org/views/htmlMustache/1.0";
    public static readonly REG_KEYS = [CameraFormatter.globalName, CameraFormatter.targetViewGlobalName];

    public txConfig: any;

    public async run(): Promise<any> {

    }

    public on(event: string, callback: Function): void {

    }
}