import { Game } from '@/types/game';

interface GameInfoProps {
  game: Game;
}

// Define the same player colors as in QuestGrid for consistency
const playerColors = [
  { bg: 'bg-purple-900/50', border: 'border-purple-600', text: 'text-purple-100', highlight: 'text-purple-300' },
  // Remove green from regular colors since it's reserved for the winner
  { bg: 'bg-yellow-900/50', border: 'border-yellow-600', text: 'text-yellow-100', highlight: 'text-yellow-300' },
  { bg: 'bg-pink-900/50', border: 'border-pink-600', text: 'text-pink-100', highlight: 'text-pink-300' },
  { bg: 'bg-indigo-900/50', border: 'border-indigo-600', text: 'text-indigo-100', highlight: 'text-indigo-300' },
  { bg: 'bg-teal-900/50', border: 'border-teal-600', text: 'text-teal-100', highlight: 'text-teal-300' },
  { bg: 'bg-orange-900/50', border: 'border-orange-600', text: 'text-orange-100', highlight: 'text-orange-300' },
  { bg: 'bg-cyan-900/50', border: 'border-cyan-600', text: 'text-cyan-100', highlight: 'text-cyan-300' },
  { bg: 'bg-lime-900/50', border: 'border-lime-600', text: 'text-lime-100', highlight: 'text-lime-300' },
  { bg: 'bg-emerald-900/50', border: 'border-emerald-600', text: 'text-emerald-100', highlight: 'text-emerald-300' },
];

// Winner color - exclusive for the winner
const winnerColor = { bg: 'bg-green-900/50', border: 'border-green-600', text: 'text-green-100', highlight: 'text-green-300' };

// Map player names to colors
const getPlayerColorIndex = (playerName: string) => {
  return playerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % playerColors.length;
};

// Component to display information about a game, including teams and winner.
export default function GameInfo({ game }: GameInfoProps) {
  // Destructure game data for easier access.
  const { id, timestamp, winner, teams, players, gameType, completedQuests } = game;
  
  // Render functions for different game types
  const renderTeamGame = () => {
    if (!teams) return null;
    const team1Quests = completedQuests[teams[0]].length;
    const team2Quests = completedQuests[teams[1]].length;

    return (
      <div className="grid grid-cols-2 gap-2">
        {/* Render team 1 information */}
        <div className={`p-2 rounded-lg border ${
          winner === teams[0]
            ? 'bg-emerald-900/50 border-emerald-600'
            : 'bg-gray-700/50 border-gray-600'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-100">
              {teams[0]}
            </h3>
            <p className={`text-sm ${
              winner === teams[0] ? 'text-emerald-300' : 'text-gray-300'
            }`}>
              {team1Quests} Quests
            </p>
          </div>
        </div>
        {/* Render team 2 information */}
        <div className={`p-2 rounded-lg border ${
          winner === teams[1]
            ? 'bg-emerald-900/50 border-emerald-600'
            : 'bg-gray-700/50 border-gray-600'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-100">
              {teams[1]}
            </h3>
            <p className={`text-sm ${
              winner === teams[1] ? 'text-emerald-300' : 'text-gray-300'
            }`}>
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
      <div className="grid grid-cols-1 gap-2">
        <h3 className="text-lg font-medium text-gray-100 mb-2">Players</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {players.map((player) => {
            const completedCount = completedQuests[player]?.length || 0;
            const isWinner = winner === player;
            
            // Use winner color for the winner, otherwise use player's assigned color
            let color;
            if (isWinner) {
              color = winnerColor;
            } else {
              const colorIndex = getPlayerColorIndex(player);
              color = playerColors[colorIndex];
            }
            
            return (
              <div 
                key={player}
                className={`p-2 rounded-lg border ${color.bg} ${color.border}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`font-medium ${color.text}`}>
                    {player}
                  </h3>
                  <p className={`text-sm ${color.highlight}`}>
                    {completedCount} Quests
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-gray-100">
            #{id.slice(0, 8)}
          </h2>
          <p className="text-sm text-gray-400">
            {new Date(timestamp).toLocaleString()}
          </p>
          <p className="text-sm bg-gray-700 px-2 py-1 rounded">
            {gameType === 'Teams' ? 'Team Mode' : 'Solo Mode'}
          </p>
        </div>
        {winner && (
          <div className="bg-emerald-900/50 text-emerald-300 px-3 py-1 text-sm rounded-lg border border-emerald-600">
            Winner: {winner}
          </div>
        )}
      </div>

      {gameType === 'Teams' ? renderTeamGame() : renderSoloGame()}
    </div>
  );
} 