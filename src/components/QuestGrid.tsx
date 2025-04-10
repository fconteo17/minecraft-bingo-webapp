import { Quest, Game } from '@/types/game';
import { useEffect, useState, useCallback } from 'react';

interface QuestGridProps {
  quests: Quest[];
  gameId: string;
  gameType: Game['gameType'];
  players?: string[];
  winner?: string;
  onUpdate: (quests: Quest[]) => void;
}

// Define player colors with cursor.com theme to match GameInfo
const playerColors = [
  {
    bg: 'bg-indigo-500/20',
    border: 'border-indigo-500/50',
    text: 'text-indigo-400',
    highlight: 'text-indigo-400',
  },
  {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    text: 'text-yellow-400',
    highlight: 'text-yellow-400',
  },
  {
    bg: 'bg-pink-500/20',
    border: 'border-pink-500/50',
    text: 'text-pink-400',
    highlight: 'text-pink-400',
  },
  {
    bg: 'bg-teal-500/20',
    border: 'border-teal-500/50',
    text: 'text-teal-400',
    highlight: 'text-teal-400',
  },
  {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/50',
    text: 'text-orange-400',
    highlight: 'text-orange-400',
  },
  {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/50',
    text: 'text-cyan-400',
    highlight: 'text-cyan-400',
  },
];

// Winner color - exclusive for the winner
const winnerColor = {
  bg: 'bg-green-500/20',
  border: 'border-green-500/50',
  text: 'text-green-500',
  highlight: 'text-green-500',
};

// Map player names to colors (for consistent coloring)
const getPlayerColorIndex = (playerName: string, allPlayers?: string[]) => {
  // Use a hard-coded method for solo players to ensure consistent colors
  if (allPlayers && allPlayers.length > 0) {
    // Get the player's position in the array
    const playerIndex = allPlayers.indexOf(playerName);

    if (playerIndex !== -1) {
      // Use modulo to cycle through available colors if needed
      return playerIndex % playerColors.length;
    }
  }

  // Fallback to hash function if position method doesn't work
  const hashCode = playerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return hashCode % playerColors.length;
};

const getQuestStyles = (
  completedBy?: string,
  gameType?: Game['gameType'],
  players?: string[],
  winner?: string,
) => {
  if (!completedBy) {
    return 'bg-cursor-gray-800/50 border-cursor-gray-700 text-cursor-gray-100';
  }

  if (gameType === 'Teams') {
    switch (completedBy) {
      case 'Red':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'Blue':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      default:
        return 'bg-cursor-gray-800/50 border-cursor-gray-700 text-cursor-gray-100';
    }
  } else if (gameType === 'Solo' && players?.includes(completedBy)) {
    // For solo games, use winner color if completed by winner, otherwise player color
    if (winner && completedBy === winner) {
      return `${winnerColor.bg} ${winnerColor.border} ${winnerColor.text}`;
    } else {
      // Get player color index
      const colorIndex = getPlayerColorIndex(completedBy, players);
      // Ensure index is valid before accessing playerColors array
      const color = playerColors[colorIndex % playerColors.length];

      // Apply color, or default color if undefined
      return color
        ? `${color.bg} ${color.border} ${color.text}`
        : 'bg-cursor-gray-800/50 border-cursor-gray-700 text-cursor-gray-100';
    }
  }

  return 'bg-cursor-gray-800/50 border-cursor-gray-700 text-cursor-gray-100';
};

const getTextStyles = (
  completedBy?: string,
  gameType?: Game['gameType'],
  players?: string[],
  winner?: string,
) => {
  if (!completedBy) {
    return 'text-cursor-gray-400';
  }

  if (gameType === 'Teams') {
    switch (completedBy) {
      case 'Red':
        return 'text-red-400';
      case 'Blue':
        return 'text-blue-400';
      default:
        return 'text-cursor-gray-400';
    }
  } else if (gameType === 'Solo' && players?.includes(completedBy)) {
    // For solo games, use winner color if completed by winner, otherwise player color
    if (winner && completedBy === winner) {
      return winnerColor.highlight;
    } else {
      // Get player color index
      const colorIndex = getPlayerColorIndex(completedBy, players);
      // Ensure index is valid before accessing playerColors array
      const color = playerColors[colorIndex % playerColors.length];

      // Return the highlight color or default if undefined
      return color ? color.highlight : 'text-cursor-gray-400';
    }
  }

  return 'text-cursor-gray-400';
};

export default function QuestGrid({
  quests,
  gameId,
  gameType,
  players,
  winner,
  onUpdate,
}: QuestGridProps) {
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
          newQuestName,
        }),
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
    <div className="grid grid-cols-5 gap-3 p-2 max-w-5xl mx-auto">
      {quests.map((quest, index) => {
        const questName =
          typeof quest.name === 'object' && quest.name !== null && 'name' in quest.name
            ? quest.name.name
            : quest.name;

        return (
          <div
            key={`${questName}-${index}`}
            className={`
              p-3 rounded-md border
              ${getQuestStyles(quest.completedBy, gameType, players, winner)}
              transition-colors duration-200 shadow-sm
              h-28 flex flex-col justify-between relative
            `}
            onDoubleClick={() => handleDoubleClick(questName)}
          >
            {editingQuest === questName ? (
              <div className="absolute inset-0 bg-cursor-gray-900/90 p-2 flex flex-col">
                <input
                  type="text"
                  value={newQuestName}
                  onChange={(e) => setNewQuestName(e.target.value)}
                  className="p-2 text-sm bg-cursor-gray-800 border border-cursor-gray-700 rounded-md text-cursor-gray-100 focus:border-cursor-blue-500 focus:outline-none focus:ring-1 focus:ring-cursor-blue-500"
                  autoFocus
                  onBlur={() => handleSubmit(questName)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(questName);
                    } else if (e.key === 'Escape') {
                      setEditingQuest(null);
                    }
                  }}
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => setEditingQuest(null)}
                    className="px-2 py-1 text-sm bg-cursor-gray-800 text-cursor-gray-300 rounded-md hover:bg-cursor-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSubmit(questName)}
                    className="px-2 py-1 text-sm bg-cursor-blue-600 text-white rounded-md hover:bg-cursor-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium leading-tight max-w-[80%]">{questName}</h3>
                  {quest.completedBy && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full bg-opacity-20 ${
                        winner && quest.completedBy === winner
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-cursor-gray-700 ' +
                            getTextStyles(quest.completedBy, gameType, players, winner)
                      }`}
                    >
                      {quest.completedBy}
                    </span>
                  )}
                </div>
                {quest.completedBy && (
                  <p
                    className={`text-sm mt-1 ${getTextStyles(quest.completedBy, gameType, players, winner)}`}
                  >
                    Completed
                  </p>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
