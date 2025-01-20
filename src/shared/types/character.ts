export type CharacterGender = 'male' | 'female';
export type CharacterState = 'initial' | 'revealed' | 'completed';
export type ClueType = 'direct' | 'neighbor' | 'area' | 'relation' | 'deception' | 'behavior' | 'none';

export interface Clue {
  text: string;
  type: ClueType;
  targetPosition?: string;
  targetArea?: string;
  highlightNames: string[];
  isUsed: boolean;
  isEffective?: boolean;
}

export interface Character {
  // 基础信息
  id: string;
  position: string;  // A1, B2 等
  name: string;
  gender?: CharacterGender;
  
  // 身份信息
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
    isBlank?: boolean;  // 新增：标记是否为空位
  };
  
  // 视觉信息
  visual?: {
    emoji?: string;     // 基于职业的头像
    profession?: string;
    background?: string;
  };
  
  // 线索系统
  clue: Clue;
  
  // 状态
  state: CharacterState;
} 