import { AevoClient } from "../aevo-client";
interface Greeks {
    delta: string;
    theta: string;
    gamma: string;
    rho: string;
    vega: string;
    iv: string;
}
export declare class AevoRestApi {
    client: AevoClient;
    constructor(client: AevoClient);
    /**
     * TODO desc
     */
    getAssets: () => Promise<string[]>;
    /**
     * TODO desc
     */
    getExpiries: (asset: string) => Promise<string[]>;
    /**
     * TODO desc
     */
    getIndex: (asset: string) => Promise<{
        timestamp: string;
        price: string;
    }>;
    /**
     * TODO desc
     */
    getIndexHistory: (params: {
        asset: string;
        resolution?: number;
        start_time?: string;
        end_time?: string;
    }) => Promise<{
        history: Array<[
            string,
            string
        ]>;
    }>;
    /**
     * TODO desc
     */
    getMarkHistory: (params: {
        instrument_name: string;
        resolution?: number;
        limit?: number;
        start_time?: string;
        end_time?: string;
    }) => Promise<{
        history: Array<[
            string,
            string
        ]>;
    }>;
    /**
     * TODO desc
     */
    getSettlementHistory: (params: {
        asset: string;
        limit?: number;
        start_time?: string;
        end_time?: string;
    }) => Promise<{
        asset: string;
        expiry: string;
        settlement_price: string;
        settlement_timestamp: string;
    }[]>;
    /**
     * TODO desc
     */
    getMarkets: (params: {
        asset: string;
        instrument_type: "OPTION" | "PERPETUAL" | "SPOT";
    }) => Promise<({} | {
        instrument_id: string;
        instrument_name: string;
        instrument_type: string;
        underlying_asset: string;
        quote_asset: string;
        price_step: string;
        amount_step: string;
        min_order_value: string;
        mark_price: string;
        index_price: string;
        is_active: boolean;
        max_leverage: string;
    } | ({
        instrument_id: string;
        instrument_name: string;
        instrument_type: string;
        underlying_asset: string;
        quote_asset: string;
        price_step: string;
        amount_step: string;
        min_order_value: string;
        mark_price: string;
        forward_price: string;
        index_price: string;
        is_active: boolean;
        option_type: string;
        expiry: string;
        strike: string;
        greeks: Greeks;
    } & Greeks))[]>;
    /**
     * TODO desc
     */
    getStatistics: (params: {
        asset: string;
        instrument_type: "OPTION" | "PERPETUAL" | "SPOT";
        end_time?: string;
    }) => Promise<{
        daily_volume: string;
        daily_volume_premium: string;
        total_volume: string;
        total_volume_premium: string;
    }>;
    /**
     * TODO desc
     */
    getCoingeckoStatistics: () => Promise<{
        ticker_id: string;
        base_currency: string;
        target_currency: string;
        target_volume: string;
        product_type: string;
        open_interest: string;
        index_price: string;
        index_currency: string;
        next_funding_rate_timestamp: string;
        funding_rate: string;
        contract_type: string;
        contract_price_currency: string;
    }[]>;
    /**
     * TODO desc
     */
    getOrderbook: (params: {
        instrument_name: string;
    }) => Promise<any>;
    /**
     * TODO desc
     */
    getFunding: (params: {
        instrument_name: string;
    }) => Promise<{
        next_epoch: string;
        funding_rate: string;
    }>;
    /**
     * TODO desc
     */
    getFundingHistory: (params: {
        instrument_name: string;
        limit?: number;
        start_time?: string;
        end_time?: string;
    }) => Promise<{
        funding_history: Array<[
            string,
            string
        ]>;
    }>;
    /**
     * TODO desc
     */
    getInstrument: (params: {
        instrument_name: string;
    }) => Promise<{
        asset: string;
        instrument_id: string;
        instrument_name: string;
        instrument_type: string;
        mark_price: string;
        index_price: string;
        markets: {
            daily_volume: string;
            daily_volume_contracts: string;
            total_volume: string;
            total_volume_contracts: string;
            total_oi: string;
        };
        best_bid: {
            price: string;
            amount: string;
        };
        best_ask: {
            price: string;
            amount: string;
        };
        funding_rate: string;
    }>;
    /**
     * TODO desc
     */
    getInstrumentTradeHistory: (params: {
        instrument_name: string;
        start_time?: string;
        end_time?: string;
    }) => Promise<{
        trade_id: string;
        instrument_id: string;
        instrument_name: string;
        instrument_type: string;
        amount: string;
        side: string;
        created_timestamp: string;
        price: string;
    }[]>;
}
export {};
