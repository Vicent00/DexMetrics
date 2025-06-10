'use client';

import React, { useState, useMemo } from 'react';

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

type SortField = 'tvl' | 'volume' | 'fee';
type SortDirection = 'asc' | 'desc';

const PoolsList: React.FC<PoolsListProps> = ({ pools = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('tvl');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedFeeTier, setSelectedFeeTier] = useState<string>('all');

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

  const filteredAndSortedPools = useMemo(() => {
    let filtered = pools.filter(pool => {
      const pairName = `${pool.token0.symbol}/${pool.token1.symbol}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = pairName.includes(searchLower);
      const matchesFeeTier = selectedFeeTier === 'all' || 
        (parseInt(pool.feeTier) / 10000).toString() === selectedFeeTier;
      
      return matchesSearch && matchesFeeTier;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'tvl':
          comparison = parseFloat(a.totalValueLockedUSD) - parseFloat(b.totalValueLockedUSD);
          break;
        case 'volume':
          comparison = parseFloat(a.volumeUSD) - parseFloat(b.volumeUSD);
          break;
        case 'fee':
          comparison = parseInt(a.feeTier) - parseInt(b.feeTier);
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [pools, searchTerm, sortField, sortDirection, selectedFeeTier]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by pair (e.g., ETH/USDC)"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 bg-white/80 backdrop-blur-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
            value={selectedFeeTier}
            onChange={(e) => setSelectedFeeTier(e.target.value)}
          >
            <option value="all">All Fee Tiers</option>
            <option value="0.05">0.05%</option>
            <option value="0.3">0.3%</option>
            <option value="1">1%</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white/90 backdrop-blur-sm rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort('fee')}
              >
                Fee Tier {sortField === 'fee' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort('tvl')}
              >
                TVL {sortField === 'tvl' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort('volume')}
              >
                Volume 24h {sortField === 'volume' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedPools.map((pool) => (
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