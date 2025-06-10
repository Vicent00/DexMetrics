export interface AnalyticsMetrics {
  totalVolume: number;
  totalFees: number;
  totalPools: number;
  totalTVL: number;
}

export interface Pool {
  pair: string;
  volume: number;
  tvl: number;
  fees: number;
  change24h: number;
}

export interface Token {
  token: string;
  volume: number;
  price: number;
  change24h: number;
  marketCap: number;
}

export interface AnalyticsData {
  metrics: AnalyticsMetrics;
  topPools: Pool[];
  topTokens: Token[];
  lastUpdate: string;
} 