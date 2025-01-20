import { makeAutoObservable } from 'mobx';
import type { Character, LevelConfig } from '@/shared/types/game';

class GameStore {
  currentLevel: LevelConfig | null = null;
  characters: Character[] = [];
  currentRound: number = 0;
  mistakeCount: number = 0;
  maxMistakes: number = 3;
  revealedPositions: Set<string> = new Set();
  judgeMode: 'good' | 'bad' = 'good';
  coins: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  initLevel(level: LevelConfig) {
    if (!level || !level.characters || !level.startPosition) {
      console.error('无效的关卡配置:', level);
      return;
    }

    try {
      this.currentLevel = level;
      const startPositions = Array.isArray(level.startPosition) 
        ? level.startPosition 
        : [level.startPosition];

      this.characters = level.characters.map((char: Character) => ({
        ...char,
        state: startPositions.includes(char.position) ? 'revealed' : 'initial',
        identity: {
          ...char.identity,
          isRevealed: startPositions.includes(char.position)
        }
      }));
      this.currentRound = 0;
      this.mistakeCount = 0;
      this.revealedPositions = new Set(startPositions);
      this.judgeMode = 'good';
      console.log('关卡初始化成功:', level.id);
    } catch (error) {
      console.error('关卡初始化失败:', error);
    }
  }

  handleCharacterClick(position: string) {
    if (!this.characters || !this.currentLevel) return;

    const character = this.characters.find(c => c.position === position);
    if (!character || character.state === 'completed') return;

    // 判定是否正确
    const isCorrectJudgement = 
      (this.judgeMode === 'good' && !character.identity.isImpostor) ||
      (this.judgeMode === 'bad' && character.identity.isImpostor);

    if (isCorrectJudgement) {
      character.state = 'completed';
      character.identity.isRevealed = true;
      this.revealedPositions.add(position);
      this.coins += 10;
    } else {
      this.mistakeCount++;
      if (this.mistakeCount >= this.maxMistakes) {
        // TODO: 显示游戏结束弹窗
      }
    }

    this.currentRound++;
  }

  setJudgeMode(mode: 'good' | 'bad') {
    this.judgeMode = mode;
    console.log('当前模式:', mode);
  }

  get isGameOver() {
    return this.mistakeCount >= this.maxMistakes;
  }

  get isVictory() {
    return this.revealedPositions.size === this.characters.length;
  }

  get progress() {
    return {
      revealed: this.revealedPositions.size,
      total: this.characters.length
    };
  }

  get isLevelComplete() {
    return this.revealedPositions.size === this.characters.length;
  }
}

export const gameStore = new GameStore(); 