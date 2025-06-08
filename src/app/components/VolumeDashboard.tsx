import React from 'react';
import EthPriceCard from './EthPriceCard';

interface VolumeData {
  factories: {
    id: string;
    poolCount: string;
    txCount: string;
    totalVolumeETH: string;
    totalFeesETH: string;
  }[];
  bundles: {
    ethPriceUSD: string;
  }[];
}

interface VolumeDashboardProps {
  data: VolumeData;
}

const VolumeDashboard: React.FC<VolumeDashboardProps> = ({ data }) => {
  const ethPrice = data.bundles[0]?.ethPriceUSD || '0';

  const totalVolume = data.factories.reduce((acc, factory) => {
    return acc + parseFloat(factory.totalVolumeETH);
  }, 0);

  const totalFees = data.factories.reduce((acc, factory) => {
    return acc + parseFloat(factory.totalFeesETH);
  }, 0);

  const totalPools = data.factories.reduce((acc, factory) => {
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
              {data.factories.map((factory) => (
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

export default VolumeDashboard; 