import type { Character, CharacterState, Clue, ClueType } from './character';

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

export interface ClueFlowStep {
  round: number;
  fromPosition: string;
  clueType: ClueType;
  targetInfo: {
    position?: string;
    area?: string;
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
    steps: ClueFlowStep[];
  };
}