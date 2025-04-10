'use client';
import { useEffect, useState } from 'react';
import { Game } from '@/types/game';
import GameInfo from '@/components/GameInfo';
import GamePageClient from '../games/[gameId]/GamePageClient';
import Link from 'next/link';

async function fetchLiveGame(): Promise<Game | null> {
  const res = await fetch('/api/games/live');
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.game || null;
}

async function fetchGameHistory(): Promise<Game[]> {
  const res = await fetch('/api/games');
  if (!res.ok) {
    throw new Error('Failed to fetch game history');
  }
  return res.json();
}

export default function LivePage() {
  const [liveGame, setLiveGame] = useState<Game | null>(null);
  const [gameHistory, setGameHistory] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      const live = await fetchLiveGame();
      setLiveGame(live);
      const history = await fetchGameHistory();
      setGameHistory(history);
      setIsLoading(false);
    };

    // Handle the initial load
    loadGames().catch((error) => {
      console.error('Error loading games:', error);
      setIsLoading(false);
    });

    // Set up the interval
    const interval = setInterval(() => {
      loadGames().catch((error) => {
        console.error('Error loading games:', error);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Live game section */}
        <div>
          {liveGame ? (
            <div className="glass-container p-4">
              <h2 className="text-xl font-bold mb-2 flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 pulse"></span>
                Live Game
              </h2>
              <GamePageClient game={liveGame} />
            </div>
          ) : (
            <div className="glass-container p-4 text-center">
              <p className="text-blue-200">No live game at the moment.</p>
            </div>
          )}
        </div>

        {/* Game history section */}
        <div>
          <div className="glass-container p-4">
            <h2 className="text-xl font-bold mb-4">Game History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameHistory.length > 0 ? (
                gameHistory.map((game) => (
                  <Link key={game.id} href={`/games/${game.id}`} className="cursor-card group">
                    <div className="p-4">
                      <GameInfo game={game} />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-blue-200">No games found. Start a new game!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
