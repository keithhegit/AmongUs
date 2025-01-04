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
  gender: 'male' | 'female';
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
  };
  clue: {
    text: string;
    isUsed: boolean;
    isEffective: boolean;
  };
  visual: {
    emoji: string;
    profession?: string;
    background: string;
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