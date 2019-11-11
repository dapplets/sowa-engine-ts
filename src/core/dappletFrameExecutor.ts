import { State } from "./state";
import { DappletTemplate } from "../types/dappletTemplate";
import { FrameStatus } from "../types/statusEnum";
import { TxBuilder } from "../interfaces/txBuilder";
import { DappletProvider } from "../interfaces/dappletProvider";
//import { TxBuilderFactory } from './txBuilderFactory';
import { FeaturesRegistry } from './featuresRegistry';
import { IncompatibleDappletError } from '../errors/incompatibleDappletError';
import { View } from 'src/interfaces/view';

export class DappletFrameExecutor {
    private _state: State;
    //private _txBuilderFactory: TxBuilderFactory;
    protected dappletId: string;
    protected dapplet?: DappletTemplate;
    private _statusChangedHandler?: (status: FrameStatus) => void;
    protected status: FrameStatus = FrameStatus.INITED;
    private _txBuilders: { [key: string]: TxBuilder } = {};
    private _features: { [alias: string]: any } = {};
    private _compatibleView?: View;

    private _setStatus(status: FrameStatus) {
        this.status = status;
        if (this._statusChangedHandler) {
            this._statusChangedHandler(status);
        }
    }

    constructor(dappletId: string, txMeta: any, private _featuresRegistry: FeaturesRegistry) {
        this.dappletId = dappletId;
        this._state = new State(txMeta);
        //this._txBuilderFactory = new TxBuilderFactory(_featuresRegistry);
        this._setStatus(FrameStatus.INITED);
    }

    public async load(dappletProvider: DappletProvider): Promise<void> {
        this.dapplet = await dappletProvider.loadDapplet(this.dappletId);
        this._setStatus(FrameStatus.LOADED);
    }

    public validate() {
        if (this.status < FrameStatus.LOADED) throw Error("Dapplet template is not loaded yet. Call load() method before.");

        const dapplet = this.dapplet!;
        const incompatibleFeatures: string[][] = [];

        // validate and init views
        let isCompatibleViewFound = false;
        for (const viewTemplate of dapplet.views) {
            const regKeys = dapplet.aliases[viewTemplate.type];
            if (!regKeys) throw new Error(`Alias ${viewTemplate.type} is not defined in usings.`);
            const viewClass = this._featuresRegistry.get(...regKeys);
            if (!viewClass) continue;

            this._compatibleView = new viewClass(viewTemplate, this._state);
            isCompatibleViewFound = true;
            break;
        }

        // validate and init txBuilders
        for (const txName in dapplet.transactions) {
            const txAlias = dapplet.transactions[txName].type;
            const regKeys = dapplet.aliases[txAlias];
            const txBuilderClass = this._featuresRegistry.get(...regKeys);
            if (!txBuilderClass) {
                incompatibleFeatures.push(regKeys);
            }
        }

        if (incompatibleFeatures.length > 0 || !isCompatibleViewFound) {
            this._setStatus(FrameStatus.INCOMPATIBLE);
            throw new IncompatibleDappletError(incompatibleFeatures);
        } else {
            this._setStatus(FrameStatus.COMPATIBLE);
        }
    }

    public async run(): Promise<void> {
        if (this.status < FrameStatus.COMPATIBLE) throw new IncompatibleDappletError();
        this._setStatus(FrameStatus.RUNNING);

        const dapplet = this.dapplet!;

        for (const txName in dapplet.transactions) {
            const txTemplate = dapplet.transactions[txName];
            const regKeys = dapplet.aliases[txTemplate.type];
            const txBuilderClass = this._featuresRegistry.get(...regKeys);
            if (!txBuilderClass) throw new Error("TxBuilderClass is not found");
            const builder = new txBuilderClass(txTemplate, this._state);
            this._txBuilders[txName] = builder;
        }

        this._setStatus(FrameStatus.CREATED);
    }

    public onStatusChanged(handler: (status: FrameStatus) => void) {
        this._statusChangedHandler = handler;
    }
}