'use client';

import { useEffect, useState } from 'react';
import { 
  ChartBarIcon, 
  UsersIcon, 
  ClockIcon, 
  ArrowTrendingUpIcon,
  DocumentChartBarIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  averageSessionTime: string;
  dataPointsCollected: number;
  dataAccuracy: number;
  lastUpdate: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    averageSessionTime: '0m',
    dataPointsCollected: 0,
    dataAccuracy: 0,
    lastUpdate: new Date().toLocaleString()
  });

  useEffect(() => {
    // Aquí iría la llamada a la API para obtener las estadísticas reales
    // Por ahora usamos datos de ejemplo
    setStats({
      totalUsers: 1234,
      activeUsers: 567,
      averageSessionTime: '45m',
      dataPointsCollected: 987654,
      dataAccuracy: 99.8,
      lastUpdate: new Date().toLocaleString()
    });
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Sección de Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Usuarios Totales
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.totalUsers.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tiempo Promedio de Sesión
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.averageSessionTime}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentChartBarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Puntos de Datos Recolectados
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.dataPointsCollected.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Gráficos y Análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Tendencias de Datos
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Gráfico de Tendencias</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Distribución de Datos
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Gráfico de Distribución</p>
          </div>
        </div>
      </div>

      {/* Sección de Métricas Secundarias */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Precisión de Datos
          </h3>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full" 
                  style={{ width: `${stats.dataAccuracy}%` }}
                />
              </div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-900">
              {stats.dataAccuracy}%
            </span>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Última Actualización
          </h3>
          <p className="text-gray-600">
            {stats.lastUpdate}
          </p>
        </div>
      </div>
    </main>
  );
} 