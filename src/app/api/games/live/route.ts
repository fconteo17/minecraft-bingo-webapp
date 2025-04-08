import { NextResponse } from 'next/server';
import { getLiveGame } from '@/utils/gameStorage';

export async function GET() {
  try {
    const game = await getLiveGame();
    return NextResponse.json({ game });
  } catch (error) {
    console.error('Error fetching live game:', error);
    return NextResponse.json({ error: 'Failed to fetch live game' }, { status: 500 });
  }
}
