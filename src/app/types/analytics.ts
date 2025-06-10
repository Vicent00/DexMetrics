// Interfaces para los datos de analytics
export interface Factory {
  id: string;
  poolCount: string;
  txCount: string;
  totalVolumeETH: string;
  totalFeesETH: string;
  totalValueLockedUSD: string;
}

export interface Token {
  symbol: string;
  name: string;
}

export interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  feeTier: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
}

export interface AnalyticsData {
  factories: Factory[];
  bundles: {
    ethPriceUSD: string;
  }[];
  pools: Pool[];
}

export interface ProcessedMetrics {
  totalVolume: {
    eth: number;
    usd: number;
  };
  totalFees: {
    eth: number;
    usd: number;
  };
  totalPools: number;
  totalTVL: number;
  ethPrice: number;
}

export interface ProcessedPool {
  id: string;
  pair: string;
  feeTier: string;
  tvl: number;
  volume: number;
}

export interface ProcessedFactory {
  id: string;
  poolCount: number;
  txCount: number;
  volume: {
    eth: number;
    usd: number;
  };
  fees: {
    eth: number;
    usd: number;
  };
  tvl: number;
}

export interface ProcessedAnalyticsData {
  metrics: ProcessedMetrics;
  pools: ProcessedPool[];
  factories: ProcessedFactory[];
} 