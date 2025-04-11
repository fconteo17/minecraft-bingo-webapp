'use client';

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

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

type SortField =
  | 'name'
  | 'totalAppearances'
  | 'totalCompletions'
  | 'completionPercentage'
  | 'averageTimeMs'
  | 'fastestTimeMs'
  | 'slowestTimeMs';
type SortDirection = 'asc' | 'desc';

export default function StatisticsPage() {
  const [stats, setStats] = useState<QuestStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedStats = () => {
    return [...stats].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'totalAppearances':
          comparison = a.totalAppearances - b.totalAppearances;
          break;
        case 'totalCompletions':
          comparison = a.totalCompletions - b.totalCompletions;
          break;
        case 'completionPercentage':
          comparison = a.completionPercentage - b.completionPercentage;
          break;
        case 'averageTimeMs':
          comparison = a.averageTimeMs - b.averageTimeMs;
          break;
        case 'fastestTimeMs':
          comparison = a.fastestTimeMs - b.fastestTimeMs;
          break;
        case 'slowestTimeMs':
          comparison = a.slowestTimeMs - b.slowestTimeMs;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className="inline-block ml-1 text-blue-300 opacity-50 align-middle">↕</span>;
    }
    return sortDirection === 'asc' ? (
      <span className="inline-block ml-1 text-blue-300 align-middle">↑</span>
    ) : (
      <span className="inline-block ml-1 text-blue-300 align-middle">↓</span>
    );
  };

  const handleExportToExcel = () => {
    // Prepare data for export
    const exportData = stats.map((stat) => ({
      'Quest Name': stat.name,
      Appearances: stat.totalAppearances,
      Completions: stat.totalCompletions,
      'Completion %': `${stat.completionPercentage.toFixed(1)}%`,
      'Average Time (seconds)': (stat.averageTimeMs / 1000).toFixed(1),
      'Fastest Time (seconds)': (stat.fastestTimeMs / 1000).toFixed(1),
      'Slowest Time (seconds)': (stat.slowestTimeMs / 1000).toFixed(1),
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Quest Statistics');

    // Generate Excel file
    XLSX.writeFile(wb, 'minecraft-bingo-statistics.xlsx');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Loading statistics...
          </h1>
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

  const sortedStats = getSortedStats();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[95%] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Quest Completion Statistics
          </h1>
          <div className="flex gap-4">
            <button onClick={handleExportToExcel} className="btn-secondary">
              Export to Excel
            </button>
            <button onClick={fetchStats} disabled={loading} className="btn-primary">
              {loading ? 'Refreshing...' : 'Refresh Statistics'}
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 shadow overflow-hidden sm:rounded-lg border border-blue-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-800/50">
              <thead className="bg-blue-900/20">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider cursor-pointer hover:text-blue-100 transition-colors duration-200"
                    onClick={() => handleSort('name')}
                  >
                    <span className="inline-flex items-center">
                      Quest Name {getSortIcon('name')}
                    </span>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider cursor-pointer hover:text-blue-100 transition-colors duration-200"
                    onClick={() => handleSort('totalAppearances')}
                  >
                    <span className="inline-flex items-center">
                      Appearances {getSortIcon('totalAppearances')}
                    </span>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider cursor-pointer hover:text-blue-100 transition-colors duration-200"
                    onClick={() => handleSort('totalCompletions')}
                  >
                    <span className="inline-flex items-center">
                      Completions {getSortIcon('totalCompletions')}
                    </span>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider cursor-pointer hover:text-blue-100 transition-colors duration-200 whitespace-nowrap"
                    onClick={() => handleSort('completionPercentage')}
                  >
                    <span className="inline-flex items-center">
                      Completion % {getSortIcon('completionPercentage')}
                    </span>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider cursor-pointer hover:text-blue-100 transition-colors duration-200 whitespace-nowrap"
                    onClick={() => handleSort('averageTimeMs')}
                  >
                    <span className="inline-flex items-center">
                      Average Time {getSortIcon('averageTimeMs')}
                    </span>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider cursor-pointer hover:text-blue-100 transition-colors duration-200 whitespace-nowrap"
                    onClick={() => handleSort('fastestTimeMs')}
                  >
                    <span className="inline-flex items-center">
                      Fastest Time {getSortIcon('fastestTimeMs')}
                    </span>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-blue-200 uppercase tracking-wider cursor-pointer hover:text-blue-100 transition-colors duration-200 whitespace-nowrap"
                    onClick={() => handleSort('slowestTimeMs')}
                  >
                    <span className="inline-flex items-center">
                      Slowest Time {getSortIcon('slowestTimeMs')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900/50 divide-y divide-blue-800/30">
                {sortedStats.map((stat) => (
                  <tr
                    key={stat.name}
                    className="hover:bg-blue-900/20 transition-colors duration-200"
                  >
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
                      <span
                        className={`${stat.completionPercentage >= 75 ? 'text-green-400' : stat.completionPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}
                      >
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
    </div>
  );
}
