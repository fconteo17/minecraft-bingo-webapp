export type TeamName = 'Red' | 'Blue';
export type PlayerName = string;
export type GameType = 'Teams' | 'Solo';

interface QuestName {
  name: string;
}

export interface Quest {
  name: string | QuestName;
  completedBy?: TeamName | PlayerName;
  completedByPlayer?: string;
  completedAt?: string;
}

export interface Game {
  id: string;
  timestamp: string;
  gameType: GameType;
  teams?: [TeamName, TeamName];
  players?: PlayerName[];
  quests: Quest[];
  winner?: TeamName | PlayerName;
  completedQuests: {
    [key: string]: string[];
  };
  ranked?: boolean;
}

export interface GameStartRequest {
  gameType: GameType;
  team1Name?: TeamName;
  team2Name?: TeamName;
  players?: PlayerName[];
  quests: string[];
}

export interface QuestCompletionRequest {
  gameId: string;
  teamName?: TeamName;
  playerName: string;
  questName: string;
} 