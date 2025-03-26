import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { GameStartRequest, Game, TeamName } from '@/types/game';
import { saveGame } from '@/utils/gameStorage';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body: GameStartRequest = await request.json();
    console.log('[CreateGame] Starting new game:', { 
      gameType: body.gameType,
      team1: body.team1Name, 
      team2: body.team2Name,
      players: body.players,
      quests: body.quests 
    });

    // Validate input based on game type
    if (body.gameType === 'Teams') {
      if (!body.team1Name || !body.team2Name || !body.quests || body.quests.length !== 25) {
        console.log('[CreateGame] Team validation failed:', { 
          team1: body.team1Name, 
          team2: body.team2Name, 
          questCount: body.quests?.length 
        });
        return NextResponse.json(
          { error: 'Invalid input. Please provide team names and exactly 25 quests.' },
          { status: 400 }
        );
      }
    } else if (body.gameType === 'Solo') {
      if (!body.players || body.players.length < 2 || !body.quests || body.quests.length !== 25) {
        console.log('[CreateGame] Solo validation failed:', { 
          players: body.players, 
          playerCount: body.players?.length,
          questCount: body.quests?.length 
        });
        return NextResponse.json(
          { error: 'Invalid input. Please provide at least 2 players and exactly 25 quests.' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid game type. Must be "Teams" or "Solo".' },
        { status: 400 }
      );
    }

    // Create a base game object
    const baseGame = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      gameType: body.gameType,
      quests: body.quests.map(questName => ({
        name: questName,
      })),
      completedQuests: {}
    };

    // Create new game based on type
    let newGame: Game;
    
    if (body.gameType === 'Teams') {
      // Set up team-specific properties
      newGame = {
        ...baseGame,
        teams: [body.team1Name!, body.team2Name!] as [TeamName, TeamName],
        completedQuests: {
          Red: [],
          Blue: []
        }
      };
    } else {
      // Set up solo game properties with players
      newGame = {
        ...baseGame,
        players: body.players,
        completedQuests: body.players!.reduce((acc, player) => {
          acc[player] = [];
          return acc;
        }, {} as Record<string, string[]>)
      };
    }

    // Save game
    await saveGame(newGame);
    console.log('[CreateGame] Game created successfully:', { 
      gameId: newGame.id, 
      gameType: newGame.gameType,
      teams: newGame.teams,
      players: newGame.players
    });

    return NextResponse.json(newGame);
  } catch (error) {
    console.error('[CreateGame] Error starting game:', error);
    return NextResponse.json(
      { error: 'Failed to start game' },
      { status: 500 }
    );
  }
} 