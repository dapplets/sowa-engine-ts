import { Formatter } from '../../interfaces/formatter'

// ToDo: should it be in view or as separated formatter? it depends on view...
export class AddressHtmlFormatter implements Formatter {
    public static readonly GLOBAL_NAME = "http://types.dapplets.org/ethereum/formatters/address/1.0"
    public static readonly TARGET_VIEW = "http://types.dapplets.org/views/htmlMustache/1.0"

    public exec(input: any): any {
        return input
    }
}