export const mockAnalyticsData = {
  metrics: {
    tvl: {
      value: 2500000000,
      change: 12.5,
      history: [
        { date: '2024-01-01', value: 2200000000 },
        { date: '2024-01-02', value: 2250000000 },
        { date: '2024-01-03', value: 2300000000 },
        { date: '2024-01-04', value: 2350000000 },
        { date: '2024-01-05', value: 2400000000 },
        { date: '2024-01-06', value: 2450000000 },
        { date: '2024-01-07', value: 2500000000 },
      ]
    },
    volume: {
      value: 450000000,
      change: 8.3,
      history: [
        { date: '2024-01-01', value: 400000000 },
        { date: '2024-01-02', value: 410000000 },
        { date: '2024-01-03', value: 420000000 },
        { date: '2024-01-04', value: 425000000 },
        { date: '2024-01-05', value: 430000000 },
        { date: '2024-01-06', value: 440000000 },
        { date: '2024-01-07', value: 450000000 },
      ]
    },
    users: {
      value: 15200,
      change: 5.7,
      history: [
        { date: '2024-01-01', value: 14000 },
        { date: '2024-01-02', value: 14200 },
        { date: '2024-01-03', value: 14400 },
        { date: '2024-01-04', value: 14600 },
        { date: '2024-01-05', value: 14800 },
        { date: '2024-01-06', value: 15000 },
        { date: '2024-01-07', value: 15200 },
      ]
    },
    transactions: {
      value: 45800,
      change: -2.1,
      history: [
        { date: '2024-01-01', value: 46800 },
        { date: '2024-01-02', value: 46500 },
        { date: '2024-01-03', value: 46200 },
        { date: '2024-01-04', value: 46000 },
        { date: '2024-01-05', value: 45900 },
        { date: '2024-01-06', value: 45850 },
        { date: '2024-01-07', value: 45800 },
      ]
    }
  },
  topPools: [
    { pair: "ETH/USDC", volume: 120000000, tvl: 450000000 },
    { pair: "WBTC/ETH", volume: 85000000, tvl: 320000000 },
    { pair: "USDC/USDT", volume: 65000000, tvl: 280000000 },
    { pair: "LINK/ETH", volume: 45000000, tvl: 150000000 },
    { pair: "UNI/ETH", volume: 35000000, tvl: 120000000 },
  ],
  topTokens: [
    { token: "ETH", volume: 180000000, price: 2850 },
    { token: "WBTC", volume: 95000000, price: 42500 },
    { token: "USDC", volume: 75000000, price: 1 },
    { token: "LINK", volume: 55000000, price: 15.20 },
    { token: "UNI", volume: 40000000, price: 7.80 },
  ]
}; 