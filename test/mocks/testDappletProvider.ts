import fs from "fs"
import { DappletProvider } from '../../src/interfaces/dappletProvider'
import { DappletTemplate } from '../../src/types/dappletTemplate'

export class TestDappletProvider implements DappletProvider {
  async loadDapplet(id: string): Promise<DappletTemplate> {
    return new Promise((resolve, reject) =>
      fs.readFile(`./test/mocks/dapplets/${id}.json`, 'utf8', (err, jsonString) => {
        if (err) reject(err)
        resolve(JSON.parse(jsonString))
      }))
  }
}