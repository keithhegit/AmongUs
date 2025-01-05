import { render } from '@testing-library/react';
import { GameHeader } from '../GameHeader';
import { gameStore } from '../../stores/gameStore';

jest.mock('../../stores/gameStore', () => ({
  gameStore: {
    currentLevel: { id: 1, impostorCount: 1 },
    currentRound: 0,
    revealedPositions: new Set(['A2']),
    getCompletedImpostors: () => 0
  }
}));

describe('GameHeader', () => {
  test('显示游戏状态', () => {
    const { getByText } = render(<GameHeader />);
    
    expect(getByText('第 1 关')).toBeInTheDocument();
    expect(getByText('已揭示: 1 / 9')).toBeInTheDocument();
    expect(getByText('回合: 1')).toBeInTheDocument();
    expect(getByText('剩余坏人: 1')).toBeInTheDocument();
  });
}); 