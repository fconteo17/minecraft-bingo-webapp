import { NextRequest, NextResponse } from 'next/server';
import { getGameById, updateGame } from '@/utils/gameStorage';
import { Game } from '@/types/game';

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

    // Handle different game types
    if (game.gameType === 'Teams') {
      handleTeamGame(game);
    } else if (game.gameType === 'Solo') {
      handleSoloGame(game);
    } else {
      console.error('[EndGame] Invalid game type:', { gameType: game.gameType });
      return NextResponse.json(
        { error: 'Invalid game type' },
        { status: 400 }
      );
    }

    // Save updated game state
    await updateGame(gameId, game);
    console.log('[EndGame] Game ended successfully:', { 
      gameId,
      winner: game.winner,
      gameType: game.gameType,
      completedQuests: game.completedQuests,
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

// Handle team-based game ending
function handleTeamGame(game: Game) {
  if (!game.teams) {
    throw new Error('Teams are required for team-based games');
  }
  
  const [team1, team2] = game.teams;
  const team1Quests = game.completedQuests[team1].length;
  const team2Quests = game.completedQuests[team2].length;

  console.log('[EndGame] Calculating winner for team game:', { 
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
}

// Handle solo (free-for-all) game ending
function handleSoloGame(game: Game) {
  if (!game.players || game.players.length === 0) {
    throw new Error('Players are required for solo games');
  }

  // Get all player quest counts
  const playerScores = game.players.map(player => ({
    player,
    questCount: game.completedQuests[player]?.length || 0,
    completedQuests: game.completedQuests[player] || []
  }));

  console.log('[EndGame] Calculating winner for solo game:', { playerScores });

  // Sort players by quest count (descending)
  playerScores.sort((a, b) => b.questCount - a.questCount);

  // Check if there's a clear winner by quest count
  if (playerScores[0].questCount > (playerScores[1]?.questCount || 0)) {
    game.winner = playerScores[0].player;
    console.log('[EndGame] Solo winner determined by quest count:', {
      winner: game.winner,
      winningQuests: playerScores[0].questCount,
      secondPlace: playerScores[1]?.player,
      secondPlaceQuests: playerScores[1]?.questCount
    });
    return;
  }

  // Handle tie scenario - player who completed their last quest first wins
  const tiedPlayers = playerScores.filter(p => p.questCount === playerScores[0].questCount);
  
  console.log('[EndGame] Solo tie detected, analyzing completion times for players:', 
    tiedPlayers.map(p => p.player)
  );

  // Find the last completed quest time for each tied player
  const playerLastQuestTimes = tiedPlayers.map(playerScore => {
    const playerQuests = game.quests.filter(q => q.completedBy === playerScore.player);
    const lastQuestTime = Math.max(...playerQuests
      .map(q => q.completedAt ? new Date(q.completedAt).getTime() : 0));
    
    return {
      player: playerScore.player,
      lastQuestTime,
      formattedTime: new Date(lastQuestTime).toISOString()
    };
  });

  console.log('[EndGame] Solo tie breaker completion times:', playerLastQuestTimes);

  // Sort by completion time (ascending = faster)
  playerLastQuestTimes.sort((a, b) => a.lastQuestTime - b.lastQuestTime);
  
  // Winner is the player who completed their last quest first
  game.winner = playerLastQuestTimes[0].player;
  
  console.log('[EndGame] Solo winner determined by completion time:', {
    winner: game.winner,
    winningTime: playerLastQuestTimes[0].formattedTime
  });
} 