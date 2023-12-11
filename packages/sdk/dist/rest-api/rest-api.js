import ky from "ky";
export class AevoRestApi {
    constructor(client) {
        // Public REST API
        /**
         * Returns the list of active underlying assets.
         */
        this.getAssets = async () => {
            const result = await ky
                .get(`${this.client.config.rest_url}/assets`)
                .json();
            return result;
        };
        /**
         * Returns the expiry timestamps of derivatives of the given asset.
         */
        this.getExpiries = async (asset) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/expiries/?asset=${asset}`)
                .json();
            return result;
        };
        /**
         * Returns the current index price of the given asset.
         */
        this.getIndex = async (asset) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/index/?asset=${asset}`)
                .json();
            return result;
        };
        /**
         * Returns the historical index price for a given asset.
         */
        this.getIndexHistory = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/index-history`, {
                searchParams: params,
            })
                .json();
            return result;
        };
        /**
         * Returns the historical mark prices for a given instrument.
         */
        this.getMarkHistory = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/mark-history`, {
                searchParams: params,
            })
                .json();
            return result;
        };
        /**
         * Returns the historical settlement prices for a given asset.
         */
        this.getSettlementHistory = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/settlement-history`, {
                searchParams: params,
            })
                .json();
            return result;
        };
        /**
         * Returns a list of instruments. If asset is not specified, the response will include all listed instruments.
         */
        this.getMarkets = async (params) => {
            // TODO: result type
            const result = await ky
                .get(`${this.client.config.rest_url}/markets`, {
                searchParams: params,
            })
                .json();
            return result;
        };
        /**
         * Returns the market statistics for the given asset.
         */
        this.getStatistics = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/statistics`, {
                searchParams: params,
            })
                .json();
            return result;
        };
        /**
         * Returns the perpetual statistics of all assets specifically for https://www.coingecko.com/en/exchanges/aevo
         */
        this.getCoingeckoStatistics = async () => {
            const result = await ky
                .get(`${this.client.config.rest_url}/coingecko-statistics`)
                .json();
            return result;
        };
        /**
         * Returns the orderbook for a given symbol.
         */
        this.getOrderbook = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/orderbook`, { searchParams: params })
                .json();
            return result;
        };
        /**
         * Returns the current funding rate for the instrument.
         */
        this.getFunding = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/funding`, { searchParams: params })
                .json();
            return result;
        };
        /**
         * Returns the funding rate history for the instrument.
         */
        this.getFundingHistory = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/funding-history`, {
                searchParams: params,
            })
                .json();
            return result;
        };
        /**
         * Returns the instrument information for the given instrument.
         */
        this.getInstrument = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/instrument/${params.instrument_name}`)
                .json();
            return result;
        };
        /**
         * Returns the trade history for the given instrument.
         */
        this.getInstrumentTradeHistory = async (params) => {
            const { instrument_name, ...searchParams } = params;
            const result = await ky
                .get(`${this.client.config.rest_url}/instrument/${params.instrument_name}/trade-history`, { searchParams })
                .json();
            return result;
        };
        this.client = client;
    }
}
