export interface GameStatistics {
  totalGames: number;
  gamesWon: number;
  gamesLost: number;
  totalMistakes: number;
  cluesUsed: number;
  averageTimePerLevel: number; // in seconds
  fastestLevel: number; // in seconds
  charactersRevealed: number;
}

export interface LevelStatistics {
  levelId: string;
  startTime: Date;
  endTime?: Date;
  mistakes: number;
  cluesUsed: string[];
  revealedCharacters: string[];
  outcome?: 'victory' | 'defeat';
}