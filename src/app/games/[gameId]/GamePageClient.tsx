'use client';

import { Game } from '@/types/game';
import GameInfo from '../../../components/GameInfo';
import QuestGrid from '../../../components/QuestGrid';
import { useState, useEffect } from 'react';

interface GamePageClientProps {
  game: Game;
}

export default function GamePageClient({ game: initialGame }: GamePageClientProps) {
  const [game, setGame] = useState(initialGame);

  // Fetch full game state periodically
  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await fetch(`/api/games/${game.id}`);
        const updatedGame = await response.json();
        setGame(updatedGame);
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    const interval = setInterval(fetchGameState, 2000);
    return () => clearInterval(interval);
  }, [game.id]);

  const handleQuestUpdate = (updatedQuests: Game['quests']) => {
    setGame((prevGame) => {
      // Create a new completed quests object based on game type
      const completedQuests: Record<string, string[]> = {};

      if (prevGame.gameType === 'Teams' && prevGame.teams) {
        // For team games, initialize with team names
        completedQuests[prevGame.teams[0]] = [];
        completedQuests[prevGame.teams[1]] = [];
      } else if (prevGame.gameType === 'Solo' && prevGame.players) {
        // For solo games, initialize with player names
        prevGame.players.forEach((player) => {
          completedQuests[player] = [];
        });
      }

      // Populate completed quests
      updatedQuests.forEach((quest) => {
        if (quest.completedBy) {
          const questName =
            typeof quest.name === 'object' && quest.name !== null && 'name' in quest.name
              ? (quest.name as { name: string }).name
              : quest.name;

          if (!completedQuests[quest.completedBy]) {
            completedQuests[quest.completedBy] = [];
          }

          completedQuests[quest.completedBy].push(questName);
        }
      });

      return {
        ...prevGame,
        quests: updatedQuests,
        completedQuests,
      };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-1 bg-cursor-gray-900/40 border border-cursor-gray-800 rounded-lg p-4">
        <GameInfo game={game} />
      </div>
      
      <div className="md:col-span-4 bg-cursor-gray-900/40 border border-cursor-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Quest Board</h3>
        <QuestGrid
          quests={game.quests}
          gameId={game.id}
          gameType={game.gameType}
          players={game.players}
          winner={game.winner}
          onUpdate={handleQuestUpdate}
        />
      </div>
    </div>
  );
}
