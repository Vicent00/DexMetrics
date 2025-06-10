import { AnalyticsData } from '../types/analytics';

export const mockAnalyticsData: AnalyticsData = {
  metrics: {
    totalVolume: 1234567890,
    totalFees: 1234567,
    totalPools: 156,
    totalTVL: 9876543210
  },
  topPools: [
    {
      pair: 'ETH/USDC',
      volume: 123456789,
      tvl: 987654321,
      fees: 123456,
      change24h: 5.2
    },
    {
      pair: 'BTC/ETH',
      volume: 98765432,
      tvl: 765432109,
      fees: 98765,
      change24h: 3.8
    },
    {
      pair: 'USDT/USDC',
      volume: 87654321,
      tvl: 654321098,
      fees: 87654,
      change24h: 1.2
    }
  ],
  topTokens: [
    {
      token: 'ETH',
      volume: 123456789,
      price: 3456.78,
      change24h: 2.5,
      marketCap: 9876543210
    },
    {
      token: 'BTC',
      volume: 98765432,
      price: 45678.90,
      change24h: 1.8,
      marketCap: 8765432109
    },
    {
      token: 'USDC',
      volume: 87654321,
      price: 1.00,
      change24h: 0.1,
      marketCap: 7654321098
    }
  ],
  lastUpdate: new Date().toISOString()
}; 