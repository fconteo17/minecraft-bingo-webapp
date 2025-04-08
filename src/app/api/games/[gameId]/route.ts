import { NextRequest, NextResponse } from 'next/server';
import { getGameById } from '@/utils/gameStorage';

export const dynamic = 'force-dynamic';

type Context = {
  params: Promise<{
    gameId: string;
  }>;
};

export async function GET(request: NextRequest, context: Context) {
  try {
    const { gameId } = await context.params;
    console.log('Fetching game with ID:', gameId);
    const game = await getGameById(gameId);

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 });
  }
}
