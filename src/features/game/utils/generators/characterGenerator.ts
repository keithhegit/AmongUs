import { Character } from '@/shared/types';
import { clueGenerator } from './clueGenerator';

export class CharacterGenerator {
  private readonly names = [
    '隆基', '小薇', '阿翔', '明杰', '小云', 
    '建国', '丽丽', '小强', '阿美'
  ];

  generateCharacters(
    gridSize: { rows: number; cols: number },
    startPosition: string,
    impostorPosition: string
  ): Character[] {
    const characters: Character[] = [];
    const positions = this.generatePositions(gridSize);

    positions.forEach((position, index) => {
      const isStartPosition = position === startPosition;
      const isImpostor = position === impostorPosition;

      characters.push({
        id: position,
        position,
        name: this.names[index],
        state: isStartPosition ? 'revealed' : 'initial',
        identity: {
          isImpostor,
          isRevealed: isStartPosition
        },
        clue: {
          text: '',  // 将在后续设置
          type: 'direct',
          isUsed: false
        }
      });
    });

    return characters;
  }

  private generatePositions({ rows, cols }: { rows: number; cols: number }): string[] {
    const positions: string[] = [];
    const rowLetters = ['A', 'B', 'C'];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        positions.push(`${rowLetters[row]}${col + 1}`);
      }
    }
    
    return positions;
  }
}

export const characterGenerator = new CharacterGenerator(); 