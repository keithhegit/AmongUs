export interface GameProgress {
  userId: string;
  levelId: string;
  currentState: {
    selectedCharacterId: string | null;
    revealedCharacters: string[];
    usedClues: string[];
    mistakes: number;
    maxUnlockedLevel: number;
  };
}

export interface ProgressState {
  isSaving: boolean;
  lastSaved: Date | null;
  error: Error | null;
  maxUnlockedLevel: number;
}