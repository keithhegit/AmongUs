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

export interface LevelConfig {
  id: number;
  gridSize: {
    rows: number;
    cols: number;
  };
  characters: Character[];
  impostorCount: number;
  
  // 初始状态
  startCharacterId: string;  // 开局显示的好人ID
  
  // 线索流程
  clueFlow: {
    steps: Array<{
      fromId: string;      // 提供线索的角色ID
      possibleTargets: string[];  // 可能的目标角色ID
      type: 'location' | 'neighbor' | 'exclusion';  // 线索类型
    }>;
    finalTarget: string;   // 最终指向的坏人ID
  };
}

export interface ClueChain {
  startCharacterId: string;
  steps: Array<{
    fromCharacterId: string;
    toCharacterId: string;
    clueText: string;
  }>;
} 