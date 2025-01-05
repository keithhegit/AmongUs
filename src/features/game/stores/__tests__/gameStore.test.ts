import { gameStore } from '../gameStore';
import { level1, level2 } from '@/data/levels';

describe('GameStore', () => {
  beforeEach(() => {
    gameStore.initLevel(level1);
  });

  describe('初始化测试', () => {
    test('基础初始化', () => {
      expect(gameStore.currentLevel).toBeTruthy();
      expect(gameStore.characters.length).toBe(9);
      expect(gameStore.currentRound).toBe(0);
      expect(gameStore.revealedPositions.size).toBe(1);
      expect(gameStore.revealedPositions.has('A2')).toBeTruthy();
    });

    test('重新初始化', () => {
      // 先进行一些操作
      gameStore.handleCharacterClick('C3');
      gameStore.handleCharacterClick('A1'); // 错误点击
      
      // 重新初始化
      gameStore.initLevel(level1);
      expect(gameStore.currentRound).toBe(0);
      expect(gameStore.mistakeCount).toBe(0);
      expect(gameStore.isGameOver).toBe(false);
    });
  });

  describe('位置计算测试', () => {
    test('正常位置的邻居', () => {
      const neighbors = gameStore.getNeighborPositions('B2');
      expect(neighbors).toEqual(['A1', 'A2', 'A3', 'B1', 'B3', 'C1', 'C2', 'C3']);
    });

    test('边角位置的邻居', () => {
      const cornorNeighbors = gameStore.getNeighborPositions('A1');
      expect(cornorNeighbors).toEqual(['A2', 'B1', 'B2']);
    });
  });

  describe('游戏流程测试', () => {
    test('正确点击流程', () => {
      // 第一步：点击C3（正确）
      gameStore.handleCharacterClick('C3');
      expect(gameStore.currentRound).toBe(1);
      expect(gameStore.revealedPositions.has('C3')).toBeTruthy();

      // 第二步：点击错误位置
      gameStore.handleCharacterClick('A1');
      expect(gameStore.mistakeCount).toBe(1);
      expect(gameStore.revealedPositions.has('A1')).toBeFalsy();
    });

    test('游戏失败条件', () => {
      // 连续错误点击
      for (let i = 0; i < gameStore.maxMistakes; i++) {
        gameStore.handleCharacterClick('A1');
      }
      
      expect(gameStore.isGameOver).toBeTruthy();
      expect(gameStore.isVictory).toBeFalsy();
    });

    test('游戏胜利条件', () => {
      // 模拟找到坏人
      const impostor = gameStore.characters.find(c => c.identity.isImpostor);
      if (impostor) {
        gameStore.handleCharacterClick(impostor.position);
        expect(gameStore.isGameOver).toBeTruthy();
        expect(gameStore.isVictory).toBeTruthy();
      }
    });
  });

  describe('关卡切换测试', () => {
    test('进入下一关', () => {
      gameStore.nextLevel();
      expect(gameStore.currentLevel?.id).toBe(2);
      expect(gameStore.currentRound).toBe(0);
      expect(gameStore.mistakeCount).toBe(0);
    });

    test('重新开始当前关卡', () => {
      // 先进行一些操作
      gameStore.handleCharacterClick('C3');
      gameStore.handleCharacterClick('A1');
      
      // 重新开始
      gameStore.restartLevel();
      expect(gameStore.currentRound).toBe(0);
      expect(gameStore.mistakeCount).toBe(0);
      expect(gameStore.isGameOver).toBeFalsy();
    });
  });
}); 