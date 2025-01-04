import type { Level, Character, GameConfig, Difficulty } from '@/types/game';

// 首先在 types/game.ts 中添加难度相关的类型
interface Difficulty {
  gridSize: number;        // 网格大小
  impostorCount: number;   // 坏人数量
  maxMistakes: number;     // 允许的最大错误次数
  complexity: number;      // 线索复杂度
  professionRate: number;  // 职业出现概率
  clueCount: number;       // 初始可见线索数量
}

export class LevelGenerator {
  // 难度配置表
  private readonly difficultyTable: Record<number, Partial<Difficulty>> = {
    // 新手关卡 (1-3)
    1: {
      gridSize: 3,        // 3x3网格
      impostorCount: 2,   // 2个坏人
      maxMistakes: 3,     // 可以错3次
      complexity: 20,     // 简单线索
      professionRate: 0.3,// 30%概率有职业
      clueCount: 1        // 初始线索数量
    },
    // 入门关卡 (4-6)
    4: {
      gridSize: 3,
      impostorCount: 3,
      maxMistakes: 3,
      complexity: 40,
      professionRate: 0.4,
      clueCount: 1
    },
    // 进阶关卡 (7-12)
    7: {
      gridSize: 4,        // 4x4网格
      impostorCount: 3,
      maxMistakes: 2,
      complexity: 60,
      professionRate: 0.5,
      clueCount: 1
    },
    // 挑战关卡 (13-20)
    13: {
      gridSize: 4,
      impostorCount: 4,
      maxMistakes: 2,
      complexity: 80,
      professionRate: 0.6,
      clueCount: 1
    },
    // 专家关卡 (21+)
    21: {
      gridSize: 5,        // 5x5网格
      impostorCount: 4,
      maxMistakes: 1,
      complexity: 100,
      professionRate: 0.7,
      clueCount: 2        // 5x5网格给2个初始线索
    }
  };

  generateLevel(levelNumber: number): Level {
    const config = this.getLevelConfig(levelNumber);
    const characters = this.generateCharacters(config);
    
    return {
      number: levelNumber,
      characters,
      config
    };
  }

  private getLevelConfig(levelNumber: number): GameConfig {
    // 找到当前关卡对应的难度配置
    const difficultyLevels = Object.keys(this.difficultyTable)
      .map(Number)
      .sort((a, b) => b - a);
    
    const currentDifficultyLevel = difficultyLevels.find(
      level => levelNumber >= level
    ) || 1;

    const baseConfig = this.difficultyTable[currentDifficultyLevel];
    
    // 在基础配置上进行微调
    const levelProgress = (levelNumber - currentDifficultyLevel) / 
      (difficultyLevels[difficultyLevels.indexOf(currentDifficultyLevel) - 1] - currentDifficultyLevel);
    
    return {
      gridSize: baseConfig.gridSize!,
      impostorCount: baseConfig.impostorCount!,
      maxMistakes: baseConfig.maxMistakes!,
      complexity: Math.min(
        baseConfig.complexity! + Math.floor(levelProgress * 20),
        100
      ),
      professionRate: Math.min(
        baseConfig.professionRate! + levelProgress * 0.1,
        0.8
      ),
      clueCount: baseConfig.clueCount!
    };
  }

  private generateCharacters(config: GameConfig): Character[] {
    const { gridSize, impostorCount, professionRate } = config;
    const totalCharacters = gridSize * gridSize;
    const positions = this.generatePositions(gridSize);
    
    // 生成基础角色数组
    const characters: Character[] = positions.map((pos, index) => ({
      id: `char-${index}`,
      position: pos,
      name: this.generateName(),
      visual: {
        emoji: this.getRandomEmoji(),
        profession: Math.random() < professionRate ? 
          this.getRandomProfession() : undefined
      },
      identity: {
        isImpostor: false,
        isRevealed: false
      }
    }));

    // 随机选择坏人
    const impostorIndices = this.getRandomIndices(totalCharacters, impostorCount);
    impostorIndices.forEach(index => {
      characters[index].identity.isImpostor = true;
      // 坏人更可能有特殊职业
      if (!characters[index].visual.profession && Math.random() < professionRate * 1.5) {
        characters[index].visual.profession = this.getRandomProfession();
      }
    });

    // 计算初始线索数量
    const initialClueCount = gridSize >= 5 ? 2 : 1;

    // 初始显示线索（避开坏人）
    const revealedIndices = this.getRandomIndices(
      totalCharacters,
      initialClueCount
    ).filter(index => !impostorIndices.includes(index));

    // 如果筛选后的线索数量不足，继续随机选择好人直到达到目标数量
    while (revealedIndices.length < initialClueCount) {
      const availableIndices = Array.from({ length: totalCharacters }, (_, i) => i)
        .filter(i => !impostorIndices.includes(i) && !revealedIndices.includes(i));
      
      if (availableIndices.length === 0) break;
      
      const randomIndex = availableIndices[
        Math.floor(Math.random() * availableIndices.length)
      ];
      revealedIndices.push(randomIndex);
    }

    // 显示初始线索
    revealedIndices.forEach(index => {
      characters[index].identity.isRevealed = true;
    });

    return characters;
  }

  private generatePositions(gridSize: number): string[] {
    const positions: string[] = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        positions.push(`${String.fromCharCode(65 + col)}${row + 1}`);
      }
    }
    return positions;
  }

  // 辅助方法
  private getRandomIndices(max: number, count: number): number[] {
    const indices = Array.from({ length: max }, (_, i) => i);
    return indices.sort(() => Math.random() - 0.5).slice(0, count);
  }

  private generateName(): string {
    const prefixes = ['小', '老', '阿'];
    const names = ['明', '华', '强', '莉', '芳', '伟'];
    return prefixes[Math.floor(Math.random() * prefixes.length)] + 
           names[Math.floor(Math.random() * names.length)];
  }

  private getRandomEmoji(): string {
    const emojis = ['👨', '👩', '👴', '👵', '👦', '👧'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  private getRandomProfession(): string {
    const professions = ['医生', '警察', '老师', '工程师', '学生'];
    return professions[Math.floor(Math.random() * professions.length)];
  }
} 