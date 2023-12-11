import { AevoClient } from "../aevo-client";
export declare class AevoOrdersClient {
    client: AevoClient;
    constructor(client: AevoClient);
    signOrder: (instrumentId: string, isBuy: boolean, limitPrice: string, amount: string) => Promise<string>;
}
