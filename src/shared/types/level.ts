import type { Character, ClueType } from './character';

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

export interface ClueFlowStep {
  fromId: string;      // 提供线索的角色ID
  possibleTargets: string[];  // 可能的目标角色ID
  type: ClueType;  // 线索类型
}

export interface ClueChain {
  startCharacterId: string;
  steps: Array<{
    fromCharacterId: string;
    toCharacterId: string;
    clueText: string;
  }>;
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
  startPosition: string | string[];  // 开局显示的好人位置
  
  // 线索流程
  clueFlow: {
    steps: ClueFlowStep[];
  };
} 