import { AevoClient } from "../aevo-client";
export interface AevoOrder {
    isBuy: boolean;
    instrument: number;
    limitPrice: string;
    amount: string;
    timestamp: number;
    salt: string;
}
export interface AevoSignedOrder extends AevoOrder {
    maker: string;
    signature: string;
}
export declare class AevoOrderClient {
    private client;
    constructor(client: AevoClient);
    constructOrder: (order: Omit<AevoOrder, "maker" | "salt" | "timestamp">) => AevoOrder;
    signOrder: (order: AevoOrder) => Promise<{
        signature: string;
        maker: string;
        isBuy: boolean;
        instrument: number;
        limitPrice: string;
        amount: string;
        timestamp: number;
        salt: string;
    }>;
    createOrder: (order: AevoSignedOrder) => Promise<unknown>;
    cancelOrder: (order_id: string) => Promise<unknown>;
}
