import { saveGame, updateGame, getGameById, getGames, getLiveGame, getGameState } from '../gameStorage';
import clientPromise from '../mongodb';
import { Game, GameType, TeamName } from '@/types/game';

// Mock the MongoDB client
jest.mock('../mongodb', () => ({
  __esModule: true,
  default: Promise.resolve({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn(),
        updateOne: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            toArray: jest.fn(),
          }),
        }),
        countDocuments: jest.fn(),
      }),
    }),
  }),
}));

// Mock console.error to prevent cluttering test output
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Game Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockGame: Game = {
    id: 'game-123',
    timestamp: '2023-01-01T00:00:00.000Z',
    gameType: 'Teams' as GameType,
    teams: ['Red', 'Blue'] as [TeamName, TeamName],
    quests: [
      { name: 'Find a diamond' },
      { name: 'Craft a golden apple' },
    ],
    completedQuests: {},
  };

  test('saveGame should call insertOne with the game', async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn(),
      }),
    };
    const mockClient = await clientPromise;
    mockClient.db = jest.fn().mockReturnValue(mockDb);

    await saveGame(mockGame);

    expect(mockClient.db).toHaveBeenCalledWith('minecraft-bingo');
    expect(mockDb.collection).toHaveBeenCalledWith('games');
    expect(mockDb.collection().insertOne).toHaveBeenCalledWith(mockGame);
  });

  test('updateGame should call updateOne with the game', async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        updateOne: jest.fn(),
      }),
    };
    const mockClient = await clientPromise;
    mockClient.db = jest.fn().mockReturnValue(mockDb);

    await updateGame('game-123', mockGame);

    expect(mockClient.db).toHaveBeenCalledWith('minecraft-bingo');
    expect(mockDb.collection).toHaveBeenCalledWith('games');
    expect(mockDb.collection().updateOne).toHaveBeenCalledWith(
      { id: 'game-123' },
      { $set: mockGame }
    );
  });

  test('getGameById should return a game', async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue(mockGame),
      }),
    };
    const mockClient = await clientPromise;
    mockClient.db = jest.fn().mockReturnValue(mockDb);

    const result = await getGameById('game-123');

    expect(mockClient.db).toHaveBeenCalledWith('minecraft-bingo');
    expect(mockDb.collection).toHaveBeenCalledWith('games');
    expect(mockDb.collection().findOne).toHaveBeenCalledWith({ id: 'game-123' });
    expect(result).toEqual(mockGame);
  });

  test('getGames should return an array of games', async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue([mockGame]),
          }),
        }),
      }),
    };
    const mockClient = await clientPromise;
    mockClient.db = jest.fn().mockReturnValue(mockDb);

    const result = await getGames();

    expect(mockClient.db).toHaveBeenCalledWith('minecraft-bingo');
    expect(mockDb.collection).toHaveBeenCalledWith('games');
    expect(mockDb.collection().find).toHaveBeenCalledWith({});
    expect(mockDb.collection().find().sort).toHaveBeenCalledWith({ timestamp: -1 });
    expect(result).toEqual([mockGame]);
  });

  test('getLiveGame should return a game without a winner', async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue(mockGame),
      }),
    };
    const mockClient = await clientPromise;
    mockClient.db = jest.fn().mockReturnValue(mockDb);

    const result = await getLiveGame();

    expect(mockClient.db).toHaveBeenCalledWith('minecraft-bingo');
    expect(mockDb.collection).toHaveBeenCalledWith('games');
    expect(mockDb.collection().findOne).toHaveBeenCalledWith({ winner: { $exists: false } });
    expect(result).toEqual(mockGame);
  });

  test('getGameState should return the game state', async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue(mockGame),
        find: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue([mockGame]),
          }),
        }),
        countDocuments: jest.fn().mockResolvedValue(1),
      }),
    };
    const mockClient = await clientPromise;
    mockClient.db = jest.fn().mockReturnValue(mockDb);

    const result = await getGameState();

    expect(mockClient.db).toHaveBeenCalledWith('minecraft-bingo');
    expect(mockDb.collection).toHaveBeenCalledWith('games');
    expect(mockDb.collection().findOne).toHaveBeenCalledWith({ winner: { $exists: false } });
    expect(mockDb.collection().find).toHaveBeenCalledWith({ winner: { $exists: true } });
    expect(mockDb.collection().find().sort).toHaveBeenCalledWith({ timestamp: -1 });
    expect(mockDb.collection().countDocuments).toHaveBeenCalled();
    expect(result).toEqual({
      liveGame: mockGame,
      completedGames: [mockGame],
      totalGames: 1,
    });
  });

  test('functions should throw errors when MongoDB operations fail', async () => {
    // Create a mock db with methods that reject with errors
    const mockClient = await clientPromise;
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn().mockImplementation(() => {
          const error = new Error('MongoDB error');
          console.error('Error saving game:', error);
          throw new Error('Failed to save game');
        }),
        updateOne: jest.fn().mockImplementation(() => {
          const error = new Error('MongoDB error');
          console.error('Error updating game:', error);
          throw new Error('Failed to update game');
        }),
        findOne: jest.fn().mockImplementation(() => {
          const error = new Error('MongoDB error');
          console.error('Error retrieving game by ID:', error);
          throw new Error('Failed to retrieve game by ID');
        }),
        find: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            toArray: jest.fn().mockImplementation(() => {
              const error = new Error('MongoDB error');
              console.error('Error retrieving games:', error);
              throw new Error('Failed to retrieve games');
            }),
          }),
        }),
        countDocuments: jest.fn().mockImplementation(() => {
          const error = new Error('MongoDB error');
          console.error('Error retrieving game state:', error);
          throw new Error('Failed to retrieve game state');
        }),
      }),
    };
    mockClient.db = jest.fn().mockReturnValue(mockDb);

    await expect(saveGame(mockGame)).rejects.toThrow('Failed to save game');
    await expect(updateGame('game-123', mockGame)).rejects.toThrow('Failed to update game');
    await expect(getGameById('game-123')).rejects.toThrow('Failed to retrieve game by ID');
    await expect(getGames()).rejects.toThrow('Failed to retrieve games');
    await expect(getLiveGame()).rejects.toThrow('Failed to retrieve live game');
    await expect(getGameState()).rejects.toThrow('Failed to retrieve game state');
  });
}); 