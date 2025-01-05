import { render, screen, fireEvent, act } from '@testing-library/react';
import { GameLayout } from '../GameLayout';

const mockLevel = {
  id: 1,
  characters: [
    {
      id: 'good-1',
      name: '张三',
      identity: { isImpostor: false },
      clues: []
    },
    {
      id: 'bad-1',
      name: '李四',
      identity: { isImpostor: true },
      clues: []
    }
  ],
  impostorCount: 1
};

describe('GameLayout', () => {
  const onLevelComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with first good character revealed', () => {
    render(
      <GameLayout 
        level={mockLevel}
        onLevelComplete={onLevelComplete}
      />
    );

    expect(screen.getByText('张三')).toBeInTheDocument();
  });

  it('handles correct impostor identification', async () => {
    render(
      <GameLayout 
        level={mockLevel}
        onLevelComplete={onLevelComplete}
      />
    );

    // 选择坏人
    fireEvent.click(screen.getByText('李四'));
    
    // 切换到坏人模式
    fireEvent.click(screen.getByText('坏人'));
    
    // 确认判定
    fireEvent.click(screen.getByText('确定'));

    // 应该显示胜利弹窗
    expect(screen.getByText('恭喜通关！')).toBeInTheDocument();
  });

  it('handles mistakes correctly', () => {
    render(
      <GameLayout 
        level={mockLevel}
        onLevelComplete={onLevelComplete}
      />
    );

    // 错误判定好人为坏人
    fireEvent.click(screen.getByText('张三'));
    fireEvent.click(screen.getByText('坏人'));
    fireEvent.click(screen.getByText('确定'));

    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });
}); 