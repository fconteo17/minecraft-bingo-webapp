'use client';
import { useEffect, useState } from 'react';
import { Game } from '@/types/game';
import GameInfo from '@/components/GameInfo';
import GamePageClient from '../games/[gameId]/GamePageClient';

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
      if (!live) {
        const history = await fetchGameHistory();
        setGameHistory(history);
      }
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
      {liveGame ? (
        <GamePageClient game={liveGame} />
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Game History</h1>
          {gameHistory.map((game) => (
            <GameInfo key={game.id} game={game} />
          ))}
        </div>
      )}
    </main>
  );
}
