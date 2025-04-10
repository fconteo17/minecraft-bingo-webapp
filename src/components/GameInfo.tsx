import { Game } from '@/types/game';

interface GameInfoProps {
  game: Game;
}

// Define player colors with cursor.com theme
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

// Map player names to colors
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

// Component to display information about a game, including teams and winner.
export default function GameInfo({ game }: GameInfoProps) {
  // Destructure game data for easier access.
  const { id, timestamp, winner, teams, players, gameType, completedQuests } = game;

  // Format date more nicely
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Render functions for different game types
  const renderTeamGame = () => {
    if (!teams) return null;
    const team1Quests = completedQuests[teams[0]]?.length || 0;
    const team2Quests = completedQuests[teams[1]]?.length || 0;

    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Render team 1 information */}
        <div
          className={`px-4 py-3 rounded-md ${
            winner === teams[0]
              ? 'bg-green-500/20 border border-green-500/50'
              : 'bg-cursor-gray-800/50 border border-cursor-gray-700'
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-cursor-gray-100">{teams[0]}</h3>
            <p
              className={`text-sm ${winner === teams[0] ? 'text-green-500' : 'text-cursor-gray-400'}`}
            >
              {team1Quests} Quests
            </p>
          </div>
        </div>

        {/* Render team 2 information */}
        <div
          className={`px-4 py-3 rounded-md ${
            winner === teams[1]
              ? 'bg-green-500/20 border border-green-500/50'
              : 'bg-cursor-gray-800/50 border border-cursor-gray-700'
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-cursor-gray-100">{teams[1]}</h3>
            <p
              className={`text-sm ${winner === teams[1] ? 'text-green-500' : 'text-cursor-gray-400'}`}
            >
              {team2Quests} Quests
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderSoloGame = () => {
    if (!players) return null;
    return (
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-2">
          {players.map((player) => {
            const completedCount = completedQuests[player]?.length || 0;
            const isWinner = winner === player;

            // Use winner color for the winner, otherwise use player's assigned color
            let color;
            if (isWinner) {
              color = winnerColor;
            } else {
              // Get player color index
              const colorIndex = getPlayerColorIndex(player, players);
              // Ensure index is valid
              color = playerColors[colorIndex % playerColors.length];
            }

            // Apply a default color if somehow no color is found
            if (!color) {
              color = {
                bg: 'bg-cursor-gray-800/50',
                border: 'border-cursor-gray-700',
                text: 'text-cursor-gray-100',
                highlight: 'text-cursor-gray-400',
              };
            }

            return (
              <div
                key={player}
                className={`px-4 py-3 rounded-md border ${color.bg} ${color.border}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`font-medium ${color.text}`}>{player}</h3>
                  <div className="flex items-center">
                    <p className={`text-sm ${color.highlight}`}>{completedCount} Quests</p>
                    {isWinner && (
                      <span className="ml-2 text-xs bg-green-500/30 text-green-500 px-2 py-0.5 rounded-full">
                        Winner
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cursor-gray-400">
              Game #{id.slice(0, 6)}
            </span>
            <span className="text-xs px-2 py-0.5 bg-cursor-gray-800 rounded-full text-cursor-gray-400">
              {gameType}
            </span>
          </div>
          <div className="text-xs text-cursor-gray-400 mt-1">
            {formattedDate} · {formattedTime}
          </div>
        </div>
      </div>

      {gameType === 'Teams' ? renderTeamGame() : renderSoloGame()}
    </div>
  );
}
