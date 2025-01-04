import { create } from 'zustand';
import type { Character } from '@/shared/types';
import { characterGenerator } from '@/features/game/utils/generators/characterGenerator';

interface GameState {
  // 游戏状态
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

export const useGameStore = create<GameState>((set, get) => ({
  // 初始状态
  currentLevel: 1,
  characters: [],
  mistakes: 0,
  isComplete: false,
  timeLimit: 300,
  elapsedTime: 0,
  impostorsFound: 0,
  totalImpostors: 0,
  revealedCharacters: [],
  currentVoteType: 'good',
  selectedCharacter: null,

  // 动作实现
  initLevel: (levelNumber) => {
    console.log('Initializing level:', levelNumber);
    
    // 根据关卡计算网格大小和坏人数量
    const gridSize = Math.min(3 + Math.floor(levelNumber / 5), 5);
    const impostorCount = Math.min(1 + Math.floor(levelNumber / 3), 4);
    
    // 生成角色
    const characters = characterGenerator.generateCharacters(
      gridSize * gridSize,
      impostorCount,
      { rows: gridSize, cols: gridSize }
    );
    
    console.log('Generated characters:', characters);

    // 更新状态
    set({
      currentLevel: levelNumber,
      characters,
      mistakes: 0,
      isComplete: false,
      timeLimit: 300,
      elapsedTime: 0,
      impostorsFound: 0,
      totalImpostors: impostorCount,
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
    }
  },

  resetLevel: () => {
    const state = get();
    get().initLevel(state.currentLevel);
  }
})); 