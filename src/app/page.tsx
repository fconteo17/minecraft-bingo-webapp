'use client';
import { useEffect, useState } from 'react';
import { Game } from '@/types/game';
import GamePageClient from './games/[gameId]/GamePageClient';
import GameInfo from '@/components/GameInfo';
import Link from 'next/link';

// Main component for the home page, displaying live game and game history.

async function fetchLiveGame(): Promise<Game | null> {
  try {
    const res = await fetch('/api/games/live');
    if (!res.ok) {
      console.error('Failed to fetch live game:', res.statusText);
      return null;
    }
    const data = await res.json();
    return data.game || null;
  } catch (error) {
    console.error('Error fetching live game:', error);
    return null;
  }
}

async function fetchGameHistory(): Promise<Game[]> {
  const res = await fetch('/api/games');
  if (!res.ok) {
    throw new Error('Failed to fetch game history');
  }
  return res.json();
}

export default function HomePage() {
  // State variables to manage live game, game history, loading state, and visibility.
  const [liveGame, setLiveGame] = useState<Game | null>(null);
  const [gameHistory, setGameHistory] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveGameVisible, setIsLiveGameVisible] = useState(false);

  useEffect(() => {
    // Function to load live game and game history data.
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
    // Set interval to refresh game data every 5 seconds.
    const interval = setInterval(loadGames, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update visibility state based on the presence of a live game.
    if (liveGame) {
      setIsLiveGameVisible(true);
    } else {
      setIsLiveGameVisible(false);
    }
  }, [liveGame]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div
        className={`live-game-container ${isLiveGameVisible && liveGame ? 'live-game-visible' : 'live-game-hidden'}`}
      >
        {isLiveGameVisible && liveGame && (
          <div className="fade-in">
            <GamePageClient game={liveGame} />
          </div>
        )}
      </div>
      <div className="fade-in">
        <h2 className="text-2xl font-bold text-gray-100 mt-8">Game History</h2>
        {gameHistory.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`} className="block mb-4 fade-in">
            <GameInfo game={game} />
          </Link>
        ))}
      </div>
    </main>
  );
}
