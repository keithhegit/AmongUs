import { create } from 'zustand';
import type { Character } from '@/shared/types';
import { levelGenerator } from '@/features/game/utils/generators/levelGenerator';
import { LOCAL_LEVELS, regenerateLevels } from '@/data/levels/index';
import { useLevelStore } from '@/store/level/levelStore';

interface GameState {
  // 游戏状态
  currentLevel: number;
  characters: Character[];
  mistakes: number;
  isComplete: boolean;
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
  resetAllLevels: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // 初始状态
  currentLevel: 1,
  characters: [],
  mistakes: 0,
  isComplete: false,
  elapsedTime: 0,
  impostorsFound: 0,
  totalImpostors: 0,
  revealedCharacters: [],
  currentVoteType: 'good',
  selectedCharacter: null,

  // 动作实现
  initLevel: (levelNumber) => {
    if (!levelNumber) {
      console.error('Invalid level number');
      return;
    }

    console.log('Initializing level:', levelNumber);
    
    const levelConfig = LOCAL_LEVELS[levelNumber];
    if (!levelConfig) {
      console.error('Level not found:', levelNumber);
      return;
    }
    
    // 更新状态
    set({
      currentLevel: levelNumber,
      characters: levelConfig.characters,
      mistakes: 0,
      isComplete: false,
      elapsedTime: 0,
      impostorsFound: 0,
      totalImpostors: levelConfig.impostorCount,
      revealedCharacters: [],
      currentVoteType: 'good',
      selectedCharacter: null
    });
  },

  revealCharacter: (characterId) => {
    const state = get();
    if (state.revealedCharacters.includes(characterId)) return;

    set(state => ({
      revealedCharacters: [...state.revealedCharacters, characterId]
    }));
  },

  setVoteType: (voteType) => {
    set({ currentVoteType: voteType });
  },

  selectCharacter: (characterId) => {
    const character = characterId 
      ? get().characters.find(c => c.id === characterId)
      : null;
    set({ selectedCharacter: character || null });
  },

  submitVote: (characterId) => {
    const state = get();
    const character = state.characters.find(c => c.id === characterId);
    
    if (!character) return;

    // 揭示角色
    get().revealCharacter(characterId);

    // 检查投票是否正确
    const isCorrectVote = (
      (state.currentVoteType === 'good' && !character.identity.isImpostor) ||
      (state.currentVoteType === 'bad' && character.identity.isImpostor)
    );

    if (!isCorrectVote) {
      set(state => ({ mistakes: state.mistakes + 1 }));
    } else if (character.identity.isImpostor) {
      set(state => ({ impostorsFound: state.impostorsFound + 1 }));
    }

    // 检查游戏是否结束
    const updatedState = get();
    if (
      updatedState.impostorsFound >= updatedState.totalImpostors ||
      updatedState.mistakes >= 3
    ) {
      set({ isComplete: true });
      
      // 如果成功通关，解锁下一关
      if (updatedState.impostorsFound >= updatedState.totalImpostors) {
        const nextLevel = updatedState.currentLevel + 1;
        useLevelStore.getState().unlockLevel(nextLevel);
      }
    }
  },

  resetLevel: () => {
    const state = get();
    get().initLevel(state.currentLevel);
  },

  resetAllLevels: () => {
    const newLevels = regenerateLevels();
    // 可以在这里添加重置后的其他逻辑
  }
})); 