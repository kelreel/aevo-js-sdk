export interface AevoWsResponse<T = any> {
  channel: string;
  data: T;
}

export interface TickerUpdateResponse {
  timestamp: string;
  tickers: TickerUpdateItem[];
}

export interface TickerUpdateItem {
  instrument_id: string;
  instrument_name: string;
  instrument_type: string;
  index_price: string;
  mark: any;
  open_interest: string;
  bid: any;
  ask: any;
  funding_rate: string;
}

export const isTickerUpdateResponse = (
  data: any,
): data is TickerUpdateResponse => {
  return "tickers" in data && Array.isArray(data.tickers);
};
