import { levelGenerator } from '../levelGenerator';
import { clueGenerator } from '../clueGenerator';
import { characterGenerator } from '../characterGenerator';

jest.mock('../clueGenerator');
jest.mock('../characterGenerator');

describe('LevelGenerator', () => {
  beforeEach(() => {
    // Mock characterGenerator
    (characterGenerator.generateCharacters as jest.Mock).mockReturnValue([
      {
        id: 'A2',
        position: 'A2',
        name: '小明',
        state: 'revealed',
        identity: { isImpostor: false, isRevealed: true },
        clue: { text: '', type: 'direct', isUsed: false }
      },
      {
        id: 'B3',
        position: 'B3',
        name: '坏人',
        state: 'initial',
        identity: { isImpostor: true, isRevealed: false },
        clue: { text: '', type: 'deception', isUsed: false }
      }
    ]);

    // Mock clueGenerator
    (clueGenerator.generateClue as jest.Mock).mockReturnValue('这是一条测试线索');
  });

  describe('关卡生成', () => {
    test('基础关卡配置', () => {
      const level = levelGenerator.generateLevel(1);

      expect(level.id).toBe(1);
      expect(level.gridSize).toEqual({ rows: 3, cols: 3 });
      expect(level.impostorCount).toBe(1);
      expect(level.startPosition).toBeTruthy();
    });

    test('线索流程生成', () => {
      const level = levelGenerator.generateLevel(1);

      expect(level.clueFlow.steps).toBeDefined();
      expect(level.clueFlow.steps.length).toBeGreaterThan(0);
      
      // 检查第一步线索
      const firstStep = level.clueFlow.steps[0];
      expect(firstStep.fromPosition).toBe(level.startPosition);
      expect(firstStep.clueType).toBeDefined();
      expect(firstStep.targetInfo).toBeDefined();
    });

    test('角色生成调用', () => {
      levelGenerator.generateLevel(1);

      expect(characterGenerator.generateCharacters).toHaveBeenCalledWith(
        expect.any(Object), // gridSize
        expect.any(String), // startPosition
        expect.any(String)  // impostorPosition
      );
    });
  });

  describe('线索流程验证', () => {
    test('线索链完整性', () => {
      const level = levelGenerator.generateLevel(1);
      const steps = level.clueFlow.steps;

      // 检查线索链是否连续
      for (let i = 1; i < steps.length; i++) {
        const prevStep = steps[i - 1];
        const currentStep = steps[i];

        // 当前步骤的起点应该是上一步骤的目标
        if (prevStep.targetInfo.position) {
          expect(currentStep.fromPosition).toBe(prevStep.targetInfo.position);
        }
      }
    });

    test('线索类型分布', () => {
      const level = levelGenerator.generateLevel(1);
      const clueTypes = level.clueFlow.steps.map(step => step.clueType);

      // 确保有不同类型的线索
      expect(clueTypes).toContain('direct');
      expect(clueTypes).toContain('neighbor');
      expect(clueTypes).toContain('area');
    });
  });

  describe('难度调整', () => {
    test('更高关卡的复杂度', () => {
      const level1 = levelGenerator.generateLevel(1);
      const level2 = levelGenerator.generateLevel(2);

      // 第二关应该有更多的线索步骤
      expect(level2.clueFlow.steps.length).toBeGreaterThanOrEqual(
        level1.clueFlow.steps.length
      );
    });
  });

  describe('错误处理', () => {
    test('处理无效的关卡号', () => {
      expect(() => {
        levelGenerator.generateLevel(0);
      }).toThrow();

      expect(() => {
        levelGenerator.generateLevel(-1);
      }).toThrow();
    });

    test('处理生成器失败', () => {
      (characterGenerator.generateCharacters as jest.Mock).mockImplementation(() => {
        throw new Error('生成失败');
      });

      expect(() => {
        levelGenerator.generateLevel(1);
      }).toThrow('生成失败');
    });
  });
}); 