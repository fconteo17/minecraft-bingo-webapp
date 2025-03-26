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
    setGame(prevGame => {
      // Create a new completed quests object based on game type
      const completedQuests: Record<string, string[]> = {};
      
      if (prevGame.gameType === 'Teams' && prevGame.teams) {
        // For team games, initialize with team names
        completedQuests[prevGame.teams[0]] = [];
        completedQuests[prevGame.teams[1]] = [];
      } else if (prevGame.gameType === 'Solo' && prevGame.players) {
        // For solo games, initialize with player names
        prevGame.players.forEach(player => {
          completedQuests[player] = [];
        });
      }

      // Populate completed quests
      updatedQuests.forEach(quest => {
        if (quest.completedBy) {
          const questName = typeof quest.name === 'object' && quest.name !== null && 'name' in quest.name
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
        completedQuests
      };
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <GameInfo game={game} />
      <QuestGrid 
        quests={game.quests} 
        gameId={game.id}
        gameType={game.gameType}
        players={game.players}
        onUpdate={handleQuestUpdate}
      />
    </main>
  );
} 