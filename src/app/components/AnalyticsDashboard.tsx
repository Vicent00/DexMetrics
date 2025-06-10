'use client';

import React, { useState, useEffect } from 'react';
import { mockAnalyticsData } from '../mock/analytics';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive = true }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <span className={`ml-2 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
    </div>
  </div>
);

const formatNumber = (num: number, isCurrency: boolean = true) => {
  if (num >= 1e9) {
    return `${isCurrency ? '$' : ''}${(num / 1e9).toFixed(1)}B`;
  }
  if (num >= 1e6) {
    return `${isCurrency ? '$' : ''}${(num / 1e6).toFixed(1)}M`;
  }
  if (num >= 1e3) {
    return `${isCurrency ? '$' : ''}${(num / 1e3).toFixed(1)}K`;
  }
  return `${isCurrency ? '$' : ''}${num.toFixed(2)}`;
};

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState(mockAnalyticsData);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular pequeños cambios en los datos
      const newData = {
        ...data,
        metrics: {
          ...data.metrics,
          tvl: {
            ...data.metrics.tvl,
            value: data.metrics.tvl.value * (1 + (Math.random() * 0.02 - 0.01)),
            change: data.metrics.tvl.change + (Math.random() * 0.4 - 0.2)
          },
          volume: {
            ...data.metrics.volume,
            value: data.metrics.volume.value * (1 + (Math.random() * 0.02 - 0.01)),
            change: data.metrics.volume.change + (Math.random() * 0.4 - 0.2)
          }
        }
      };
      setData(newData);
      setLastUpdate(new Date());
    }, 5000); // Actualizar cada 5 segundos

    return () => clearInterval(interval);
  }, [data]);

  const metrics = [
    {
      title: "Total Value Locked (TVL)",
      value: formatNumber(data.metrics.tvl.value),
      change: `${data.metrics.tvl.change > 0 ? '+' : ''}${data.metrics.tvl.change.toFixed(1)}%`,
      isPositive: data.metrics.tvl.change >= 0
    },
    {
      title: "24h Volume",
      value: formatNumber(data.metrics.volume.value),
      change: `${data.metrics.volume.change > 0 ? '+' : ''}${data.metrics.volume.change.toFixed(1)}%`,
      isPositive: data.metrics.volume.change >= 0
    },
    {
      title: "Active Users",
      value: formatNumber(data.metrics.users.value, false),
      change: `${data.metrics.users.change > 0 ? '+' : ''}${data.metrics.users.change.toFixed(1)}%`,
      isPositive: data.metrics.users.change >= 0
    },
    {
      title: "Transaction Count",
      value: formatNumber(data.metrics.transactions.value, false),
      change: `${data.metrics.transactions.change > 0 ? '+' : ''}${data.metrics.transactions.change.toFixed(1)}%`,
      isPositive: data.metrics.transactions.change >= 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Volume Over Time</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Volume chart will be displayed here</p>
          </div>
        </div>

        {/* TVL Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">TVL Distribution</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">TVL distribution chart will be displayed here</p>
          </div>
        </div>

        {/* Top Pools */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Pools by Volume</h3>
          <div className="space-y-4">
            {data.topPools.map((pool, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="font-medium text-gray-900">{pool.pair}</span>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{formatNumber(pool.volume)}</p>
                  <p className="text-xs text-gray-500">TVL: {formatNumber(pool.tvl)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tokens */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Tokens by Volume</h3>
          <div className="space-y-4">
            {data.topTokens.map((token, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="font-medium text-gray-900">{token.token}</span>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{formatNumber(token.volume)}</p>
                  <p className="text-xs text-gray-500">Price: {formatNumber(token.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-right text-sm text-gray-500">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 