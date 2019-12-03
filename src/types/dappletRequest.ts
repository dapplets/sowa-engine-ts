import { DappletFrame } from "./dappletFrame"

export type DappletRequest = DappletFrame[]
export enum RequestType {
    DAPPLET = 0, FETCH_EVENTS = 1
}

export type MixedRequest = [RequestType, DappletRequest | EventRequest]
export type EventRequest = [string, number]