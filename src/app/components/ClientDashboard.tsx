'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import EthPriceCard from './EthPriceCard';
import PoolsList from './PoolsList';

interface Factory {
  id: string;
  poolCount: string;
  txCount: string;
  totalVolumeETH: string;
  totalFeesETH: string;
}

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

interface VolumeData {
  factories: Factory[];
  bundles: {
    ethPriceUSD: string;
  }[];
  pools: Pool[];
}

interface ClientDashboardProps {
  initialData: VolumeData;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ClientDashboard: React.FC<ClientDashboardProps> = ({ initialData }) => {
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const { data, error } = useSWR<VolumeData>(
    '/api/graph-data',
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: 30000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  useEffect(() => {
    if (data) {
      const now = new Date().toLocaleTimeString();
      setLastUpdate(now);
      console.log(' Datos actualizados:', {
        timestamp: now,
        ethPrice: data.bundles[0]?.ethPriceUSD,
        totalFactories: data.factories.length
      });
    }
  }, [data]);

  if (error) {
    console.error('Error fetching data:', error);
  }

  const currentData = data || initialData;
  const ethPrice = currentData.bundles[0]?.ethPriceUSD || '0';

  const totalVolume = currentData.factories.reduce((acc: number, factory: Factory) => {
    return acc + parseFloat(factory.totalVolumeETH);
  }, 0);

  const totalFees = currentData.factories.reduce((acc: number, factory: Factory) => {
    return acc + parseFloat(factory.totalFeesETH);
  }, 0);

  const totalPools = currentData.factories.reduce((acc: number, factory: Factory) => {
    return acc + parseInt(factory.poolCount);
  }, 0);

  const formatUSD = (ethAmount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(ethAmount * parseFloat(ethPrice));
  };

  return (
    <div className="space-y-6">
      {lastUpdate && (
        <div className="text-sm text-gray-500 text-right">
          Última actualización: {lastUpdate}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Total Volume</h3>
          <p className="text-3xl font-bold text-blue-600">{totalVolume.toFixed(2)} ETH</p>
          <p className="text-sm text-blue-500">{formatUSD(totalVolume)}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Total Fees</h3>
          <p className="text-3xl font-bold text-green-600">{totalFees.toFixed(2)} ETH</p>
          <p className="text-sm text-green-500">{formatUSD(totalFees)}</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Total Pools</h3>
          <p className="text-3xl font-bold text-purple-600">{totalPools}</p>
        </div>

        <EthPriceCard price={ethPrice} />
      </div>

      {currentData.pools && <PoolsList pools={currentData.pools} />}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Factory Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Factory ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pools</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transactions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fees</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.factories.map((factory: Factory) => (
                <tr key={factory.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {factory.id.slice(0, 8)}...{factory.id.slice(-6)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {factory.poolCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {factory.txCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{parseFloat(factory.totalVolumeETH).toFixed(2)} ETH</div>
                    <div className="text-xs text-gray-400">{formatUSD(parseFloat(factory.totalVolumeETH))}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{parseFloat(factory.totalFeesETH).toFixed(2)} ETH</div>
                    <div className="text-xs text-gray-400">{formatUSD(parseFloat(factory.totalFeesETH))}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard; 