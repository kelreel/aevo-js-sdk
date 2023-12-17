export type InstrumentType = "OPTION" | "PERPETUAL" | "SPOT";

export interface AevoInstrument {
  instrument_id: string;
  instrument_name: string;
  instrument_type: InstrumentType;
  underlying_asset: string;
  quote_asset: string;
  price_step: string;
  amount_step: string;
  min_order_value: string;
  mark_price: string;
  index_price: string;
  is_active: boolean;
  max_leverage: string;
  pre_launch?: boolean;
}
