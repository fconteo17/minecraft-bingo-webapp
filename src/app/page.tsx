"use client";
import { useEffect, useState } from 'react';
import { Game } from '@/types/game';
import GamePageClient from './games/[gameId]/GamePageClient';
import GameInfo from '@/components/GameInfo';
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

export default function HomePage() {
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
    loadGames();
    const interval = setInterval(loadGames, 5000);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">No Live Game</h1>
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mt-8">Game History</h2>
        {gameHistory.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`} className="block mb-4">
            <GameInfo game={game} />
          </Link>
        ))}
      </div>
    </main>
  );
}
