import { NextResponse } from 'next/server';
import { getAllPlayerRanks } from '@/utils/db/models/PlayerRank';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rankings = await getAllPlayerRanks();
    return NextResponse.json(rankings);
  } catch (error) {
    console.error('[Rankings] Error fetching rankings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rankings' },
      { status: 500 }
    );
  }
} 