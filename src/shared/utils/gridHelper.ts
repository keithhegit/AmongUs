export class GridHelper {
  /**
   * 生成网格位置标识 (A1, B2 等)
   */
  static generatePositions(rows: number, cols: number): string[] {
    const positions: string[] = [];
    for (let row = 0; row < rows; row++) {
      const rowLabel = String.fromCharCode(65 + row); // A, B, C...
      for (let col = 1; col <= cols; col++) {
        positions.push(`${rowLabel}${col}`);
      }
    }
    return positions;
  }

  /**
   * 计算两个位置之间的距离
   */
  static calculateDistance(pos1: string, pos2: string): number {
    const row1 = pos1.charCodeAt(0) - 65;
    const col1 = parseInt(pos1.slice(1)) - 1;
    const row2 = pos2.charCodeAt(0) - 65;
    const col2 = parseInt(pos2.slice(1)) - 1;

    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
  }

  /**
   * 获取相邻的位置
   */
  static getAdjacentPositions(position: string, maxRows: number, maxCols: number): string[] {
    const row = position.charCodeAt(0) - 65;
    const col = parseInt(position.slice(1)) - 1;
    const adjacent: string[] = [];

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 上下左右

    for (const [dRow, dCol] of directions) {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (newRow >= 0 && newRow < maxRows && newCol >= 0 && newCol < maxCols) {
        adjacent.push(`${String.fromCharCode(65 + newRow)}${newCol + 1}`);
      }
    }

    return adjacent;
  }

  /**
   * 检查位置是否相邻
   */
  static areAdjacent(pos1: string, pos2: string): boolean {
    return this.calculateDistance(pos1, pos2) === 1;
  }
}