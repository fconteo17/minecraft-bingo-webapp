'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LiveGameButton() {
  const router = useRouter();
  const [liveGameId, setLiveGameId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveGame = async () => {
      try {
        const response = await fetch('/api/games/live');
        const data = await response.json();
        setLiveGameId(data.game?.id || null);
      } catch (error) {
        console.error('Error fetching live game:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveGame();
    // Poll for live game status every 5 seconds
    const interval = setInterval(fetchLiveGame, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <button
        disabled
        className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  if (!liveGameId) {
    return (
      <button
        onClick={() => router.push('/live')}
        className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        No Live Game
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push(`/games/${liveGameId}`)}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      Watch Live Game
    </button>
  );
} 