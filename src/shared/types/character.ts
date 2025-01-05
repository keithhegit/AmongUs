export type CharacterGender = 'male' | 'female';
export type CharacterState = 'initial' | 'revealed' | 'completed';

export interface Character {
  // 基础信息
  id: string;
  position: string;  // A1, B2 等
  name: string;
  gender: CharacterGender;
  
  // 身份信息
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
  };
  
  // 视觉信息
  visual: {
    emoji: string;     // 基于职业的头像
    profession: string;
    background: string;
  };
  
  // 线索系统
  clue: {
    text: string;      // 原始线索文本
    targets: string[]; // 线索中提到的其他角色ID
    isUsed: boolean;
    isEffective: boolean;
  };
  
  // 状态
  state: CharacterState;
} 