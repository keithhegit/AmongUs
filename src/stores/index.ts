import { makeAutoObservable } from 'mobx';
import type { Character, LevelConfig } from '@/shared/types';
import { levels } from '@/data/levels';

export class GameStore {
  currentLevel: LevelConfig | null = null;
  currentLevelIndex: number = 0;
  characters: Character[] = [];
  currentRound: number = 0;
  mistakeCount: number = 0;
  maxMistakes: number = 3;
  revealedPositions: Set<string> = new Set();
  judgeMode: 'good' | 'bad' = 'good';
  coins: number = 0;
  remainingImpostors: number = 0;
  showResultModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  initLevel(level: LevelConfig) {
    console.log('初始化关卡:', level);
    if (!level) {
      console.error('关卡数据无效:', level);
      return;
    }
    
    this.currentLevel = level;
    this.characters = level.characters.map(char => ({
      ...char,
      state: char.position === level.startPosition ? 'revealed' : 'initial',
      identity: {
        ...char.identity,
        isRevealed: char.position === level.startPosition
      }
    }));
    
    this.currentRound = 0;
    this.mistakeCount = 0;
    this.revealedPositions = new Set([level.startPosition]);
    this.remainingImpostors = level.impostorCount;
    this.judgeMode = 'good';
    this.showResultModal = false;
  }

  setJudgeMode = (mode: 'good' | 'bad') => {
    this.judgeMode = mode;
  }

  handleCharacterClick = (position: string) => {
    const character = this.characters.find(c => c.position === position);
    if (!character || character.state === 'completed') return;

    // 无论判定结果如何，都设置为已揭示状态
    character.state = 'revealed';
    character.identity.isRevealed = true;
    this.revealedPositions.add(position);

    // 判定是否正确
    const isCorrectJudgement = 
      (this.judgeMode === 'good' && !character.identity.isImpostor) ||
      (this.judgeMode === 'bad' && character.identity.isImpostor);

    if (isCorrectJudgement) {
      if (character.identity.isImpostor) {
        this.remainingImpostors--;
      }
      character.state = 'completed';
      this.coins += 10;
    } else {
      this.mistakeCount++;
    }

    // 只有在所有卡片都翻开后才检查是否显示结果
    if (this.revealedPositions.size === this.characters.length) {
      this.showResultModal = true;
    }

    this.currentRound++;
  }

  nextLevel = () => {
    const nextIndex = this.currentLevelIndex + 1;
    if (nextIndex >= levels.length) {
      console.log('所有关卡完成！');
      return;
    }

    // 前10关不需要金币
    if (nextIndex < 10) {
      this.currentLevelIndex = nextIndex;
      this.initLevel(levels[nextIndex]);
      return;
    }

    // 第10关之后的金币要求
    const requiredCoins = (nextIndex - 9) * 100; // 从第11关开始，每关增加100金币
    if (this.coins < requiredCoins) {
      console.log(`需要${requiredCoins}金币才能解锁下一关`);
      return;
    }

    this.currentLevelIndex = nextIndex;
    this.initLevel(levels[nextIndex]);
  }

  restartLevel = () => {
    if (this.currentLevel) {
      this.initLevel(this.currentLevel);
    }
  }

  get isGameOver() {
    return this.mistakeCount >= this.maxMistakes;
  }

  get isVictory() {
    return (
      // 所有卡片都被翻开
      this.revealedPositions.size === this.characters.length &&
      // 且找出了所有坏人
      this.remainingImpostors === 0 &&
      // 且失败次数未达上限
      this.mistakeCount < this.maxMistakes
    );
  }

  get progress() {
    return {
      revealed: this.revealedPositions.size,  // 已翻开的卡片数
      total: this.characters.length           // 总卡片数
    };
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