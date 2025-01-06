export enum ClueType {
  LOCATION = 'location',
  BEHAVIOR = 'behavior',
  RELATION = 'relation',
  PROFESSION = 'profession',
  TESTIMONY = 'testimony',
  REACTION = 'reaction',
  SYSTEM = 'system'
}

export interface Clue {
  id: string;
  clue_id: string;
  main_type: ClueType;
  sub_type: string;
  clue_text: string;
  reliability: number;
  complexity: number;
  is_template: boolean;
  variables: string[];
}

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
    type: 'direct' | 'neighbor' | 'area' | 'relation' | 'deception' | 'behavior';
    targetPosition?: string;
    targetArea?: string;
    highlightNames: string[];
    isUsed: boolean;
  };
}

export interface GameConfig {
  gridSize: number;
  impostorCount: number;
  maxMistakes: number;
  complexity: number;
  professionRate: number;
  clueCount: number;
}

export interface Level {
  id: string;
  level_number: number;
  grid_layout: GridLayout;
  evil_count: number;
  complexity: number;
  characters: Character[];
  created_at?: string;
}

export interface GridLayout {
  rows: number;
  cols: number;
  positions: string[];
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  currentLevel: number;
  characters: Character[];
  mistakes: number;
  isComplete: boolean;
  timeLimit: number;
  elapsedTime: number;
  impostorsFound: number;
  totalImpostors: number;
}

export enum GameStatus {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'paused',
  COMPLETE = 'complete',
  FAILED = 'failed'
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