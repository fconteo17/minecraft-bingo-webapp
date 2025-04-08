import { Game } from '@/types/game';
import GamePageClient from './GamePageClient';

async function getGame(gameId: string): Promise<Game> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/${gameId}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch game');
  }
  return res.json();
}

type Props = {
  params: Promise<{
    gameId: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { gameId } = await params;
  const game = await getGame(gameId);
  return {
    title: `Game ${game.id.slice(0, 8)} - Minecraft Bingo`,
  };
}

export default async function GamePage({ params }: Props) {
  const { gameId } = await params;
  const game = await getGame(gameId);
  return <GamePageClient game={game} />;
}
