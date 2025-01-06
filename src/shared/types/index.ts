export * from './game';
export * from './user';
export * from './level'; 

export interface Character {
  id: string;
  position: string;
  name: string;
  state: 'initial' | 'revealed' | 'completed';
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
  };
  clue: {
    text: string;
    type: 'direct' | 'neighbor' | 'area' | 'relation';
    targetPosition?: string;
    isUsed: boolean;
  };
} 

export interface LevelConfig {
  id: number;
  gridSize: {
    rows: number;
    cols: number;
  };
  startPosition: string | string[];
  impostorCount: number;
  characters: Character[];
  clueFlow: {
    steps: {
      round: number;
      fromPosition: string;
      clueType: 'direct' | 'neighbor' | 'area' | 'relation';
      targetInfo: {
        position?: string;
        area?: string;
      };
    }[];
  };
} 