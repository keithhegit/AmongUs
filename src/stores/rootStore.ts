import { makeAutoObservable } from 'mobx';
import type { Character, LevelConfig } from '@/shared/types';

export class GameStore {
  currentLevel: LevelConfig | null = null;
  characters: Character[] = [];
  currentRound: number = 0;
  mistakeCount: number = 0;
  maxMistakes: number = 3;
  revealedPositions: Set<string> = new Set();
  judgeMode: 'good' | 'bad' = 'good';
  coins: number = 0;
  remainingImpostors: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  initLevel(level: LevelConfig) {
    this.currentLevel = level;
    this.characters = [...level.characters]; // 创建副本
    this.currentRound = 0;
    this.mistakeCount = 0;
    this.revealedPositions = new Set([level.startPosition]);
    this.remainingImpostors = level.impostorCount;
    this.judgeMode = 'good';
  }

  setJudgeMode = (mode: 'good' | 'bad') => {
    this.judgeMode = mode;
  }

  handleCharacterClick = (position: string) => {
    const character = this.characters.find(c => c.position === position);
    if (!character || character.state === 'completed') return;

    const isCorrectJudgement = 
      (this.judgeMode === 'good' && !character.identity.isImpostor) ||
      (this.judgeMode === 'bad' && character.identity.isImpostor);

    if (isCorrectJudgement) {
      character.state = 'completed';
      character.identity.isRevealed = true;
      this.revealedPositions.add(position);
      
      if (character.identity.isImpostor) {
        this.remainingImpostors--;
      }
      this.coins += 10;
    } else {
      this.mistakeCount++;
    }

    this.currentRound++;
  }
}

export class RootStore {
  gameStore: GameStore;

  constructor() {
    this.gameStore = new GameStore();
  }
}

export const rootStore = new RootStore();
export const gameStore = rootStore.gameStore; 