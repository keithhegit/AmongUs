import { makeAutoObservable } from 'mobx';
import type { GameState, Character, GameConfig } from '@/types/game';
import { LevelGenerator } from '@/utils/generators/levelGenerator';
import { persistenceManager } from './persistence';

export class GameStore {
  currentLevel: number = 1;
  coins: number = 0;
  characters: Character[] = [];
  mistakes: number = 0;
  isComplete: boolean = false;
  
  private levelGenerator = new LevelGenerator();

  constructor() {
    makeAutoObservable(this);
    this.currentLevel = persistenceManager.getCurrentLevel();
    this.coins = persistenceManager.getCoins();
  }

  startLevel(levelNumber: number) {
    const level = this.levelGenerator.generateLevel(levelNumber);
    this.currentLevel = level.number;
    this.characters = level.characters;
    this.mistakes = 0;
    this.isComplete = false;
    persistenceManager.setCurrentLevel(levelNumber);
  }

  revealCharacter(position: string) {
    const character = this.characters.find(c => c.position === position);
    if (character && !character.identity.isRevealed) {
      character.identity.isRevealed = true;
      this.checkGameComplete();
    }
  }

  private checkGameComplete() {
    if (this.characters.every(char => char.identity.isRevealed)) {
      this.isComplete = true;
      const coinsEarned = 10;
      this.coins += coinsEarned;
      persistenceManager.addCoins(coinsEarned);
      persistenceManager.unlockLevel(this.currentLevel + 1);
    }
  }

  resetLevel() {
    this.startLevel(this.currentLevel);
  }

  nextLevel() {
    this.startLevel(this.currentLevel + 1);
  }
}

export const gameStore = new GameStore();