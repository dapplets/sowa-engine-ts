import { State } from "./state";
import { DappletTemplate } from "../../types/dappletTemplate";
import { FrameStatus } from "../../types/statusEnum";
import { TxBuilder } from "../../interfaces/txBuilder";
import { DappletProvider } from "../../interfaces/dappletProvider";

export class DappletFrameExecutor {
    private _state: State = null;
    private _dappletId: string = null;
    private _dapplet: DappletTemplate = null;
    private _statusChangedHandler: (status: FrameStatus) => void = null;
    protected status: FrameStatus = FrameStatus.INITED;
    private _txBuilders: { [key: string]: TxBuilder } = {};

    private _setStatus(status: FrameStatus) {
        this.status = status;
        if (this._statusChangedHandler) {
            this._statusChangedHandler(status);
        }
    }

    constructor(dappletId: string, txMeta: any) {
        this._state = new State(txMeta);
        this._dappletId = dappletId;
    }

    public async load(dappletProvider: DappletProvider): Promise<void> {
        this._dapplet = await dappletProvider.loadDapplet(this._dappletId);

        const txNames = Object.getOwnPropertyNames(this._dapplet.transactions);

        for (const txName of txNames) {
            const builder = createTxBuilder(this._dapplet.transactions[txName]);
            this._txBuilders[txName] = builder;
        }

        this._setStatus(FrameStatus.LOADED);
    }

    public validate(): boolean {
        const isValid = true; // ToDo: validate
        // посмотреть aliases. возможно найдутся неподдерживаемые aliases
        if (isValid) {
            this._setStatus(FrameStatus.COMPATIBLE);
        } else {
            this._setStatus(FrameStatus.INCOMPATIBLE);
        }
        return isValid;
    }

    public async run(): Promise<void> {
        if (this.status < FrameStatus.COMPATIBLE) throw Error("Can not run incompatible dapplet.");
        this._setStatus(FrameStatus.RUNNING);

        //this._dapplet.transactions

        this._setStatus(FrameStatus.CREATED);
    }

    public onStatusChanged(handler: (status: FrameStatus) => void) {
        this._statusChangedHandler = handler;
    }
}