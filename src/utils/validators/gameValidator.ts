import type { Character, Level, Clue, GridLayout } from '../../types/game';

export class GameValidator {
  // 验证角色数据
  static validateCharacter(character: Character): boolean {
    return (
      // 基础属性验证
      typeof character.position === 'string' &&
      typeof character.name === 'string' &&
      // 身份验证
      typeof character.identity.isImpostor === 'boolean' &&
      typeof character.identity.isRevealed === 'boolean' &&
      // 线索验证
      typeof character.clue.text === 'string' &&
      typeof character.clue.isUsed === 'boolean' &&
      typeof character.clue.isEffective === 'boolean' &&
      // 视觉元素验证
      typeof character.visual.avatar === 'string' &&
      typeof character.visual.background === 'string'
    );
  }

  // 验证关卡数据
  static validateLevel(level: Level): boolean {
    return (
      // 基础属性验证
      typeof level.id === 'string' &&
      typeof level.level_number === 'number' &&
      typeof level.impostor_count === 'number' &&
      typeof level.complexity === 'number' &&
      // 网格布局验证
      this.validateGridLayout(level.grid_layout) &&
      // 角色数组验证
      Array.isArray(level.characters) &&
      level.characters.every(char => this.validateCharacter(char)) &&
      // 游戏规则验证
      this.validateLevelRules(level)
    );
  }

  // 验证网格布局
  static validateGridLayout(layout: GridLayout): boolean {
    return (
      layout.rows > 0 &&
      layout.rows <= 10 &&
      layout.cols > 0 &&
      layout.cols <= 10 &&
      Array.isArray(layout.positions) &&
      layout.positions.length === layout.rows * layout.cols
    );
  }

  // 验证线索
  static validateClue(clue: Clue): boolean {
    return (
      typeof clue.id === 'string' &&
      typeof clue.clue_id === 'string' &&
      typeof clue.main_type === 'string' &&
      typeof clue.clue_text === 'string' &&
      typeof clue.reliability === 'number' &&
      clue.reliability >= 1 &&
      clue.reliability <= 5 &&
      typeof clue.complexity === 'number' &&
      clue.complexity >= 1 &&
      clue.complexity <= 5
    );
  }

  // 验证关卡规则
  private static validateLevelRules(level: Level): boolean {
    // 验证坏人数量
    const impostorCount = level.characters.filter(
      char => char.identity.isImpostor
    ).length;
    if (impostorCount !== level.impostor_count) return false;

    // 验证位置唯一性
    const positions = new Set(level.characters.map(char => char.position));
    if (positions.size !== level.characters.length) return false;

    // 验证位置是否在网格范围内
    return level.characters.every(char =>
      level.grid_layout.positions.includes(char.position)
    );
  }

  // 验证判定操作
  static validateJudgment(character: Character, isImpostor: boolean): boolean {
    // 不能重复判定已揭示的角色
    if (character.identity.isRevealed) return false;
    
    // 判定结果必须是布尔值
    if (typeof isImpostor !== 'boolean') return false;

    return true;
  }

  // 验证线索使用
  static validateClueUsage(character: Character): boolean {
    // 不能重复使用已使用的线索
    if (character.clue.isUsed) return false;
    
    // 必须有有效的线索文本
    if (!character.clue.text) return false;

    return true;
  }
} 