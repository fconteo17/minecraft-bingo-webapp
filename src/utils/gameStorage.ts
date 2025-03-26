import { Game } from '@/types/game';
import clientPromise from './mongodb';

// Utility functions for managing game data in the MongoDB database.

export const saveGame = async (game: Game): Promise<void> => {
  try {
    const client = await clientPromise;
    const db = client.db('minecraft-bingo');
    await db.collection('games').insertOne(game);
  } catch (error) {
    console.error('Error saving game:', error);
    throw new Error('Failed to save game');
  }
};

export const updateGame = async (gameId: string, game: Game): Promise<void> => {
  try {
    const client = await clientPromise;
    const db = client.db('minecraft-bingo');
    await db.collection('games').updateOne(
      { id: gameId },
      { $set: game }
    );
  } catch (error) {
    console.error('Error updating game:', error);
    throw new Error('Failed to update game');
  }
};

export const getGameById = async (gameId: string): Promise<Game | null> => {
  try {
    const client = await clientPromise;
    const db = client.db('minecraft-bingo');
    return db.collection('games').findOne<Game>({ id: gameId });
  } catch (error) {
    console.error('Error retrieving game by ID:', error);
    throw new Error('Failed to retrieve game by ID');
  }
};

export const getGames = async (): Promise<Game[]> => {
  try {
    const client = await clientPromise;
    const db = client.db('minecraft-bingo');
    return db.collection('games')
      .find<Game>({})
      .sort({ timestamp: -1 })
      .toArray();
  } catch (error) {
    console.error('Error retrieving games:', error);
    throw new Error('Failed to retrieve games');
  }
};

export const getLiveGame = async (): Promise<Game | null> => {
  try {
    const client = await clientPromise;
    const db = client.db('minecraft-bingo');
    return db.collection('games')
      .findOne<Game>({ winner: { $exists: false } });
  } catch (error) {
    console.error('Error retrieving live game:', error);
    throw new Error('Failed to retrieve live game');
  }
};

export const getGameState = async (): Promise<{ liveGame: Game | null, completedGames: Game[], totalGames: number }> => {
  try {
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
  } catch (error) {
    console.error('Error retrieving game state:', error);
    throw new Error('Failed to retrieve game state');
  }
}; 