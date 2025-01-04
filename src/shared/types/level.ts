export interface LevelStatus {
  isUnlocked: boolean;
  isCompleted: boolean;
  stars: number;
  bestScore: number;
  bestTime: number;
}

export interface LevelRequirement {
  previousLevel: number;
  minStars: number;
  coinsRequired: number;
}

export interface LevelReward {
  coins: number;
  stars: number;
  achievements?: string[];
} 