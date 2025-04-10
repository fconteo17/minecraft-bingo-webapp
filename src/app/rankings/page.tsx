'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { PlayerRank } from '@/types/rank';

export default function RankingsPage() {
  const [rankings, setRankings] = useState<PlayerRank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      console.log('[Rankings] Starting to fetch rankings');
      try {
        console.log('[Rankings] Making API request');
        const response = await fetch('/api/rankings');
        console.log('[Rankings] API response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[Rankings] API error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
          });
          setError(`Failed to fetch rankings: ${response.status} ${response.statusText}`);
          return;
        }

        const data = await response.json();
        console.log('[Rankings] Received rankings data:', {
          count: data.length,
          sample: data.slice(0, 2), // Log first two rankings as sample
        });

        setRankings(data);
      } catch (err) {
        console.error('[Rankings] Error in fetchRankings:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        console.log('[Rankings] Finished fetching rankings');
        setLoading(false);
      }
    };

    fetchRankings().catch((error) => {
      console.error('[Rankings] Error in useEffect:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setLoading(false);
    });
  }, []);

  const getRankColor = (tier: string) => {
    const colors: Record<string, string> = {
      Potato: 'text-yellow-700',
      Coal: 'text-gray-400',
      Copper: 'text-orange-400',
      Ferro: 'text-zinc-400',
      Gold: 'text-yellow-400',
      Diamond: 'text-blue-400',
      Emerald: 'text-green-400',
      Netherite: 'text-purple-400',
      Dragon: 'text-red-400',
      'Nether Star': 'text-yellow-200',
    };
    return colors[tier] || 'text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Loading rankings...</h1>
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
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Player Rankings</h1>

        <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 shadow overflow-hidden sm:rounded-lg border border-blue-800">
          <table className="min-w-full divide-y divide-blue-800/50">
            <thead className="bg-blue-900/20">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider"
                >
                  Player
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider"
                >
                  MMR
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider"
                >
                  Tier
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider"
                >
                  Division
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-blue-800/50">
              {rankings.map((player, index) => (
                <tr key={player.playerId} className="hover:bg-blue-800/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {player.playerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                    {player.mmr}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-semibold ${getRankColor(player.tier)}`}>
                      {player.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                    {player.division || '-'}
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
