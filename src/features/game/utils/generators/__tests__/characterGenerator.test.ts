import { characterGenerator } from '../characterGenerator';

describe('CharacterGenerator', () => {
  describe('角色生成', () => {
    test('生成正确数量的角色', () => {
      const characters = characterGenerator.generateCharacters(
        { rows: 3, cols: 3 },
        'A2',
        'B3'
      );

      expect(characters.length).toBe(9);
      expect(characters.filter(c => c.identity.isImpostor).length).toBe(1);
    });

    test('角色位置分配', () => {
      const characters = characterGenerator.generateCharacters(
        { rows: 3, cols: 3 },
        'A2',
        'B3'
      );

      // 检查位置分配
      const positions = characters.map(c => c.position);
      expect(positions).toContain('A1');
      expect(positions).toContain('A2');
      expect(positions).toContain('A3');
      expect(positions).toContain('B1');
      expect(positions).toContain('B2');
      expect(positions).toContain('B3');
      expect(positions).toContain('C1');
      expect(positions).toContain('C2');
      expect(positions).toContain('C3');
    });

    test('初始状态设置', () => {
      const characters = characterGenerator.generateCharacters(
        { rows: 3, cols: 3 },
        'A2',
        'B3'
      );

      // 检查开局角色状态
      const startCharacter = characters.find(c => c.position === 'A2');
      expect(startCharacter?.state).toBe('revealed');
      expect(startCharacter?.identity.isRevealed).toBeTruthy();

      // 检查其他角色状态
      const otherCharacters = characters.filter(c => c.position !== 'A2');
      otherCharacters.forEach(c => {
        expect(c.state).toBe('initial');
        expect(c.identity.isRevealed).toBeFalsy();
      });
    });

    test('坏人设置', () => {
      const characters = characterGenerator.generateCharacters(
        { rows: 3, cols: 3 },
        'A2',
        'B3'
      );

      const impostor = characters.find(c => c.position === 'B3');
      expect(impostor?.identity.isImpostor).toBeTruthy();

      const goodGuys = characters.filter(c => c.position !== 'B3');
      goodGuys.forEach(c => {
        expect(c.identity.isImpostor).toBeFalsy();
      });
    });
  });

  describe('边界情况', () => {
    test('处理无效的网格大小', () => {
      expect(() => {
        characterGenerator.generateCharacters(
          { rows: 0, cols: 0 },
          'A2',
          'B3'
        );
      }).toThrow();
    });

    test('处理无效的起始位置', () => {
      expect(() => {
        characterGenerator.generateCharacters(
          { rows: 3, cols: 3 },
          'D4',  // 超出范围的位置
          'B3'
        );
      }).toThrow();
    });
  });
}); 