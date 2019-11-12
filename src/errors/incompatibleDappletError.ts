export class IncompatibleDappletError extends Error {
    public readonly incompatibleFeatures?: string[][];
    constructor(incompatibleFeatures?: string[][]) {
        super("Can not run incompatible dapplet.");
        this.name = "IncompatibleDappletError";
        this.incompatibleFeatures = incompatibleFeatures;
    }
}