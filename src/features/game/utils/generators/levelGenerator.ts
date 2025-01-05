import { LevelConfig } from '@/shared/types';
import { characterGenerator } from './characterGenerator';
import { clueGenerator } from './clueGenerator';

export class LevelGenerator {
  generateLevel(levelNumber: number): LevelConfig {
    const startPosition = 'A2';
    const impostorPosition = 'B3';  // 在实际场景中应该随机生成

    const config: LevelConfig = {
      id: levelNumber,
      gridSize: { rows: 3, cols: 3 },
      startPosition,
      impostorCount: 1,
      clueFlow: this.generateClueFlow(startPosition, impostorPosition),
      characters: []
    };

    // 生成角色并设置线索
    config.characters = characterGenerator.generateCharacters(
      config.gridSize,
      startPosition,
      impostorPosition
    );

    // 设置初始线索
    this.setInitialClues(config);

    return config;
  }

  private generateClueFlow(startPos: string, impostorPos: string) {
    return {
      steps: [
        {
          round: 1,
          fromPosition: startPos,
          clueType: 'direct',
          targetInfo: { position: 'C3' }
        },
        // 后续步骤将根据实际游戏进展动态生成
      ]
    };
  }

  private setInitialClues(config: LevelConfig) {
    // 设置开局角色的线索
    const startCharacter = config.characters.find(c => c.position === config.startPosition);
    if (startCharacter) {
      startCharacter.clue.text = clueGenerator.generateClue({
        type: 'direct',
        target: 'C3',
        reason: '他帮过我'
      });
    }
  }
}

export const levelGenerator = new LevelGenerator(); 