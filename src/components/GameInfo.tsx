import { Game } from '@/types/game';

interface GameInfoProps {
  game: Game;
}

// Component to display information about a game, including teams and winner.

export default function GameInfo({ game }: GameInfoProps) {
  // Destructure game data for easier access.
  const { id, timestamp, winner, teams, completedQuests } = game;
  const team1Quests = completedQuests[teams[0]].length;
  const team2Quests = completedQuests[teams[1]].length;

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
        </div>
        {winner && (
          <div className="bg-emerald-900/50 text-emerald-300 px-3 py-1 text-sm rounded-lg border border-emerald-600">
            Winner: {winner}
          </div>
        )}
      </div>

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
    </div>
  );
} 