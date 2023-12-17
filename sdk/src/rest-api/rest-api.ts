import ky from "ky";
import { AevoClient } from "../aevo-client";
import { AevoInstrument, InstrumentType } from "../types";

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

  // Public REST API

  /**
   * Returns the list of active underlying assets.
   */
  getAssets = async () => {
    const result = await ky
      .get(`${this.client.config.rest_url}/assets`)
      .json<Promise<string[]>>();
    return result;
  };

  /**
   * Returns the expiry timestamps of derivatives of the given asset.
   */
  getExpiries = async (asset: string) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/expiries/?asset=${asset}`)
      .json<Promise<string[]>>();
    return result;
  };

  /**
   * Returns the current index price of the given asset.
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
   * Returns the historical index price for a given asset.
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
   * Returns the historical mark prices for a given instrument.
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
   * Returns the historical settlement prices for a given asset.
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
   * Returns a list of instruments. If asset is not specified, the response will include all listed instruments.
   */
  getMarkets = async (params: {
    asset: string;
    instrument_type: InstrumentType;
  }) => {
    // TODO: result type
    const result = await ky
      .get(`${this.client.config.rest_url}/markets`, {
        searchParams: params,
      })
      .json<
        Promise<
          Array<
            | AevoInstrument
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
   * Returns the market statistics for the given asset.
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
   * Returns the perpetual statistics of all assets specifically for https://www.coingecko.com/en/exchanges/aevo
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
   * Returns the orderbook for a given symbol.
   */
  getOrderbook = async (params: { instrument_name: string }) => {
    const result = await ky
      .get(`${this.client.config.rest_url}/orderbook`, { searchParams: params })
      .json<Promise<any>>();
    return result;
  };

  /**
   * Returns the current funding rate for the instrument.
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
   * Returns the funding rate history for the instrument.
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
   * Returns the instrument information for the given instrument.
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
   * Returns the trade history for the given instrument.
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
