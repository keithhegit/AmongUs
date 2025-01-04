import type { Character, Level, GameStatus } from './game';

export interface GameStore {
  // 状态
  currentLevel: number;
  characters: Character[];
  mistakes: number;
  isComplete: boolean;
  timeLimit: number;
  elapsedTime: number;
  impostorsFound: number;
  totalImpostors: number;
  revealedCharacters: string[];
  currentVoteType: 'good' | 'bad';
  selectedCharacter: Character | null;

  // 动作
  initLevel: (levelNumber: number) => void;
  revealCharacter: (characterId: string) => void;
  setVoteType: (voteType: 'good' | 'bad') => void;
  selectCharacter: (characterId: string | null) => void;
  submitVote: (characterId: string) => void;
  resetLevel: () => void;
}

export interface UIStore {
  // 状态
  loading: boolean;
  error: Error | null;
  modal: {
    isOpen: boolean;
    type: 'clue' | 'character' | 'result' | null;
  };

  // 动作
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  openModal: (type: 'clue' | 'character' | 'result') => void;
  closeModal: () => void;
}

export interface UserStore {
  // 状态
  currentUser: { id: string; name: string } | null;
  isAuthenticated: boolean;

  // 动作
  login: (name: string) => Promise<boolean>;
  register: (name: string) => Promise<void>;
  logout: () => void;
} 