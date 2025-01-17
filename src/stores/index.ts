import { makeAutoObservable } from 'mobx';
import type { Character, LevelConfig } from '@/shared/types/game';
import { levels } from '@/data/levels';
import { eventService } from '@/shared/services/EventService';

// 游戏状态持久化的 key
const GAME_STATE_KEY = 'AMONG_US_GAME_STATE';

// 需要持久化的游戏状态
interface GameState {
  currentLevelIndex: number;
  currentLevel: LevelConfig | null;
  characters: Character[];
  currentRound: number;
  mistakeCount: number;
  revealedPositions: string[];
  judgeMode: 'good' | 'bad';
  coins: number;
  remainingImpostors: number;
}

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
    this.loadGameState();
  }

  // 保存游戏状态到 localStorage
  private saveGameState() {
    const state: GameState = {
      currentLevelIndex: this.currentLevelIndex,
      currentLevel: this.currentLevel,
      characters: this.characters,
      currentRound: this.currentRound,
      mistakeCount: this.mistakeCount,
      revealedPositions: Array.from(this.revealedPositions),
      judgeMode: this.judgeMode,
      coins: this.coins,
      remainingImpostors: this.remainingImpostors
    };
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  }

  // 从 localStorage 加载游戏状态
  private loadGameState() {
    try {
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      if (savedState) {
        const state: GameState = JSON.parse(savedState);
        this.currentLevelIndex = state.currentLevelIndex;
        this.currentLevel = state.currentLevel;
        this.characters = state.characters;
        this.currentRound = state.currentRound;
        this.mistakeCount = state.mistakeCount;
        this.revealedPositions = new Set(state.revealedPositions);
        this.judgeMode = state.judgeMode;
        this.coins = state.coins;
        this.remainingImpostors = state.remainingImpostors;
        console.log('游戏状态已恢复');
      }
    } catch (error) {
      console.error('加载游戏状态失败:', error);
      this.clearGameState();
    }
  }

  // 清除游戏状态
  clearGameState() {
    localStorage.removeItem(GAME_STATE_KEY);
    this.currentLevel = null;
    this.currentLevelIndex = 0;
    this.characters = [];
    this.currentRound = 0;
    this.mistakeCount = 0;
    this.revealedPositions.clear();
    this.judgeMode = 'good';
    this.coins = 0;
    this.remainingImpostors = 0;
    this.showResultModal = false;
  }

  initLevel(level: LevelConfig) {
    console.log('初始化关卡:', level);
    if (!level) {
      console.error('关卡数据无效:', level);
      return;
    }
    
    this.currentLevel = level;
    this.characters = level.characters.map((char: Character) => {
      const startPositions = Array.isArray(level.startPosition) 
        ? level.startPosition 
        : [level.startPosition];
      
      return {
        ...char,
        state: startPositions.includes(char.position) ? 'revealed' : 'initial',
        identity: {
          ...char.identity,
          isRevealed: startPositions.includes(char.position)
        }
      };
    });
    
    this.currentRound = 0;
    this.mistakeCount = 0;
    this.revealedPositions = new Set(Array.isArray(level.startPosition) ? level.startPosition : [level.startPosition]);
    this.remainingImpostors = level.impostorCount;
    this.judgeMode = 'good';
    this.showResultModal = false;

    // 保存游戏状态
    this.saveGameState();
  }

  setJudgeMode = (mode: 'good' | 'bad') => {
    this.judgeMode = mode;
    this.saveGameState();
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
      // 发出判断成功事件
      eventService.emit('JUDGMENT_SUCCESS');
    } else {
      character.state = 'initial';
      character.identity.isRevealed = false;
      this.revealedPositions.delete(position);
      this.mistakeCount++;
      if (this.mistakeCount >= this.maxMistakes) {
        this.showResultModal = true;
      }
      // 发出判断失败事件
      eventService.emit('JUDGMENT_FAILURE');
    }

    // 检查是否所有非空位卡片都已翻开
    const nonBlankCharacters = this.characters.filter(char => !char.identity.isBlank);
    const revealedNonBlankPositions = Array.from(this.revealedPositions).filter(pos => {
      const char = this.characters.find(c => c.position === pos);
      return char && !char.identity.isBlank;
    });

    if (revealedNonBlankPositions.length === nonBlankCharacters.length) {
      this.showResultModal = true;
    }

    this.currentRound++;
    this.saveGameState();
  }

  nextLevel = () => {
    const nextIndex = this.currentLevelIndex + 1;
    if (nextIndex >= levels.length) {
      console.log('所有关卡完成！\n你耗光了基夫的脑力，\n请期待新关卡更新！');
      return;
    }

    this.currentLevelIndex = nextIndex;
    this.initLevel(levels[nextIndex]);
    this.saveGameState();
  }

  restartLevel = () => {
    if (this.currentLevel) {
      this.initLevel(this.currentLevel);
      this.saveGameState();
    }
  }

  get isGameOver() {
    return this.mistakeCount >= this.maxMistakes;
  }

  get isVictory() {
    // 获取非空位卡片
    const nonBlankCharacters = this.characters.filter(char => !char.identity.isBlank);
    const revealedNonBlankPositions = Array.from(this.revealedPositions).filter(pos => {
      const char = this.characters.find(c => c.position === pos);
      return char && !char.identity.isBlank;
    });

    return (
      // 所有非空位卡片都被翻开
      revealedNonBlankPositions.length === nonBlankCharacters.length &&
      // 且找出了所有坏人
      this.remainingImpostors === 0 &&
      // 且失败次数未达上限
      this.mistakeCount < this.maxMistakes
    );
  }

  get progress() {
    const nonBlankCharacters = this.characters.filter(char => !char.identity.isBlank);
    const revealedNonBlankPositions = Array.from(this.revealedPositions).filter(pos => {
      const char = this.characters.find(c => c.position === pos);
      return char && !char.identity.isBlank;
    });
    
    return {
      revealed: revealedNonBlankPositions.length,  // 已翻开的非空位卡片数
      total: nonBlankCharacters.length             // 总非空位卡片数
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