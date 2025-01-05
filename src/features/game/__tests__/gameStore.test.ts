import { GameStore } from '../../../stores';
import { level1 } from '../../../data/levels/level1';

describe('GameStore', () => {
  let gameStore: GameStore;

  beforeEach(() => {
    gameStore = new GameStore();
    gameStore.initLevel(level1);
  });

  describe('初始状态', () => {
    it('应该正确初始化坏人数量', () => {
      // level1 有2个坏人
      expect(gameStore.remainingEvil).toBe(2);
    });

    it('应该正确设置起始位置的状态', () => {
      const startChar = gameStore.characters.find(c => c.position === level1.startPosition);
      expect(startChar?.identity.isRevealed).toBe(true);
      expect(startChar?.state).toBe('revealed');
    });
  });

  describe('游戏流程', () => {
    it('揭示好人时不应减少坏人计数', () => {
      // A1是好人
      const beforeCount = gameStore.remainingEvil;
      gameStore.handleCharacterClick('A1');
      expect(gameStore.remainingEvil).toBe(beforeCount);
    });

    it('揭示坏人时应减少坏人计数', () => {
      // A3是坏人
      const beforeCount = gameStore.remainingEvil;
      gameStore.handleCharacterClick('A3');
      expect(gameStore.remainingEvil).toBe(beforeCount - 1);
    });

    it('找出所有坏人且错误次数在限制内时应该胜利', () => {
      // A3和B1是坏人
      gameStore.handleCharacterClick('A3');
      gameStore.handleCharacterClick('B1');
      expect(gameStore.isVictory).toBe(true);
      expect(gameStore.showResultModal).toBe(true);
    });

    it('错误次数达到上限时应该显示结算', () => {
      // 连续点击3个好人，设置为bad模式
      gameStore.setJudgeMode('bad');
      gameStore.handleCharacterClick('A1');
      gameStore.handleCharacterClick('A2');
      gameStore.handleCharacterClick('B2');
      expect(gameStore.mistakeCount).toBe(3);
      expect(gameStore.showResultModal).toBe(true);
    });
  });

  describe('状态更新', () => {
    it('正确判断时应该更新角色状态和金币', () => {
      gameStore.setJudgeMode('bad');
      gameStore.handleCharacterClick('A3'); // A3是坏人
      const character = gameStore.characters.find(c => c.position === 'A3');
      expect(character?.state).toBe('completed');
      expect(gameStore.coins).toBe(10);
    });

    it('错误判断时应该增加错误计数', () => {
      gameStore.setJudgeMode('bad');
      gameStore.handleCharacterClick('A1'); // A1是好人
      expect(gameStore.mistakeCount).toBe(1);
    });
  });
}); 