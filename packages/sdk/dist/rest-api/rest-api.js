import ky from "ky";
export class AevoRestApi {
    constructor(client) {
        /**
         * TODO desc
         */
        this.getAssets = async () => {
            const result = await ky
                .get(`${this.client.config.rest_url}/assets`)
                .json();
            return result;
        };
        /**
         * TODO desc
         */
        this.getExpiries = async (asset) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/expiries/?asset=${asset}`)
                .json();
            return result;
        };
        /**
         * TODO desc
         */
        this.getIndex = async (asset) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/index/?asset=${asset}`)
                .json();
            return result;
        };
        /**
         * TODO desc
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
         * TODO desc
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
         * TODO desc
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
         * TODO desc
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
         * TODO desc
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
         * TODO desc
         */
        this.getCoingeckoStatistics = async () => {
            const result = await ky
                .get(`${this.client.config.rest_url}/coingecko-statistics`)
                .json();
            return result;
        };
        /**
         * TODO desc
         */
        this.getOrderbook = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/orderbook`, { searchParams: params })
                .json();
            return result;
        };
        /**
         * TODO desc
         */
        this.getFunding = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/funding`, { searchParams: params })
                .json();
            return result;
        };
        /**
         * TODO desc
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
         * TODO desc
         */
        this.getInstrument = async (params) => {
            const result = await ky
                .get(`${this.client.config.rest_url}/instrument/${params.instrument_name}`)
                .json();
            return result;
        };
        /**
         * TODO desc
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
