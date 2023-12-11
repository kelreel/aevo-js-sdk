import ky from "ky";
import { AevoClient } from "../aevo-client";

interface Greeks {
  delta: string;
  theta: string;
  gamma: string;
  rho: string;
  vega: string;
  iv: string;
}

export class AevoRestApi {
  client: AevoClient;

  constructor(client: AevoClient) {
    this.client = client;
  }

  /**
   * TODO desc
   */
  getAssets = async () => {
    const result = await ky
      .get(`${this.client.config.rest_url}/assets`)
      .json<Promise<string[]>>();
    return result;
  };

  /**
   * TODO desc
   */
  getExpiries = async (asset: string) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/expiries/?asset=${asset}`)
      .json<Promise<string[]>>();
    return result;
  };

  /**
   * TODO desc
   */
  getIndex = async (asset: string) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/index/?asset=${asset}`)
      .json<
        Promise<{
          timestamp: string;
          price: string;
        }>
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getIndexHistory = async (params: {
    asset: string;
    resolution?: number;
    start_time?: string;
    end_time?: string;
  }) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/index-history`, {
        searchParams: params,
      })
      .json<
        Promise<{
          history: Array<[string, string]>;
        }>
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getMarkHistory = async (params: {
    instrument_name: string;
    resolution?: number;
    limit?: number;
    start_time?: string;
    end_time?: string;
  }) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/mark-history`, {
        searchParams: params,
      })
      .json<
        Promise<{
          history: Array<[string, string]>;
        }>
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getSettlementHistory = async (params: {
    asset: string;
    limit?: number;
    start_time?: string;
    end_time?: string;
  }) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/settlement-history`, {
        searchParams: params,
      })
      .json<
        Promise<
          {
            asset: string;
            expiry: string;
            settlement_price: string;
            settlement_timestamp: string;
          }[]
        >
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getMarkets = async (params: {
    asset: string;
    instrument_type: "OPTION" | "PERPETUAL" | "SPOT";
  }) => {
    // TODO: result type
    const result = await ky
      .get(`${this.client.config.rest_url}/markets`, {
        searchParams: params,
      })
      .json<
        Promise<
          Array<
            | {
                // PERPETUAL
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
              }
            | ({
                // OPTION
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
              } & Greeks)
            | {}
          >
        >
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getStatistics = async (params: {
    asset: string;
    instrument_type: "OPTION" | "PERPETUAL" | "SPOT";
    end_time?: string;
  }) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/statistics`, {
        searchParams: params,
      })
      .json<
        Promise<{
          daily_volume: string;
          daily_volume_premium: string;
          total_volume: string;
          total_volume_premium: string;
        }>
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getCoingeckoStatistics = async () => {
    const result = await ky
      .get(`${this.client.config.rest_url}/coingecko-statistics`)
      .json<
        Promise<
          {
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
          }[]
        >
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getOrderbook = async (params: { instrument_name: string }) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/orderbook`, { searchParams: params })
      .json<Promise<any>>();
    return result;
  };

  /**
   * TODO desc
   */
  getFunding = async (params: { instrument_name: string }) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/funding`, { searchParams: params })
      .json<
        Promise<{
          next_epoch: string;
          funding_rate: string;
        }>
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getFundingHistory = async (params: {
    instrument_name: string;
    limit?: number;
    start_time?: string;
    end_time?: string;
  }) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/funding-history`, {
        searchParams: params,
      })
      .json<
        Promise<{
          funding_history: Array<[string, string]>;
        }>
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getInstrument = async (params: { instrument_name: string }) => {
    const result = await ky
      .get(
        `${this.client.config.rest_url}/instrument/${params.instrument_name}`,
      )
      .json<
        Promise<{
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
          best_bid: { price: string; amount: string };
          best_ask: { price: string; amount: string };
          funding_rate: string;
        }>
      >();
    return result;
  };

  /**
   * TODO desc
   */
  getInstrumentTradeHistory = async (params: {
    instrument_name: string;
    start_time?: string;
    end_time?: string;
  }) => {
    const { instrument_name, ...searchParams } = params;

    const result = await ky
      .get(
        `${this.client.config.rest_url}/instrument/${params.instrument_name}/trade-history`,
        { searchParams },
      )
      .json<
        Promise<
          {
            trade_id: string;
            instrument_id: string;
            instrument_name: string;
            instrument_type: string;
            amount: string;
            side: string;
            created_timestamp: string;
            price: string;
          }[]
        >
      >();
    return result;
  };
}
