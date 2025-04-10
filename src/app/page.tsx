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

  useEffect(() => {
    // Update visibility state based on the presence of a live game.
    if (liveGame) {
      setIsLiveGameVisible(true);
    } else {
      setIsLiveGameVisible(false);
    }
  }, [liveGame]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero section - only show when no live game */}
      {!isLiveGameVisible && (
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Minecraft Bingo
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            A multiplayer game where teams or players compete to complete tasks in Minecraft.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {/* Live game section */}
        <div className={`${isLiveGameVisible && liveGame ? 'live-game-visible' : 'live-game-hidden'}`}>
          {isLiveGameVisible && liveGame && (
            <div className="fade-in">
              <div className="glass-container p-4">
                <h2 className="text-xl font-bold mb-2 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 pulse"></span>
                  Live Game
                </h2>
                <GamePageClient game={liveGame} />
              </div>
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
    </div>
  );
}
