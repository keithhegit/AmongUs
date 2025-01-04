import type { Character, GameState } from '@/shared/types';

export class GameUtils {
  /**
   * 生成网格位置
   */
  static generateGridPositions(rows: number, cols: number): string[] {
    const positions: string[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        positions.push(`${String.fromCharCode(65 + col)}${row + 1}`);
      }
    }
    return positions;
  }

  /**
   * 检查是否相邻
   */
  static areAdjacent(pos1: string, pos2: string): boolean {
    const col1 = pos1.charCodeAt(0) - 65;
    const row1 = parseInt(pos1.slice(1)) - 1;
    const col2 = pos2.charCodeAt(0) - 65;
    const row2 = parseInt(pos2.slice(1)) - 1;

    return Math.abs(col1 - col2) <= 1 && Math.abs(row1 - row2) <= 1;
  }

  /**
   * 验证投票
   */
  static validateVote(
    character: Character,
    voteType: 'good' | 'bad'
  ): { isCorrect: boolean; message: string } {
    const isImpostor = character.identity.isImpostor;
    const votedAsImpostor = voteType === 'bad';

    if (isImpostor === votedAsImpostor) {
      return {
        isCorrect: true,
        message: isImpostor ? '成功找出坏人！' : '正确判断了好人！'
      };
    }

    return {
      isCorrect: false,
      message: isImpostor ? '错过了一个坏人...' : '错误指控了好人...'
    };
  }

  /**
   * 检查游戏是否结束
   */
  static isGameComplete(gameState: GameState): boolean {
    return gameState.impostorsFound >= gameState.totalImpostors;
  }
} 