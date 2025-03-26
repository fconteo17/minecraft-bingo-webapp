import { Quest, TeamName } from '@/types/game';
import { useEffect } from 'react';

interface QuestGridProps {
  quests: Quest[];
  gameId: string;
  onUpdate: (quests: Quest[]) => void;
}

const getQuestStyles = (completedBy?: TeamName) => {
  switch (completedBy) {
    case 'Red':
      return 'bg-red-900/50 border-red-600 text-red-100';
    case 'Blue':
      return 'bg-blue-900/50 border-blue-600 text-blue-100';
    default:
      return 'bg-gray-800 border-gray-700 text-gray-100';
  }
};

const getTextStyles = (completedBy?: TeamName) => {
  switch (completedBy) {
    case 'Red':
      return 'text-red-300';
    case 'Blue':
      return 'text-blue-300';
    default:
      return 'text-gray-400';
  }
};

export default function QuestGrid({ quests, gameId, onUpdate }: QuestGridProps) {
  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await fetch(`/api/games/${gameId}`);
        const game = await response.json();
        if (game.quests) {
          onUpdate(game.quests);
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    const interval = setInterval(fetchGameState, 2000); // Poll every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [gameId, onUpdate]);

  return (
    <div className="grid grid-cols-5 gap-3 p-4 max-w-6xl mx-auto">
      {quests.map((quest, index) => (
        <div
          key={`${quest.name}-${index}`}
          className={`
            p-3 rounded-lg border
            ${getQuestStyles(quest.completedBy)}
            transition-colors duration-200
            h-28 flex flex-col justify-between
          `}
        >
          <h3 className="font-medium text-base leading-tight min-h-[2.5rem]">
            {typeof quest.name === 'object' && quest.name !== null && 'name' in quest.name 
              ? (quest.name as { name: string }).name 
              : quest.name}
          </h3>
          {quest.completedBy && (
            <div className="text-sm">
              <p className={`${getTextStyles(quest.completedBy)} truncate`}>
                By: {quest.completedByPlayer}
              </p>
              <p className={quest.completedBy === 'Red' ? 'text-red-400' : 'text-blue-400'}>
                Team: {quest.completedBy}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 