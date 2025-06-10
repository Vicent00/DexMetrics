'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

interface AnalyticsData {
  metrics: {
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
  };
  pools: Array<{
    id: string;
    pair: string;
    feeTier: string;
    tvl: number;
    volume: number;
  }>;
  factories: Array<{
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
  }>;
}

const COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#8B5CF6',
  warning: '#F59E0B',
  danger: '#EF4444',
  success: '#22C55E',
  info: '#06B6D4',
  dark: '#1F2937',
  light: '#F3F4F6'
};

const CHART_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.accent,
  COLORS.warning,
  COLORS.danger,
  COLORS.success,
  COLORS.info
];

const formatNumber = (value: number): string => {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

const formatDate = (timestamp: number): string => {
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'N/A';
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {formatNumber(entry.value)}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const MetricCard = ({ title, value, change, isPositive }: { title: string; value: string; change: number; isPositive: boolean }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    <p className={`text-sm font-medium mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
    </p>
  </div>
);

const AnalyticsStats: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/analytics?timeRange=${timeRange}`);
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-500 font-medium">{error}</p>
          <p className="text-gray-600 mt-2">Por favor, intenta recargar la página</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600">No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  // Preparar datos para los gráficos
  const poolData = data.pools.slice(0, 5).map(pool => ({
    name: pool.pair,
    value: pool.tvl,
    volume: pool.volume
  }));

  const volumeData = data.factories.map(factory => ({
    name: 'Factory ' + factory.id.slice(0, 6),
    volume: factory.volume.usd,
    fees: factory.fees.usd,
    tvl: factory.tvl
  }));

  const efficiencyData = data.pools.map(pool => ({
    name: pool.pair,
    tvl: pool.tvl,
    volume: pool.volume,
    efficiency: pool.volume / pool.tvl
  }));

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end space-x-2">
        {(['24h', '7d', '30d'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              timeRange === range
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Value Locked"
          value={formatNumber(data.metrics.totalTVL)}
          change={0}
          isPositive={true}
        />
        <MetricCard
          title="24h Volume"
          value={formatNumber(data.metrics.totalVolume.usd)}
          change={0}
          isPositive={true}
        />
        <MetricCard
          title="24h Fees"
          value={formatNumber(data.metrics.totalFees.usd)}
          change={0}
          isPositive={true}
        />
        <MetricCard
          title="Total Pools"
          value={data.metrics.totalPools.toString()}
          change={0}
          isPositive={true}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución de TVL por Pool */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900 mb-4">TVL Distribution by Pool</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={poolData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill={COLORS.primary}
                  dataKey="value"
                  animationDuration={1000}
                >
                  {poolData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volumen y Fees por Factory */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Volume & Fees by Factory</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={volumeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#666"
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => formatNumber(value)} 
                  stroke="#666"
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="volume" 
                  name="Volume" 
                  fill={COLORS.primary} 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
                <Bar 
                  dataKey="fees" 
                  name="Fees" 
                  fill={COLORS.secondary} 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Eficiencia de Pools */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pool Efficiency (Volume/TVL)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  dataKey="tvl" 
                  name="TVL" 
                  tickFormatter={(value) => formatNumber(value)}
                  stroke="#666"
                />
                <YAxis 
                  type="number" 
                  dataKey="volume" 
                  name="Volume" 
                  tickFormatter={(value) => formatNumber(value)}
                  stroke="#666"
                />
                <ZAxis 
                  type="number" 
                  dataKey="efficiency" 
                  range={[50, 400]} 
                  name="Efficiency" 
                />
                <Tooltip 
                  content={({ payload }) => {
                    if (payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
                          <p className="text-sm font-medium text-gray-900 mb-2">{data.name}</p>
                          <p className="text-sm text-gray-600">TVL: {formatNumber(data.tvl)}</p>
                          <p className="text-sm text-gray-600">Volume: {formatNumber(data.volume)}</p>
                          <p className="text-sm text-gray-600">Efficiency: {(data.efficiency * 100).toFixed(2)}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  data={efficiencyData} 
                  fill={COLORS.accent}
                  animationDuration={1000}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TVL vs Volume Trend */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900 mb-4">TVL vs Volume Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={volumeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#666"
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => formatNumber(value)} 
                  stroke="#666"
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  name="Volume" 
                  fill={COLORS.primary} 
                  stroke={COLORS.primary}
                  fillOpacity={0.3}
                  animationDuration={1000}
                />
                <Area 
                  type="monotone" 
                  dataKey="tvl" 
                  name="TVL" 
                  fill={COLORS.secondary} 
                  stroke={COLORS.secondary}
                  fillOpacity={0.3}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tablas de datos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Pools</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fee Tier</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">TVL</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.pools.map((pool) => (
                  <tr key={pool.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 py-2 text-sm text-gray-900">{pool.pair}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">{pool.feeTier}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{formatNumber(pool.tvl)}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{formatNumber(pool.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Factory Stats</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pools</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Transactions</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.factories.map((factory) => (
                  <tr key={factory.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 py-2 text-sm text-gray-900">{factory.poolCount}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{factory.txCount}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{formatNumber(factory.volume.usd)}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{formatNumber(factory.fees.usd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsStats; 