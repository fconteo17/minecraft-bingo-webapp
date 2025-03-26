import { Quest, TeamName } from '@/types/game';
import { useEffect, useState, useCallback } from 'react';

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
  const [editingQuest, setEditingQuest] = useState<string | null>(null);
  const [newQuestName, setNewQuestName] = useState('');

  const fetchGameState = useCallback(async () => {
    try {
      const response = await fetch(`/api/games/${gameId}`);
      const game = await response.json();
      if (game.quests) {
        onUpdate(game.quests);
      }
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  }, [gameId, onUpdate]);

  const handleQuestUpdate = async (questName: string, newQuestName: string) => {
    try {
      const response = await fetch(`/api/games/${gameId}/updateQuest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId,
          questName,
          newQuestName
        })
      });

      if (response.ok) {
        await fetchGameState();
      } else {
        console.error('Failed to update quest:', await response.json());
      }
    } catch (error) {
      console.error('Error updating quest:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchGameState, 2000);
    return () => clearInterval(interval);
  }, [fetchGameState]);

  const handleDoubleClick = (questName: string) => {
    setEditingQuest(questName);
    setNewQuestName(questName);
  };

  const handleSubmit = async (oldQuestName: string) => {
    if (newQuestName && newQuestName !== oldQuestName) {
      await handleQuestUpdate(oldQuestName, newQuestName);
    }
    setEditingQuest(null);
  };

  return (
    <div className="grid grid-cols-5 gap-3 p-4 max-w-6xl mx-auto">
      {quests.map((quest, index) => {
        const questName = typeof quest.name === 'object' && quest.name !== null && 'name' in quest.name 
          ? quest.name.name 
          : quest.name;

        return (
          <div
            key={`${questName}-${index}`}
            className={`
              p-3 rounded-lg border
              ${getQuestStyles(quest.completedBy)}
              transition-colors duration-200
              h-28 flex flex-col justify-between
            `}
          >
            <h3 
              className="font-medium text-base leading-tight min-h-[2.5rem]"
              onDoubleClick={() => handleDoubleClick(questName)}
            >
              {editingQuest === questName ? (
                <input
                  type="text"
                  value={newQuestName}
                  onChange={(e) => setNewQuestName(e.target.value)}
                  onBlur={() => handleSubmit(questName)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(questName)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                  autoFocus
                />
              ) : (
                questName
              )}
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
        );
      })}
    </div>
  );
} 