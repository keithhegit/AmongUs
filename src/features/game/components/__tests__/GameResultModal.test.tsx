import { render, fireEvent } from '@testing-library/react';
import { GameResultModal } from '../GameResultModal';
import { gameStore } from '../../stores/gameStore';

jest.mock('../../stores/gameStore', () => ({
  gameStore: {
    isGameOver: true,
    isVictory: true,
    currentLevel: { id: 1 },
    restartLevel: jest.fn(),
    nextLevel: jest.fn()
  }
}));

describe('GameResultModal', () => {
  test('胜利状态', () => {
    const { getByText } = render(<GameResultModal />);
    expect(getByText('恭喜通关！')).toBeInTheDocument();
    expect(getByText('你成功完成了第 1 关！')).toBeInTheDocument();
  });

  test('按钮点击', () => {
    const { getByText } = render(<GameResultModal />);
    
    fireEvent.click(getByText('重新开始'));
    expect(gameStore.restartLevel).toHaveBeenCalled();

    fireEvent.click(getByText('下一关'));
    expect(gameStore.nextLevel).toHaveBeenCalled();
  });
}); 