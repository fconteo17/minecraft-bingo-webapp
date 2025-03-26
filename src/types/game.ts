export type TeamName = 'Red' | 'Blue';

interface QuestName {
  name: string;
}

export interface Quest {
  name: string | QuestName;
  completedBy?: TeamName;
  completedByPlayer?: string;
  completedAt?: string;
}

export interface Game {
  id: string;
  timestamp: string;
  teams: [TeamName, TeamName];
  quests: Quest[];
  winner?: TeamName;
  completedQuests: {
    [K in TeamName]: string[];
  };
}

export interface GameStartRequest {
  team1Name: TeamName;
  team2Name: TeamName;
  quests: string[];
}

export interface QuestCompletionRequest {
  gameId: string;
  teamName: TeamName;
  playerName: string;
  questName: string;
} 