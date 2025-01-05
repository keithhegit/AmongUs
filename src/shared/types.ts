export type ClueType = 'direct' | 'neighbor' | 'area' | 'relation' | 'behavior';

export interface Clue {
  text: string;
  type: ClueType;
  targetPosition?: string;
  highlightNames: string[];
  isUsed: boolean;
}

export interface GridSize {
  rows: number;  // 支持3行或4行
  cols: number;  // 支持3列
}

export interface Character {
  id: string;
  position: string;
  name: string;  // 现在包含职业信息，如 "小泉(警察)"
  state: CharacterState;
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
  };
  clue: Clue;
} 