import Link from 'next/link';
import { Game } from '@/types/game';

async function getGames(): Promise<Game[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch games');
  }
  return res.json();
}

export default async function Home() {
  const games = await getGames();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100">Minecraft Bingo Games</h1>
      </div>

      <div className="grid gap-6">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.id}`}
            className="block bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 hover:bg-gray-750 hover:border-gray-600 transition-all"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-100">
                  Game #{game.id.slice(0, 8)}
                </h2>
                <p className="text-gray-400">
                  {game.teams[0]} vs {game.teams[1]}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-400">
                  {new Date(game.timestamp).toLocaleDateString()}
                </p>
                {game.winner && (
                  <p className="text-emerald-400 font-semibold">
                    Winner: {game.winner}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
