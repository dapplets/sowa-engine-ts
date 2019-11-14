export class RegKey {
    public rawKey: string[];

    constructor(strRegKey: string | string[]) {
        this.rawKey = (strRegKey instanceof Array) ? strRegKey : [strRegKey];
    }

    public equals(regKey: RegKey): boolean {
        return regKey.rawKey.every((v, i) => this.rawKey[i] === v);
    }

    public toString(): string {
        return this.rawKey.join("|");
    }
}