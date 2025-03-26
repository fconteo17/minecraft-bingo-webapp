import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { GameStartRequest, Game, TeamName } from '@/types/game';
import { saveGame } from '@/utils/gameStorage';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body: GameStartRequest = await request.json();
    console.log('[CreateGame] Starting new game:', { team1: body.team1Name, team2: body.team2Name, quests: body.quests });

    // Validate input
    if (!body.team1Name || !body.team2Name || !body.quests || body.quests.length !== 25) {
      console.log('[CreateGame] Validation failed:', { team1: body.team1Name, team2: body.team2Name, questCount: body.quests?.length });
      return NextResponse.json(
        { error: 'Invalid input. Please provide team names and exactly 25 quests.' },
        { status: 400 }
      );
    }

    // Create new game
    const newGame: Game = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      teams: [body.team1Name, body.team2Name] as [TeamName, TeamName],
      quests: body.quests.map(questName => ({
        name: questName,
      })),
      completedQuests: {
        Red: [],
        Blue: []
      }
    };

    // Save game
    await saveGame(newGame);
    console.log('[CreateGame] Game created successfully:', { gameId: newGame.id, teams: newGame.teams });

    return NextResponse.json(newGame);
  } catch (error) {
    console.error('[CreateGame] Error starting game:', error);
    return NextResponse.json(
      { error: 'Failed to start game' },
      { status: 500 }
    );
  }
} 