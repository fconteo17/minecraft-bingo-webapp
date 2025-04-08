import { NextRequest, NextResponse } from 'next/server';
import { getGameById, updateGame } from '@/utils/gameStorage';
import { TeamName, Game, Quest } from '@/types/game';

interface CompleteQuestRequest {
  gameId: string;
  teamName?: string;
  playerName: string;
  questName: string;
}

const isValidTeam = (team: string): team is TeamName => team === 'Red' || team === 'Blue';

export const dynamic = 'force-dynamic';

type Context = {
  params: Promise<{
    gameId: string;
  }>;
};

export async function POST(request: NextRequest, context: Context) {
  try {
    const { gameId } = await context.params;
    const body = (await request.json()) as CompleteQuestRequest;
    console.log('[CompleteQuest] Request received:', {
      gameId,
      teamName: body.teamName,
      playerName: body.playerName,
      questName: body.questName,
    });

    // Get current game state
    const game = await getGameById(gameId);
    if (!game) {
      console.log('[CompleteQuest] Game not found:', { gameId });
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    // Validate game ID matches
    if (body.gameId !== gameId) {
      console.log('[CompleteQuest] Game ID mismatch:', {
        providedId: body.gameId,
        actualId: gameId,
      });
      return NextResponse.json({ error: 'Game ID mismatch' }, { status: 400 });
    }

    // Handle team-based games
    if (game.gameType === 'Teams') {
      if (!body.teamName) {
        console.log('[CompleteQuest] Team name required for team game:', {
          gameType: game.gameType,
        });
        return NextResponse.json(
          { error: 'Team name is required for team-based games' },
          { status: 400 },
        );
      }

      if (!isValidTeam(body.teamName)) {
        console.log('[CompleteQuest] Invalid team name:', { teamName: body.teamName });
        return NextResponse.json({ error: 'Team name must be Red or Blue' }, { status: 400 });
      }

      const teamName = body.teamName as TeamName;

      // Validate team exists
      if (!game.teams || !game.teams.includes(teamName)) {
        console.log('[CompleteQuest] Invalid team name for game:', {
          teamName,
          gameTeams: game.teams,
        });
        return NextResponse.json({ error: 'Invalid team name' }, { status: 400 });
      }

      // Check if quest is already completed
      if (game.completedQuests[teamName].includes(body.questName)) {
        console.log('[CompleteQuest] Quest already completed:', {
          questName: body.questName,
          team: teamName,
        });
        return NextResponse.json({ error: 'Quest already completed' }, { status: 400 });
      }

      // Process the team-based completion
      processQuestCompletion(game, body.questName, teamName, body.playerName);
    }
    // Handle solo games
    else if (game.gameType === 'Solo') {
      const playerName = body.playerName;

      // Validate player exists
      if (!game.players || !game.players.includes(playerName)) {
        console.log('[CompleteQuest] Invalid player name for game:', {
          playerName,
          gamePlayers: game.players,
        });
        return NextResponse.json({ error: 'Invalid player name' }, { status: 400 });
      }

      // Check if quest is already completed by this player
      if (game.completedQuests[playerName].includes(body.questName)) {
        console.log('[CompleteQuest] Quest already completed:', {
          questName: body.questName,
          player: playerName,
        });
        return NextResponse.json(
          { error: 'Quest already completed by this player' },
          { status: 400 },
        );
      }

      // Process the player-based completion
      processQuestCompletion(game, body.questName, playerName, playerName);
    } else {
      return NextResponse.json({ error: 'Invalid game type' }, { status: 400 });
    }

    // Save updated game state
    await updateGame(gameId, game);
    console.log('[CompleteQuest] Quest completed successfully:', {
      gameId,
      questName: body.questName,
      gameType: game.gameType,
      completer: game.gameType === 'Teams' ? body.teamName : body.playerName,
      player: body.playerName,
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error('[CompleteQuest] Error completing quest:', error);
    return NextResponse.json({ error: 'Failed to complete quest' }, { status: 500 });
  }
}

// Helper function to process quest completion for both game types
function processQuestCompletion(
  game: Game,
  questName: string,
  completer: string,
  playerName: string,
) {
  // Find the quest
  const questIndex = game.quests.findIndex((q: Quest) => {
    const qName =
      typeof q.name === 'object' && q.name !== null ? (q.name as { name: string }).name : q.name;
    return qName === questName;
  });

  if (questIndex === -1) {
    throw new Error('Quest not found');
  }

  // Add quest to completed quests for the team or player
  const qName =
    typeof game.quests[questIndex].name === 'object' && game.quests[questIndex].name !== null
      ? (game.quests[questIndex].name as { name: string }).name
      : game.quests[questIndex].name;
  game.completedQuests[completer].push(qName);

  // Update quest completion details
  game.quests[questIndex] = {
    ...game.quests[questIndex],
    completedBy: completer,
    completedByPlayer: playerName,
    completedAt: new Date().toISOString(),
  };
}
