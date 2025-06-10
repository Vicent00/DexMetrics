import { 
  ProcessedAnalyticsData, 
  ProcessedMetrics, 
  ProcessedPool, 
  ProcessedFactory 
} from '../types/analytics';

interface Bundle {
  ethPriceUSD: string;
}

interface Factory {
  id: string;
  totalVolumeETH: string;
  totalFeesETH: string;
  poolCount: string;
  totalValueLockedUSD: string;
  txCount: string;
}

interface Pool {
  id: string;
  token0: {
    symbol: string;
  };
  token1: {
    symbol: string;
  };
  feeTier: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
}

interface RawAnalyticsData {
  bundles: Bundle[];
  pools: Pool[];
  factories: Factory[];
}

export function processAnalyticsData(data: RawAnalyticsData): ProcessedAnalyticsData {
  const ethPrice = parseFloat(data.bundles[0]?.ethPriceUSD || '0');

  // Process metrics
  const metrics = processMetrics(data, ethPrice);

  // Process pools
  const pools = data.pools.map(pool => processPool(pool));

  // Process factories
  const factories = data.factories.map(factory => processFactory(factory, ethPrice));

  return {
    metrics,
    pools,
    factories
  };
}

function processMetrics(data: RawAnalyticsData, ethPrice: number): ProcessedMetrics {
  const totalVolume = data.factories.reduce((acc: number, factory: Factory) => {
    return acc + parseFloat(factory.totalVolumeETH || '0');
  }, 0);

  const totalFees = data.factories.reduce((acc: number, factory: Factory) => {
    return acc + parseFloat(factory.totalFeesETH || '0');
  }, 0);

  const totalPools = data.factories.reduce((acc: number, factory: Factory) => {
    return acc + parseInt(factory.poolCount || '0');
  }, 0);

  const totalTVL = data.factories.reduce((acc: number, factory: Factory) => {
    return acc + parseFloat(factory.totalValueLockedUSD || '0');
  }, 0);

  return {
    totalVolume: {
      eth: totalVolume,
      usd: totalVolume * ethPrice
    },
    totalFees: {
      eth: totalFees,
      usd: totalFees * ethPrice
    },
    totalPools,
    totalTVL,
    ethPrice
  };
}

function processPool(pool: Pool): ProcessedPool {
  return {
    id: pool.id,
    pair: `${pool.token0.symbol}/${pool.token1.symbol}`,
    feeTier: (parseFloat(pool.feeTier) / 10000).toFixed(2) + '%',
    tvl: parseFloat(pool.totalValueLockedUSD),
    volume: parseFloat(pool.volumeUSD)
  };
}

function processFactory(factory: Factory, ethPrice: number): ProcessedFactory {
  return {
    id: factory.id,
    poolCount: parseInt(factory.poolCount),
    txCount: parseInt(factory.txCount),
    volume: {
      eth: parseFloat(factory.totalVolumeETH),
      usd: parseFloat(factory.totalVolumeETH) * ethPrice
    },
    fees: {
      eth: parseFloat(factory.totalFeesETH),
      usd: parseFloat(factory.totalFeesETH) * ethPrice
    },
    tvl: parseFloat(factory.totalValueLockedUSD)
  };
}

export const formatAnalyticsData = (data: RawAnalyticsData) => {
  return processAnalyticsData(data);
}; 