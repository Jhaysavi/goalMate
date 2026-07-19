export type TxlineMarket = {
  SuperOddsType: string;
  MarketParameters: unknown;
  MarketPeriod: unknown;
  PriceNames: string[];
};

export type TxlinePriceUpdate = {
  Name: string;
  Price: number;
  Pct?: number;
};

export type OddsUpdate = {
  FixtureId: number;
  MessageId: number;
  Ts: number;
  Bookmaker: string;
  BookmakerId?: number;
  SuperOddsType: string;
  GameState?: string;
  InRunning?: boolean;
  MarketParameters?: unknown;
  MarketPeriod?: unknown;
  PriceNames: string[];
  Prices: number[];
  Pct: string[];
};

