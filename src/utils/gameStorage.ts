import fs from 'fs';
import path from 'path';
import { Game } from '@/types/game';

const GAMES_FILE_PATH = path.join(process.cwd(), 'data', 'games.json');

// Ensure the data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
};

// Initialize games file if it doesn't exist
const initializeGamesFile = () => {
  if (!fs.existsSync(GAMES_FILE_PATH)) {
    fs.writeFileSync(GAMES_FILE_PATH, JSON.stringify({ games: [] }, null, 2));
  }
};

export const saveGame = async (game: Game): Promise<void> => {
  ensureDataDirectory();
  initializeGamesFile();

  const fileContent = fs.readFileSync(GAMES_FILE_PATH, 'utf-8');
  const data = JSON.parse(fileContent);
  data.games.push(game);
  fs.writeFileSync(GAMES_FILE_PATH, JSON.stringify(data, null, 2));
};

export const getGames = async (): Promise<Game[]> => {
  ensureDataDirectory();
  initializeGamesFile();

  const fileContent = fs.readFileSync(GAMES_FILE_PATH, 'utf-8');
  const data = JSON.parse(fileContent);
  // Sort games by timestamp in descending order (newest first)
  return data.games.sort((a: Game, b: Game) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const getGameById = async (gameId: string): Promise<Game | null> => {
  const games = await getGames();
  return games.find(game => game.id === gameId) || null;
};

export const updateGame = async (gameId: string, updatedGame: Game): Promise<void> => {
  const games = await getGames();
  const gameIndex = games.findIndex(game => game.id === gameId);
  
  if (gameIndex === -1) {
    throw new Error('Game not found');
  }

  games[gameIndex] = updatedGame;
  fs.writeFileSync(GAMES_FILE_PATH, JSON.stringify({ games }, null, 2));
};

export const getLiveGame = async (): Promise<Game | null> => {
  const games = await getGames();
  // Live game is the most recent game without a winner
  return games.find(game => !game.winner) || null;
};

export const getGameState = async () => {
  const games = await getGames();
  return {
    liveGame: games.find(game => !game.winner) || null,
    completedGames: games.filter(game => game.winner).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
    totalGames: games.length
  };
}; 