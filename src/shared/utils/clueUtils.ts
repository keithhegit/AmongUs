import type { Character } from '@/types/game';

export class ClueUtils {
  /**
   * 解析线索文本中的角色引用
   * 例如："[小明]说[小红]很可疑" => ["小明", "小红"]
   */
  static parseCharacterReferences(text: string): string[] {
    const matches = text.match(/\[([^\]]+)\]/g) || [];
    return matches.map(match => match.slice(1, -1));
  }

  /**
   * 将普通文本转换为带引用的线索文本
   */
  static formatClueText(text: string, references: string[]): string {
    let formattedText = text;
    references.forEach(name => {
      formattedText = formattedText.replace(
        new RegExp(`\\b${name}\\b`, 'g'),
        `[${name}]`
      );
    });
    return formattedText;
  }

  /**
   * 验证线索的有效性
   */
  static validateClue(
    clue: string,
    character: Character,
    allCharacters: Character[]
  ): boolean {
    // 检查线索中提到的角色是否存在
    const references = this.parseCharacterReferences(clue);
    return references.every(name => 
      allCharacters.some(char => char.name === name)
    );
  }

  /**
   * 分析线索关联性
   */
  static analyzeClueRelevance(
    character: Character,
    targetCharacter: Character,
    allCharacters: Character[]
  ): {
    isRelevant: boolean;
    reliability: number;
    reason: string;
  } {
    const references = this.parseCharacterReferences(character.clue.text);
    const mentionsTarget = references.includes(targetCharacter.name);

    // 基础可靠性评分
    let reliability = character.identity.isImpostor ? 0.2 : 0.8;

    // 如果线索直接提到目标角色
    if (mentionsTarget) {
      return {
        isRelevant: true,
        reliability,
        reason: character.identity.isImpostor
          ? '这可能是一个误导性的线索'
          : '这是一个直接的线索'
      };
    }

    // 检查间接关联
    const indirectConnection = references.some(name => {
      const referencedChar = allCharacters.find(c => c.name === name);
      return referencedChar && this.parseCharacterReferences(referencedChar.clue.text)
        .includes(targetCharacter.name);
    });

    if (indirectConnection) {
      reliability *= 0.7; // 间接线索可靠性降低
      return {
        isRelevant: true,
        reliability,
        reason: '这是一个间接的线索'
      };
    }

    return {
      isRelevant: false,
      reliability: 0,
      reason: '这个线索似乎无关'
    };
  }
}