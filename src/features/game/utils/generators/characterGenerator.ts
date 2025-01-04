import type { Character } from '@/shared/types';
import { ClueGenerator } from './clueGenerator';
import { GameUtils } from '@/shared/utils/gameUtils';

export class CharacterGenerator {
  private clueGenerator: ClueGenerator;
  
  // 职业选项，包括路人
  private readonly professions = [
    // 特定职业
    '医生', '警察', '教师', '工程师', '厨师',
    '艺术家', '商人', '学生', '记者', '科学家',
    '律师', '会计', '建筑师', '作家', '程序员',
    '设计师', '音乐家', '演员', '摄影师', '翻译',
    // 路人职业
    '路人', '游客', '居民', '行人', '顾客'
  ];

  // 角色名字及其性别
  private readonly characters: Array<{ name: string; gender: 'male' | 'female' }> = [
    // 男性角色
    { name: '老板', gender: 'male' },
    { name: '黄总', gender: 'male' },
    { name: '俊宇', gender: 'male' },
    { name: '隆基', gender: 'male' },
    { name: '伟涛', gender: 'male' },
    { name: '宏境', gender: 'male' },
    { name: '浩鹏', gender: 'male' },
    { name: '天时', gender: 'male' },
    { name: '源勃', gender: 'male' },
    { name: '伟茂', gender: 'male' },
    { name: '树锋', gender: 'male' },
    { name: '恩泽', gender: 'male' },
    { name: '港龙', gender: 'male' },
    { name: '正文', gender: 'male' },
    { name: '维才', gender: 'male' },
    { name: '峻滔', gender: 'male' },
    { name: '万扬', gender: 'male' },
    { name: '柳辉', gender: 'male' },
    { name: '家明', gender: 'male' },
    { name: '维良', gender: 'male' },
    { name: '万城', gender: 'male' },
    { name: '跃龙', gender: 'male' },
    { name: '佑铭', gender: 'male' },
    { name: '鸿盛', gender: 'male' },
    { name: '岩松', gender: 'male' },
    { name: '培钒', gender: 'male' },
    { name: '轲嘉', gender: 'male' },
    { name: '一苇', gender: 'male' },
    { name: '钰仁', gender: 'male' },

    // 女性角色
    { name: '石婧', gender: 'female' },
    { name: '丽梅', gender: 'female' },
    { name: '颖聪', gender: 'female' },
    { name: '咏茵', gender: 'female' },
    { name: '静文', gender: 'female' },
    { name: '淑婷', gender: 'female' },
    { name: '嘉雯', gender: 'female' },
    { name: '梓敏', gender: 'female' },
    { name: '洁滢', gender: 'female' },
    { name: '雅璐', gender: 'female' },
    { name: '浩静', gender: 'female' },
    { name: '兰兰', gender: 'female' },
    { name: '嘉怡', gender: 'female' },
    { name: '龙总', gender: 'female' },
    { name: '然', gender: 'female' },
    { name: '宏玮', gender: 'female' },
    { name: '一棣', gender: 'female' }
  ];

  constructor() {
    this.clueGenerator = new ClueGenerator();
  }

  generateCharacters(
    count: number,
    impostorCount: number,
    gridLayout: { rows: number; cols: number }
  ): Character[] {
    const positions = GameUtils.generateGridPositions(
      gridLayout.rows,
      gridLayout.cols
    );

    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
    const availableCharacters = [...this.characters];
    const availableProfessions = [...this.professions];
    const characters: Character[] = [];

    // 生成坏人
    for (let i = 0; i < impostorCount; i++) {
      characters.push(this.generateCharacter({
        position: shuffledPositions[i],
        isImpostor: true,
        characters: availableCharacters,
        professions: availableProfessions
      }));
    }

    // 生成好人
    for (let i = impostorCount; i < count; i++) {
      characters.push(this.generateCharacter({
        position: shuffledPositions[i],
        isImpostor: false,
        characters: availableCharacters,
        professions: availableProfessions
      }));
    }

    this.generateRelatedClues(characters);
    return characters;
  }

  private generateCharacter({
    position,
    isImpostor,
    characters,
    professions
  }: {
    position: string;
    isImpostor: boolean;
    characters: Array<{ name: string; gender: 'male' | 'female' }>;
    professions: string[];
  }): Character {
    // 随机选择并移除一个角色
    const characterIndex = Math.floor(Math.random() * characters.length);
    const { name, gender } = characters.splice(characterIndex, 1)[0];

    // 选择职业，增加路人的概率
    const isPasser = Math.random() < 0.3; // 30%的概率成为路人
    let profession: string;
    if (isPasser) {
      const passerProfessions = professions.slice(-5); // 最后5个是路人职业
      profession = passerProfessions[Math.floor(Math.random() * 5)];
    } else {
      const normalProfessions = professions.slice(0, -5); // 前面的是特定职业
      const professionIndex = Math.floor(Math.random() * normalProfessions.length);
      profession = normalProfessions[professionIndex];
    }

    return {
      id: `char_${position}`,
      position,
      name,
      gender,
      identity: {
        isImpostor,
        isRevealed: false
      },
      clue: {
        text: '',
        isUsed: false,
        isEffective: !isImpostor
      },
      visual: {
        emoji: gender === 'male' ? '👨' : '👩',
        profession,
        background: isImpostor ? 'red' : 'blue'
      }
    };
  }

  private generateRelatedClues(characters: Character[]): void {
    characters.forEach((character, index) => {
      // 为每个角色生成一个关于其他角色的线索
      const otherCharacters = characters.filter((_, i) => i !== index);
      const targetCharacter = otherCharacters[
        Math.floor(Math.random() * otherCharacters.length)
      ];

      // 根据角色是否是坏人，生成不同类型的线索
      const clueType = character.identity.isImpostor ? 'testimony' : 'relation';
      const variables = {
        name: character.name,
        target: targetCharacter.name,
        profession: character.visual.profession!,
        position: character.position
      };

      const clue = this.clueGenerator.generateClue(clueType, variables);
      character.clue.text = clue.clue_text;
    });
  }
}

export const characterGenerator = new CharacterGenerator(); 