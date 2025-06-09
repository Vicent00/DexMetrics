import React from 'react';

interface Token {
  id: string;
  symbol: string;
  name: string;
}

interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  totalValueLockedUSD: string;
  volumeUSD: string;
  feeTier: string;
  token0Price: string;
  token1Price: string;
}

interface PoolsListProps {
  pools?: Pool[];
}

const PoolsList: React.FC<PoolsListProps> = ({ pools = [] }) => {
  const formatUSD = (value: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseFloat(value));
  };

  const formatNumber = (value: string) => {
    return parseFloat(value).toFixed(4);
  };

  if (!pools || pools.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Pools by TVL</h2>
        <div className="text-center text-gray-500 py-4">
          No pools data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Pools by TVL</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Tier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">TVL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume 24h</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pools.map((pool) => (
              <tr key={pool.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {pool.token0.symbol}/{pool.token1.symbol}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(parseInt(pool.feeTier) / 10000).toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatUSD(pool.totalValueLockedUSD)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatUSD(pool.volumeUSD)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>1 {pool.token0.symbol} = {formatNumber(pool.token0Price)} {pool.token1.symbol}</div>
                  <div className="text-xs text-gray-400">1 {pool.token1.symbol} = {formatNumber(pool.token1Price)} {pool.token0.symbol}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolsList; 