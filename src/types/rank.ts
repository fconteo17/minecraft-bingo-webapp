export type RankTier =
  | 'Potato'
  | 'Coal'
  | 'Copper'
  | 'Ferro'
  | 'Gold'
  | 'Diamond'
  | 'Emerald'
  | 'Netherite'
  | 'Dragon'
  | 'Nether Star';
export type RankDivision = 'I' | 'II' | 'III';

export interface PlayerRank {
  playerId: string;
  playerName: string;
  mmr: number;
  tier: RankTier;
  division: RankDivision | null; // null for Potato and Nether Star
  updatedAt: Date;
}

export const RANK_THRESHOLDS = {
  Potato: { min: 0, max: 49, divisions: null },
  Coal: { min: 50, max: 199, divisions: ['III', 'II', 'I'] },
  Copper: { min: 200, max: 349, divisions: ['III', 'II', 'I'] },
  Ferro: { min: 350, max: 499, divisions: ['III', 'II', 'I'] },
  Gold: { min: 500, max: 649, divisions: ['III', 'II', 'I'] },
  Diamond: { min: 650, max: 799, divisions: ['III', 'II', 'I'] },
  Emerald: { min: 800, max: 949, divisions: ['III', 'II', 'I'] },
  Netherite: { min: 950, max: 1099, divisions: ['III', 'II', 'I'] },
  Dragon: { min: 1100, max: 1249, divisions: ['III', 'II', 'I'] },
  'Nether Star': { min: 1250, max: Infinity, divisions: null },
} as const;

export function calculateRank(mmr: number): { tier: RankTier; division: RankDivision | null } {
  for (const [tier, { min, max, divisions }] of Object.entries(RANK_THRESHOLDS)) {
    if (mmr >= min && mmr <= max) {
      if (!divisions) {
        return { tier: tier as RankTier, division: null };
      }

      const range = max - min;
      const divisionSize = range / 3;
      const divisionIndex = Math.floor((mmr - min) / divisionSize);
      const division = divisions[Math.min(divisionIndex, 2)] as RankDivision;

      return { tier: tier as RankTier, division };
    }
  }
  return { tier: 'Nether Star', division: null };
}
