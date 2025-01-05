import { render, screen, fireEvent } from '@testing-library/react';
import { JudgeControls } from '../JudgeControls';

describe('JudgeControls', () => {
  const mockOnModeChange = jest.fn();

  beforeEach(() => {
    mockOnModeChange.mockClear();
  });

  it('renders both good and bad buttons', () => {
    render(
      <JudgeControls 
        currentMode="good"
        onModeChange={mockOnModeChange}
      />
    );

    expect(screen.getByText('好人')).toBeInTheDocument();
    expect(screen.getByText('坏人')).toBeInTheDocument();
  });

  it('highlights current mode button', () => {
    const { rerender } = render(
      <JudgeControls 
        currentMode="good"
        onModeChange={mockOnModeChange}
      />
    );

    // 好人模式下的按钮应该高亮
    const goodButton = screen.getByText('好人').parentElement;
    expect(goodButton).toHaveClass('bg-white');

    // 切换到坏人模式
    rerender(
      <JudgeControls 
        currentMode="bad"
        onModeChange={mockOnModeChange}
      />
    );

    // 坏人模式下的按钮应该高亮
    const badButton = screen.getByText('坏人').parentElement;
    expect(badButton).toHaveClass('bg-white');
  });

  it('calls onModeChange when buttons are clicked', () => {
    render(
      <JudgeControls 
        currentMode="good"
        onModeChange={mockOnModeChange}
      />
    );

    // 点击坏人按钮
    fireEvent.click(screen.getByText('坏人'));
    expect(mockOnModeChange).toHaveBeenCalledWith('bad');

    // 点击好人按钮
    fireEvent.click(screen.getByText('好人'));
    expect(mockOnModeChange).toHaveBeenCalledWith('good');
  });

  it('disables buttons when disabled prop is true', () => {
    render(
      <JudgeControls 
        currentMode="good"
        onModeChange={mockOnModeChange}
        disabled={true}
      />
    );

    // 点击按钮不应该触发事件
    fireEvent.click(screen.getByText('坏人'));
    fireEvent.click(screen.getByText('好人'));
    expect(mockOnModeChange).not.toHaveBeenCalled();

    // 按钮应该显示禁用状态
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
    });
  });

  it('handles rapid mode switching', () => {
    const mockOnModeChange = jest.fn();
    render(
      <JudgeControls 
        currentMode="good"
        onModeChange={mockOnModeChange}
      />
    );

    // 快速切换模式
    fireEvent.click(screen.getByText('坏人'));
    fireEvent.click(screen.getByText('好人'));
    fireEvent.click(screen.getByText('坏人'));

    expect(mockOnModeChange).toHaveBeenCalledTimes(3);
  });

  it('maintains disabled state during animation', () => {
    const mockOnModeChange = jest.fn();
    render(
      <JudgeControls 
        currentMode="good"
        onModeChange={mockOnModeChange}
        disabled={true}
      />
    );

    // 动画过程中点击
    fireEvent.click(screen.getByText('坏人'));
    fireEvent.click(screen.getByText('好人'));

    expect(mockOnModeChange).not.toHaveBeenCalled();
  });
}); 