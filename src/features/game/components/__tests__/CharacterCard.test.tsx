import { render, fireEvent } from '@testing-library/react';
import { CharacterCard } from '../CharacterCard';

describe('CharacterCard', () => {
  const createMockCharacter = (overrides = {}) => ({
    id: 'A2',
    position: 'A2',
    name: '隆基',
    state: 'initial',
    identity: {
      isImpostor: false,
      isRevealed: false
    },
    clue: {
      text: '测试线索',
      type: 'direct',
      targetPosition: 'C3',
      isUsed: false
    },
    ...overrides
  });

  describe('渲染测试', () => {
    test('初始状态', () => {
      const { getByText, queryByText } = render(
        <CharacterCard
          character={createMockCharacter()}
          isSelected={false}
          onClick={() => {}}
        />
      );

      expect(getByText('隆基')).toBeInTheDocument();
      expect(getByText('A2')).toBeInTheDocument();
      expect(queryByText('测试线索')).not.toBeInTheDocument(); // 初始状态不显示线索
    });

    test('已揭示状态', () => {
      const { getByText } = render(
        <CharacterCard
          character={createMockCharacter({ state: 'revealed' })}
          isSelected={true}
          onClick={() => {}}
        />
      );

      expect(getByText('测试线索')).toBeInTheDocument();
    });

    test('坏人被发现状态', () => {
      const { getByText } = render(
        <CharacterCard
          character={createMockCharacter({
            state: 'completed',
            identity: { isImpostor: true, isRevealed: true }
          })}
          isSelected={true}
          onClick={() => {}}
        />
      );

      expect(getByText('已完成')).toBeInTheDocument();
    });
  });

  describe('交互测试', () => {
    test('点击事件', () => {
      const handleClick = jest.fn();
      const { container } = render(
        <CharacterCard
          character={createMockCharacter()}
          isSelected={false}
          onClick={handleClick}
        />
      );

      fireEvent.click(container.firstChild!);
      expect(handleClick).toHaveBeenCalled();
    });

    test('选中状态样式', () => {
      const { container } = render(
        <CharacterCard
          character={createMockCharacter()}
          isSelected={true}
          onClick={() => {}}
        />
      );

      expect(container.firstChild).toHaveClass('ring-2');
      expect(container.firstChild).toHaveClass('ring-blue-500');
    });
  });
}); 