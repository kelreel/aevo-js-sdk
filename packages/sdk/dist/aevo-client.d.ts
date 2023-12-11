import { AevoChainType, AevoConfig } from "./config";
import { Web3BaseWalletAccount } from "web3";
import WebSocket from "ws";
import { AevoRestApi } from "./rest-api";
import { AevoOrderClient } from "./order";
interface Params {
    signingKey?: string;
    walletAddress?: string;
    apiKey?: string;
    apiSecret?: string;
    chain?: AevoChainType;
    silent?: boolean;
}
export declare class AevoClient {
    signingKey: string | undefined;
    walletAddress: string | undefined;
    apiKey: string | undefined;
    apiSecret: string | undefined;
    chain: AevoChainType | undefined;
    extraHeaders: Record<string, string | undefined>;
    wallet: Web3BaseWalletAccount | undefined;
    ws: WebSocket | undefined;
    config: AevoConfig;
    silent: boolean;
    constructor(params?: Params);
    get signingDomain(): {
        name: string;
        version: string;
        chainId: string;
    };
    getRestApiClient: () => AevoRestApi;
    getOrdersClient: () => AevoOrderClient;
    openConnection: () => Promise<void>;
    closeConnection: () => Promise<void>;
    readMessages: (listener: (data: any) => void) => void;
    subscribeTicker: (asset: string) => Promise<void>;
}
export {};
