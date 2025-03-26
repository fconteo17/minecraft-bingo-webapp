import { NextRequest, NextResponse } from 'next/server';
import { getGameById, updateGame } from '@/utils/gameStorage';

export const dynamic = 'force-dynamic';

type Context = {
  params: Promise<{
    gameId: string;
  }>
}

export async function POST(
  request: NextRequest,
  context: Context
) {
  try {
    const { gameId } = await context.params;
    console.log('[EndGame] Request received:', { gameId });

    // Get current game state
    const game = await getGameById(gameId);
    if (!game) {
      console.log('[EndGame] Game not found:', { gameId });
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    // Determine winner based on completed quests
    const [team1, team2] = game.teams;
    const team1Quests = game.completedQuests[team1].length;
    const team2Quests = game.completedQuests[team2].length;

    console.log('[EndGame] Calculating winner:', { 
      team1, 
      team1Quests,
      team1CompletedQuests: game.completedQuests[team1],
      team2, 
      team2Quests,
      team2CompletedQuests: game.completedQuests[team2]
    });

    // Set winner based on who completed more quests
    if (team1Quests > team2Quests) {
      game.winner = team1;
      console.log('[EndGame] Winner determined by quest count:', {
        winner: team1,
        winningQuests: team1Quests,
        losingQuests: team2Quests
      });
    } else if (team2Quests > team1Quests) {
      game.winner = team2;
      console.log('[EndGame] Winner determined by quest count:', {
        winner: team2,
        winningQuests: team2Quests,
        losingQuests: team1Quests
      });
    } else {
      // In case of a tie, the team that completed their last quest first wins
      const team1CompletedQuests = game.quests.filter(q => q.completedBy === team1);
      const team2CompletedQuests = game.quests.filter(q => q.completedBy === team2);
      
      console.log('[EndGame] Tie detected, analyzing completion times:', {
        team1: {
          name: team1,
          completedQuests: team1CompletedQuests.map(q => ({
            name: typeof q.name === 'object' && q.name !== null && 'name' in q.name
              ? (q.name as { name: string }).name
              : q.name,
            completedAt: q.completedAt
          }))
        },
        team2: {
          name: team2,
          completedQuests: team2CompletedQuests.map(q => ({
            name: typeof q.name === 'object' && q.name !== null && 'name' in q.name
              ? (q.name as { name: string }).name
              : q.name,
            completedAt: q.completedAt
          }))
        }
      });

      const team1LastQuest = Math.max(...team1CompletedQuests
        .map(q => q.completedAt ? new Date(q.completedAt).getTime() : 0));
      const team2LastQuest = Math.max(...team2CompletedQuests
        .map(q => q.completedAt ? new Date(q.completedAt).getTime() : 0));
      
      console.log('[EndGame] Tie breaker completion times:', {
        team1: {
          name: team1,
          lastQuestTime: new Date(team1LastQuest).toISOString()
        },
        team2: {
          name: team2,
          lastQuestTime: new Date(team2LastQuest).toISOString()
        }
      });

      if (team1LastQuest < team2LastQuest) {
        game.winner = team1;
        console.log('[EndGame] Winner determined by completion time:', {
          winner: team1,
          winningTime: new Date(team1LastQuest).toISOString(),
          losingTime: new Date(team2LastQuest).toISOString()
        });
      } else {
        game.winner = team2;
        console.log('[EndGame] Winner determined by completion time:', {
          winner: team2,
          winningTime: new Date(team2LastQuest).toISOString(),
          losingTime: new Date(team1LastQuest).toISOString()
        });
      }
    }

    // Save updated game state
    await updateGame(gameId, game);
    console.log('[EndGame] Game ended successfully:', { 
      gameId,
      winner: game.winner,
      finalScore: {
        [team1]: {
          quests: team1Quests,
          completedQuests: game.completedQuests[team1]
        },
        [team2]: {
          quests: team2Quests,
          completedQuests: game.completedQuests[team2]
        }
      },
      gameDuration: new Date().getTime() - new Date(game.timestamp).getTime()
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error('[EndGame] Error ending game:', error);
    return NextResponse.json(
      { error: 'Failed to end game' },
      { status: 500 }
    );
  }
} 