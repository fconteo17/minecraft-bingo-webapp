import { Game } from '@/types/game';

interface GameInfoProps {
  game: Game;
}

export default function GameInfo({ game }: GameInfoProps) {
  const team1Quests = game.completedQuests[game.teams[0]].length;
  const team2Quests = game.completedQuests[game.teams[1]].length;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-gray-100">
            #{game.id.slice(0, 8)}
          </h2>
          <p className="text-sm text-gray-400">
            {new Date(game.timestamp).toLocaleString()}
          </p>
        </div>
        {game.winner && (
          <div className="bg-emerald-900/50 text-emerald-300 px-3 py-1 text-sm rounded-lg border border-emerald-600">
            Winner: {game.winner}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className={`p-2 rounded-lg border ${
          game.winner === game.teams[0]
            ? 'bg-emerald-900/50 border-emerald-600'
            : 'bg-gray-700/50 border-gray-600'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-100">
              {game.teams[0]}
            </h3>
            <p className={`text-sm ${
              game.winner === game.teams[0] ? 'text-emerald-300' : 'text-gray-300'
            }`}>
              {team1Quests} Quests
            </p>
          </div>
        </div>
        <div className={`p-2 rounded-lg border ${
          game.winner === game.teams[1]
            ? 'bg-emerald-900/50 border-emerald-600'
            : 'bg-gray-700/50 border-gray-600'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-100">
              {game.teams[1]}
            </h3>
            <p className={`text-sm ${
              game.winner === game.teams[1] ? 'text-emerald-300' : 'text-gray-300'
            }`}>
              {team2Quests} Quests
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 