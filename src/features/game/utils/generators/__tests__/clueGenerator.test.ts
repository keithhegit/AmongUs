import { clueGenerator } from '../clueGenerator';

describe('ClueGenerator', () => {
  describe('直接线索生成', () => {
    test('生成好人线索', () => {
      const clue = clueGenerator.generateClue({
        type: 'direct',
        target: '小明',
        reason: '他帮过我'
      });

      expect(clue).toMatch(/小明/);
      expect(clue).toMatch(/他帮过我/);
    });

    test('生成关系线索', () => {
      const clue = clueGenerator.generateClue({
        type: 'relation',
        target: '小明',
        reason: '一起工作很久了'
      });

      expect(clue).toMatch(/小明/);
      expect(clue).toMatch(/一起工作很久了/);
    });
  });

  describe('区域线索生成', () => {
    test('生成邻居线索', () => {
      const clue = clueGenerator.generateClue({
        type: 'neighbor',
        position: 'B2'
      });

      expect(clue).toMatch(/B2/);
      expect(clue).toMatch(/附近|周围/);
    });

    test('生成区域线索', () => {
      const clue = clueGenerator.generateClue({
        type: 'area',
        area: 'A'
      });

      expect(clue).toMatch(/A区|A排/);
      expect(clue).toMatch(/好人/);
    });
  });

  describe('变量替换', () => {
    test('替换所有变量', () => {
      const clue = clueGenerator.generateClue({
        type: 'direct',
        target: '小明',
        position: 'B2',
        reason: '他很可靠'
      });

      expect(clue).toMatch(/小明/);
      expect(clue).not.toMatch(/{target}/);
      expect(clue).not.toMatch(/{position}/);
      expect(clue).not.toMatch(/{reason}/);
    });

    test('处理缺失变量', () => {
      const clue = clueGenerator.generateClue({
        type: 'direct',
        target: '小明'
        // 缺少 reason
      });

      expect(clue).toMatch(/小明/);
      expect(clue).not.toMatch(/{target}/);
      expect(clue).not.toMatch(/{reason}/); // 应该有默认值或被清空
    });
  });
}); 