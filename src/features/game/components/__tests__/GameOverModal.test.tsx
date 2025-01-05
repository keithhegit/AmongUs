import { render, screen, fireEvent } from '@testing-library/react';
import { GameOverModal } from '../GameOverModal';

describe('GameOverModal', () => {
  const defaultProps = {
    isOpen: true,
    success: true,
    level: 1,
    mistakes: 1,
    onRestart: jest.fn(),
    onNext: jest.fn(),
    onClose: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders success state correctly', () => {
    render(<GameOverModal {...defaultProps} />);
    
    expect(screen.getByText('恭喜通关！')).toBeInTheDocument();
    expect(screen.getByText('你成功找出了所有的坏人！')).toBeInTheDocument();
    expect(screen.getByText('下一关')).toBeInTheDocument();
  });

  it('renders failure state correctly', () => {
    render(<GameOverModal {...defaultProps} success={false} />);
    
    expect(screen.getByText('游戏结束')).toBeInTheDocument();
    expect(screen.getByText('很遗憾，错误次数太多了')).toBeInTheDocument();
    expect(screen.queryByText('下一关')).not.toBeInTheDocument();
  });

  it('calculates score correctly', () => {
    render(<GameOverModal {...defaultProps} mistakes={2} />);
    expect(screen.getByText('60 分')).toBeInTheDocument();
  });

  it('handles button clicks', () => {
    render(<GameOverModal {...defaultProps} />);
    
    fireEvent.click(screen.getByText('重新开始'));
    expect(defaultProps.onRestart).toHaveBeenCalled();

    fireEvent.click(screen.getByText('下一关'));
    expect(defaultProps.onNext).toHaveBeenCalled();
  });
}); 