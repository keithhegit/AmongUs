import { gameStore } from '../stores/gameStore';
import { levelGenerator } from '../utils/generators/levelGenerator';
import { level1 } from '@/data/levels';

describe('Game Integration', () => {
  beforeEach(() => {
    gameStore.initLevel(level1);
  });

  describe('完整游戏流程', () => {
    test('成功通关流程', () => {
      // 1. 验证初始状态
      expect(gameStore.currentRound).toBe(0);
      expect(gameStore.revealedPositions.size).toBe(1);

      // 2. 按照线索链点击
      level1.clueFlow.steps.forEach(step => {
        if (step.targetInfo.position) {
          gameStore.handleCharacterClick(step.targetInfo.position);
        }
      });

      // 3. 验证游戏结果
      expect(gameStore.isGameOver).toBeTruthy();
      expect(gameStore.isVictory).toBeTruthy();
    });

    test('失败流程', () => {
      // 连续错误点击
      for (let i = 0; i < gameStore.maxMistakes; i++) {
        gameStore.handleCharacterClick('A1');
      }

      expect(gameStore.isGameOver).toBeTruthy();
      expect(gameStore.isVictory).toBeFalsy();
    });
  });

  describe('关卡切换', () => {
    test('完整的关卡进程', () => {
      // 1. 完成第一关
      const impostor = gameStore.characters.find(c => c.identity.isImpostor);
      if (impostor) {
        gameStore.handleCharacterClick(impostor.position);
      }

      // 2. 进入第二关
      gameStore.nextLevel();
      expect(gameStore.currentLevel?.id).toBe(2);
      expect(gameStore.currentRound).toBe(0);
      expect(gameStore.mistakeCount).toBe(0);

      // 3. 验证第二关初始状态
      expect(gameStore.revealedPositions.size).toBe(1);
      expect(gameStore.characters.length).toBe(9);
    });
  });

  describe('状态持久化', () => {
    test('游戏状态保存和恢复', () => {
      // 1. 进行一些操作
      gameStore.handleCharacterClick('C3');
      
      // 2. 保存状态
      const savedState = JSON.stringify({
        currentLevel: gameStore.currentLevel,
        currentRound: gameStore.currentRound,
        revealedPositions: Array.from(gameStore.revealedPositions),
        mistakeCount: gameStore.mistakeCount
      });

      // 3. 重新初始化
      gameStore.initLevel(level1);

      // 4. 恢复状态
      const state = JSON.parse(savedState);
      gameStore.currentLevel = state.currentLevel;
      gameStore.currentRound = state.currentRound;
      gameStore.revealedPositions = new Set(state.revealedPositions);
      gameStore.mistakeCount = state.mistakeCount;

      // 5. 验证状态
      expect(gameStore.currentRound).toBe(1);
      expect(gameStore.revealedPositions.has('C3')).toBeTruthy();
    });
  });
}); 