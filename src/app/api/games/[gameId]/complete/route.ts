import { NextRequest, NextResponse } from 'next/server';
import { getGameById, updateGame } from '@/utils/gameStorage';
import { TeamName } from '@/types/game';

interface CompleteQuestRequest {
  gameId: string;
  teamName: string;
  playerName: string;
  questName: string;
}

const isValidTeam = (team: string): team is TeamName => team === 'Red' || team === 'Blue';

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
    const body = await request.json() as CompleteQuestRequest;
    console.log('[CompleteQuest] Request received:', { gameId, teamName: body.teamName, questName: body.questName, playerName: body.playerName });

    if (!isValidTeam(body.teamName)) {
      console.log('[CompleteQuest] Invalid team name:', { teamName: body.teamName });
      return NextResponse.json(
        { error: 'Team name must be Red or Blue' },
        { status: 400 }
      );
    }

    const teamName = body.teamName as TeamName;

    // Validate game ID matches
    if (body.gameId !== gameId) {
      console.log('[CompleteQuest] Game ID mismatch:', { providedId: body.gameId, actualId: gameId });
      return NextResponse.json(
        { error: 'Game ID mismatch' },
        { status: 400 }
      );
    }

    // Get current game state
    const game = await getGameById(gameId);
    if (!game) {
      console.log('[CompleteQuest] Game not found:', { gameId });
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    // Validate team exists
    if (!game.teams.includes(teamName)) {
      console.log('[CompleteQuest] Invalid team name for game:', { teamName, gameTeams: game.teams });
      return NextResponse.json(
        { error: 'Invalid team name' },
        { status: 400 }
      );
    }

    // Validate quest exists
    const questIndex = game.quests.findIndex(q => {
      const questName = typeof q.name === 'object' && q.name !== null ? (q.name as { name: string }).name : q.name;
      return questName === body.questName;
    });
    if (questIndex === -1) {
      console.log('[CompleteQuest] Quest not found:', { questName: body.questName });
      return NextResponse.json(
        { error: 'Quest not found' },
        { status: 404 }
      );
    }

    // Check if quest is already completed
    if (game.completedQuests[teamName].includes(body.questName)) {
      console.log('[CompleteQuest] Quest already completed:', { questName: body.questName, team: teamName });
      return NextResponse.json(
        { error: 'Quest already completed' },
        { status: 400 }
      );
    }

    // Add quest to completed quests
    const questName = typeof game.quests[questIndex].name === 'object' && game.quests[questIndex].name !== null
      ? (game.quests[questIndex].name as { name: string }).name
      : game.quests[questIndex].name;
    game.completedQuests[teamName].push(questName);

    // Update quest completion details
    game.quests[questIndex] = {
      ...game.quests[questIndex],
      completedBy: teamName,
      completedByPlayer: body.playerName,
      completedAt: new Date().toISOString()
    };

    // Save updated game state
    await updateGame(gameId, game);
    console.log('[CompleteQuest] Quest completed successfully:', { 
      gameId, 
      questName: body.questName, 
      team: teamName, 
      player: body.playerName,
      completedAt: game.quests[questIndex].completedAt 
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error('[CompleteQuest] Error completing quest:', error);
    return NextResponse.json(
      { error: 'Failed to complete quest' },
      { status: 500 }
    );
  }
} 