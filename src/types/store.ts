import type { Character, Level, GameStatus, ClueType } from './game';

export interface RootStore {
  gameStore: GameStore;
  uiStore: UIStore;
  configStore: ConfigStore;
}

export interface GameStore {
  currentLevel: Level | null;
  selectedCharacter: Character | null;
  gameStatus: GameStatus;
  mistakes: number;
  score: number;
  
  // 方法
  loadLevel(levelNumber: number): Promise<void>;
  selectCharacter(character: Character | null): void;
  makeJudgment(character: Character, isEvil: boolean): boolean;
  useClue(character: Character): void;
  resetLevel(): void;
}

export interface UIStore {
  judgmentMode: {
    isActive: boolean;
    type: 'good' | 'evil';
  };
  loading: boolean;
  error: Error | null;
  modal: {
    isOpen: boolean;
    type: 'clue' | 'character' | 'result' | null;
  };
}

export interface ConfigStore {
  gridLayout: {
    columns: string[];
    rows: number[];
    maxColumns: number;
    maxRows: number;
  };
  difficulty: {
    evilCount: number;
    complexity: number;
    maxMistakes: number;
  };
} 