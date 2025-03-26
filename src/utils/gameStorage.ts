import { Game } from '@/types/game';
import clientPromise from './mongodb';

export const saveGame = async (game: Game): Promise<void> => {
  const client = await clientPromise;
  const db = client.db('minecraft-bingo');
  await db.collection('games').insertOne(game);
};

export const updateGame = async (gameId: string, game: Game): Promise<void> => {
  const client = await clientPromise;
  const db = client.db('minecraft-bingo');
  await db.collection('games').updateOne(
    { id: gameId },
    { $set: game }
  );
};

export const getGameById = async (gameId: string): Promise<Game | null> => {
  const client = await clientPromise;
  const db = client.db('minecraft-bingo');
  return db.collection('games').findOne<Game>({ id: gameId });
};

export const getGames = async (): Promise<Game[]> => {
  const client = await clientPromise;
  const db = client.db('minecraft-bingo');
  return db.collection('games')
    .find<Game>({})
    .sort({ timestamp: -1 })
    .toArray();
};

export const getLiveGame = async (): Promise<Game | null> => {
  const client = await clientPromise;
  const db = client.db('minecraft-bingo');
  return db.collection('games')
    .findOne<Game>({ winner: { $exists: false } });
};

export const getGameState = async () => {
  const client = await clientPromise;
  const db = client.db('minecraft-bingo');
  const [liveGame, completedGames, totalGames] = await Promise.all([
    db.collection('games').findOne<Game>({ winner: { $exists: false } }),
    db.collection('games')
      .find<Game>({ winner: { $exists: true } })
      .sort({ timestamp: -1 })
      .toArray(),
    db.collection('games').countDocuments()
  ]);

  return {
    liveGame,
    completedGames,
    totalGames
  };
}; 