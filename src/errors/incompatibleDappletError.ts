import { RegKey } from '../core/regKey';

export class IncompatibleDappletError extends Error {
    constructor(public readonly incompatibleFeatures?: string[]) {
        super("Can not run incompatible dapplet.");
        this.name = "IncompatibleDappletError";
    }
}