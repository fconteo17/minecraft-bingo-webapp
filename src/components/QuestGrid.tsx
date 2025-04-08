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

// Define a set of colors for solo players
const playerColors = [
  {
    bg: 'bg-purple-900/50',
    border: 'border-purple-600',
    text: 'text-purple-100',
    highlight: 'text-purple-300',
  },
  // Remove green from regular colors since it's reserved for the winner
  {
    bg: 'bg-yellow-900/50',
    border: 'border-yellow-600',
    text: 'text-yellow-100',
    highlight: 'text-yellow-300',
  },
  {
    bg: 'bg-pink-900/50',
    border: 'border-pink-600',
    text: 'text-pink-100',
    highlight: 'text-pink-300',
  },
  {
    bg: 'bg-indigo-900/50',
    border: 'border-indigo-600',
    text: 'text-indigo-100',
    highlight: 'text-indigo-300',
  },
  {
    bg: 'bg-teal-900/50',
    border: 'border-teal-600',
    text: 'text-teal-100',
    highlight: 'text-teal-300',
  },
  {
    bg: 'bg-orange-900/50',
    border: 'border-orange-600',
    text: 'text-orange-100',
    highlight: 'text-orange-300',
  },
  {
    bg: 'bg-cyan-900/50',
    border: 'border-cyan-600',
    text: 'text-cyan-100',
    highlight: 'text-cyan-300',
  },
  {
    bg: 'bg-lime-900/50',
    border: 'border-lime-600',
    text: 'text-lime-100',
    highlight: 'text-lime-300',
  },
  {
    bg: 'bg-emerald-900/50',
    border: 'border-emerald-600',
    text: 'text-emerald-100',
    highlight: 'text-emerald-300',
  },
];

// Winner color - exclusive for the winner
const winnerColor = {
  bg: 'bg-green-900/50',
  border: 'border-green-600',
  text: 'text-green-100',
  highlight: 'text-green-300',
};

// Map player names to colors (for consistent coloring)
const getPlayerColorIndex = (playerName: string, allPlayers?: string[]) => {
  if (!allPlayers || allPlayers.length === 0) {
    // Fallback to hash function if player list not provided
    return (
      playerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % playerColors.length
    );
  }

  // Find the index of the player in the players array
  const playerIndex = allPlayers.indexOf(playerName);

  // If player is found in the array, use their position to determine color
  if (playerIndex !== -1) {
    // Ensure we don't exceed available colors
    return playerIndex % playerColors.length;
  }

  // Fallback to hash function
  return (
    playerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % playerColors.length
  );
};

const getQuestStyles = (
  completedBy?: string,
  gameType?: Game['gameType'],
  players?: string[],
  winner?: string,
) => {
  if (!completedBy) {
    return 'bg-gray-800 border-gray-700 text-gray-100';
  }

  if (gameType === 'Teams') {
    switch (completedBy) {
      case 'Red':
        return 'bg-red-900/50 border-red-600 text-red-100';
      case 'Blue':
        return 'bg-blue-900/50 border-blue-600 text-blue-100';
      default:
        return 'bg-gray-800 border-gray-700 text-gray-100';
    }
  } else if (gameType === 'Solo' && players?.includes(completedBy)) {
    // For solo games, use winner color if completed by winner, otherwise player color
    if (winner && completedBy === winner) {
      return `${winnerColor.bg} ${winnerColor.border} ${winnerColor.text}`;
    } else {
      const colorIndex = getPlayerColorIndex(completedBy, players);
      const color = playerColors[colorIndex];
      return `${color.bg} ${color.border} ${color.text}`;
    }
  }

  return 'bg-gray-800 border-gray-700 text-gray-100';
};

const getTextStyles = (
  completedBy?: string,
  gameType?: Game['gameType'],
  players?: string[],
  winner?: string,
) => {
  if (!completedBy) {
    return 'text-gray-400';
  }

  if (gameType === 'Teams') {
    switch (completedBy) {
      case 'Red':
        return 'text-red-300';
      case 'Blue':
        return 'text-blue-300';
      default:
        return 'text-gray-400';
    }
  } else if (gameType === 'Solo' && players?.includes(completedBy)) {
    // For solo games, use winner color if completed by winner, otherwise player color
    if (winner && completedBy === winner) {
      return winnerColor.highlight;
    } else {
      const colorIndex = getPlayerColorIndex(completedBy, players);
      return playerColors[colorIndex].highlight;
    }
  }

  return 'text-gray-400';
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
    <div className="grid grid-cols-5 gap-3 p-4 max-w-6xl mx-auto">
      {quests.map((quest, index) => {
        const questName =
          typeof quest.name === 'object' && quest.name !== null && 'name' in quest.name
            ? quest.name.name
            : quest.name;

        return (
          <div
            key={`${questName}-${index}`}
            className={`
              p-3 rounded-lg border
              ${getQuestStyles(quest.completedBy, gameType, players, winner)}
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
                <p
                  className={`${getTextStyles(quest.completedBy, gameType, players, winner)} truncate`}
                >
                  By: {quest.completedByPlayer}
                </p>
                {gameType === 'Teams' && (
                  <p className={quest.completedBy === 'Red' ? 'text-red-400' : 'text-blue-400'}>
                    Team: {quest.completedBy}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
