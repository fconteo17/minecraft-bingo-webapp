import { NextRequest, NextResponse } from 'next/server';
import { getGameById, updateGame } from '@/utils/gameStorage';

interface UpdateQuestRequest {
  gameId: string;
  questName: string;
  newQuestName: string;
}

type Context = {
  params: Promise<{
    gameId: string;
  }>
}

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  context: Context
) {
  try {
    const { gameId } = await context.params;
    const body = await request.json() as UpdateQuestRequest;
    console.log('[UpdateQuest] Request received:', { gameId, questName: body.questName, newQuestName: body.newQuestName });

    // Validate game ID matches
    if (body.gameId !== gameId) {
      console.log('[UpdateQuest] Game ID mismatch:', { providedId: body.gameId, actualId: gameId });
      return NextResponse.json(
        { error: 'Game ID mismatch' },
        { status: 400 }
      );
    }

    // Get current game state
    const game = await getGameById(gameId);
    if (!game) {
      console.log('[UpdateQuest] Game not found:', { gameId });
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    // Find the quest to update
    const questIndex = game.quests.findIndex(q => {
      const currentName = typeof q.name === 'object' && q.name !== null && 'name' in q.name
        ? (q.name as { name: string }).name
        : q.name;
      return currentName === body.questName;
    });

    if (questIndex === -1) {
      console.log('[UpdateQuest] Quest not found:', { questName: body.questName });
      return NextResponse.json(
        { error: 'Quest not found' },
        { status: 404 }
      );
    }

    // Update the quest name
    game.quests[questIndex] = {
      ...game.quests[questIndex],
      name: { name: body.newQuestName }
    };

    // If the quest was completed, update the completedQuests array
    if (game.quests[questIndex].completedBy) {
      const team = game.quests[questIndex].completedBy;
      const oldQuestIndex = game.completedQuests[team].indexOf(body.questName);
      if (oldQuestIndex !== -1) {
        game.completedQuests[team][oldQuestIndex] = body.newQuestName;
      }
    }

    // Save updated game state
    await updateGame(gameId, game);
    console.log('[UpdateQuest] Quest updated successfully:', {
      gameId,
      oldName: body.questName,
      newName: body.newQuestName
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error('[UpdateQuest] Error updating quest:', error);
    return NextResponse.json(
      { error: 'Failed to update quest' },
      { status: 500 }
    );
  }
} 