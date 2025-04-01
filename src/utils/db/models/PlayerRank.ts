import { PlayerRank, RankTier, RankDivision } from '@/types/rank';
import clientPromise from '@/utils/mongodb';
import { Collection } from 'mongodb';

let rankCollection: Collection<PlayerRank> | null = null;

async function getRankCollection() {
  if (!rankCollection) {
    const client = await clientPromise;
    const db = client.db('minecraft-bingo');
    rankCollection = db.collection<PlayerRank>('playerRanks');
    // Create unique index on playerId if it doesn't exist
    await rankCollection.createIndex({ playerId: 1 }, { unique: true });
  }
  return rankCollection;
}

export async function getPlayerRank(playerId: string): Promise<PlayerRank | null> {
  const collection = await getRankCollection();
  return await collection.findOne<PlayerRank>({ playerId });
}

export async function getAllPlayerRanks(): Promise<PlayerRank[]> {
  const collection = await getRankCollection();
  return await collection.find<PlayerRank>({}).sort({ mmr: -1 }).toArray();
}

export async function updatePlayerRank(
  playerId: string, 
  playerName: string,
  mmr: number,
  tier: RankTier,
  division: RankDivision | null
): Promise<PlayerRank> {
  const collection = await getRankCollection();
  
  try {
    // First check if player exists
    const existingPlayer = await collection.findOne({ playerId });
    
    if (existingPlayer) {
      // Player exists, update them (without changing _id)
      console.log('[PlayerRank] Player exists, updating:', { playerId, playerName });
      const updateResult = await collection.updateOne(
        { playerId },
        { 
          $set: { 
            playerName,
            mmr,
            tier,
            division,
            updatedAt: new Date()
          }
        }
      );

      if (!updateResult.acknowledged) {
        console.warn('[PlayerRank] Update not acknowledged:', { playerId, playerName });
      }
      
      // Return the updated player
      return {
        ...existingPlayer,
        playerName,
        mmr,
        tier,
        division,
        updatedAt: new Date()
      } as PlayerRank;
    } else {
      // New player, insert them
      console.log('[PlayerRank] Creating new player rank:', { playerId, playerName });
      const newPlayer: PlayerRank = {
        playerId,
        playerName,
        mmr,
        tier,
        division,
        updatedAt: new Date()
      };
      
      const insertResult = await collection.insertOne(newPlayer);
      if (!insertResult.acknowledged) {
        console.warn('[PlayerRank] Insert not acknowledged:', { playerId, playerName });
      }
      
      return newPlayer;
    }
  } catch (error) {
    console.error('[PlayerRank] Error updating player rank:', error);
    throw error;
  }
} 