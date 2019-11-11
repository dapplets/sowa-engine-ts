import { DappletProvider } from '../../src/interfaces/dappletProvider';
import { DappletTemplate } from '../../src/types/dappletTemplate';

export class TestDappletProvider implements DappletProvider {
    private _storage: { [id: string]: DappletTemplate } = {};

    public add(id: string, template: DappletTemplate) {
        this._storage[id] = template;
    }

    async loadDapplet(id: string): Promise<DappletTemplate> {
        return this._storage[id];
    }
}