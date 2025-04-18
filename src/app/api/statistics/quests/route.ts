import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import { Game } from '@/types/game';

export const dynamic = 'force-dynamic';

interface QuestStats {
  name: string;
  totalAppearances: number;
  totalCompletions: number;
  completionPercentage: number;
  averageTimeMs: number;
  averageTimeFormatted: string;
  fastestTimeMs: number;
  fastestTimeFormatted: string;
  slowestTimeMs: number;
  slowestTimeFormatted: string;
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('minecraft-bingo');

    // Get all completed games
    const games = await db
      .collection<Game>('games')
      .find({ winner: { $exists: true } })
      .toArray();

    // Initialize statistics map
    const questStatsMap = new Map<string, QuestStats>();

    // Process each game
    for (const game of games) {
      const gameStartTime = new Date(game.timestamp).getTime();

      // Process each quest in the game
      for (const quest of game.quests) {
        const questName = typeof quest.name === 'string' ? quest.name : quest.name.name;
        
        // Skip the placeholder quest
        if (questName === "???") continue;
        
        // Update or initialize quest statistics
        const stats = questStatsMap.get(questName) || {
          name: questName,
          totalAppearances: 0,
          totalCompletions: 0,
          completionPercentage: 0,
          averageTimeMs: 0,
          averageTimeFormatted: '',
          fastestTimeMs: Infinity,
          fastestTimeFormatted: '',
          slowestTimeMs: 0,
          slowestTimeFormatted: '',
        };

        // Update appearance count
        stats.totalAppearances++;
        
        // If quest was completed, update completion stats
        if (quest.completedAt) {
          stats.totalCompletions++;
          const completionTime = new Date(quest.completedAt).getTime();
          const timeToComplete = completionTime - gameStartTime;

          // Update average time
          stats.averageTimeMs = (stats.averageTimeMs * (stats.totalCompletions - 1) + timeToComplete) / stats.totalCompletions;
          stats.averageTimeFormatted = formatTime(stats.averageTimeMs);
          
          // Update fastest time
          if (timeToComplete < stats.fastestTimeMs) {
            stats.fastestTimeMs = timeToComplete;
            stats.fastestTimeFormatted = formatTime(timeToComplete);
          }
          
          // Update slowest time
          if (timeToComplete > stats.slowestTimeMs) {
            stats.slowestTimeMs = timeToComplete;
            stats.slowestTimeFormatted = formatTime(timeToComplete);
          }
        }

        // Calculate completion percentage
        stats.completionPercentage = (stats.totalCompletions / stats.totalAppearances) * 100;

        questStatsMap.set(questName, stats);
      }
    }

    // Convert map to array and sort by name
    const questStats = Array.from(questStatsMap.values()).sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(questStats);
  } catch (error) {
    console.error('Error calculating quest statistics:', error);
    return NextResponse.json({ error: 'Failed to calculate quest statistics' }, { status: 500 });
  }
}
