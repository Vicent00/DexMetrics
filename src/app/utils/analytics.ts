import { 
  AnalyticsData, 
  ProcessedAnalyticsData, 
  ProcessedMetrics, 
  ProcessedPool, 
  ProcessedFactory 
} from '../types/analytics';

export function processAnalyticsData(data: AnalyticsData): ProcessedAnalyticsData {
  const ethPrice = parseFloat(data.bundles[0]?.ethPriceUSD || '0');

  // Procesar métricas
  const metrics = processMetrics(data, ethPrice);

  // Procesar pools
  const pools = data.pools.map(pool => processPool(pool));

  // Procesar factories
  const factories = data.factories.map(factory => processFactory(factory, ethPrice));

  return {
    metrics,
    pools,
    factories
  };
}

function processMetrics(data: AnalyticsData, ethPrice: number): ProcessedMetrics {
  const totalVolume = data.factories.reduce((acc, factory) => {
    return acc + parseFloat(factory.totalVolumeETH || '0');
  }, 0);

  const totalFees = data.factories.reduce((acc, factory) => {
    return acc + parseFloat(factory.totalFeesETH || '0');
  }, 0);

  const totalPools = data.factories.reduce((acc, factory) => {
    return acc + parseInt(factory.poolCount || '0');
  }, 0);

  const totalTVL = data.factories.reduce((acc, factory) => {
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

function processPool(pool: any): ProcessedPool {
  return {
    id: pool.id,
    pair: `${pool.token0.symbol}/${pool.token1.symbol}`,
    feeTier: (parseFloat(pool.feeTier) / 10000).toFixed(2) + '%',
    tvl: parseFloat(pool.totalValueLockedUSD),
    volume: parseFloat(pool.volumeUSD)
  };
}

function processFactory(factory: any, ethPrice: number): ProcessedFactory {
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