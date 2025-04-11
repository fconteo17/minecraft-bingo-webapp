'use client';

import { useEffect, useState } from 'react';

interface QuestStats {
  name: string;
  totalAppearances: number;
  totalCompletions: number;
  completionPercentage: number;
  averageTimeMs: number;
  averageTimeFormatted: string;
  fastestTimeMs: number;
  fastestTimeFormatted: string;
  slowestTimeMs: number;
  slowestTimeFormatted: string;
}

export default function StatisticsPage() {
  const [stats, setStats] = useState<QuestStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/statistics/quests');
      if (!response.ok) {
        setError(`Failed to fetch statistics: ${response.status} ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Loading statistics...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-red-400">Error: {error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Quest Completion Statistics</h1>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Refreshing...' : 'Refresh Statistics'}
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 shadow overflow-hidden sm:rounded-lg border border-blue-800">
          <table className="min-w-full divide-y divide-blue-800/50">
            <thead className="bg-blue-900/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Quest Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Appearances
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Completions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Completion %
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Average Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Fastest Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Slowest Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900/50 divide-y divide-blue-800/30">
              {stats.map((stat) => (
                <tr key={stat.name} className="hover:bg-blue-900/20 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-100">
                    {stat.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-200">
                    {stat.totalAppearances}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-200">
                    {stat.totalCompletions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className={`${stat.completionPercentage >= 75 ? 'text-green-400' : stat.completionPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {stat.completionPercentage.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-200">
                    {stat.averageTimeFormatted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-400">
                    {stat.fastestTimeFormatted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-400">
                    {stat.slowestTimeFormatted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 