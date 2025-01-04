import type { Character } from '@/types/game';

interface ClueTemplate {
  template: string;
  variables: string[];
  type: 'relation' | 'testimony';
}

interface ClueResult {
  clue_text: string;
  type: 'relation' | 'testimony';
}

export class ClueGenerator {
  private readonly templates: ClueTemplate[] = [
    // 关系类线索（好人说的都是真话）
    {
      template: '我是{profession}，我看到{target}在{position}附近晃悠',
      variables: ['profession', 'target', 'position'],
      type: 'relation'
    },
    {
      template: '作为一名{profession}，我可以证明{target}的确去过{position}',
      variables: ['profession', 'target', 'position'],
      type: 'relation'
    },
    {
      template: '我在{position}工作时，碰到了{target}',
      variables: ['position', 'target'],
      type: 'relation'
    },
    {
      template: '{target}刚刚还在{position}和我打招呼来着',
      variables: ['target', 'position'],
      type: 'relation'
    },
    {
      template: '我在{position}的时候，看见{target}鬼鬼祟祟的',
      variables: ['position', 'target'],
      type: 'relation'
    },

    // 证词类线索（坏人说的都是假话）
    {
      template: '我可以作证，{target}一直在{position}没有离开过',
      variables: ['target', 'position'],
      type: 'testimony'
    },
    {
      template: '我敢保证{target}绝对不是坏人，因为我们一直在{position}聊天',
      variables: ['target', 'position'],
      type: 'testimony'
    },
    {
      template: '身为{profession}的我可以证明，{target}是清白的',
      variables: ['profession', 'target'],
      type: 'testimony'
    },
    {
      template: '{target}刚才一直和我在一起，不可能是坏人',
      variables: ['target'],
      type: 'testimony'
    },
    {
      template: '我在{position}目睹了全过程，{target}肯定是无辜的',
      variables: ['position', 'target'],
      type: 'testimony'
    }
  ];

  generateClue(
    type: 'relation' | 'testimony',
    variables: {
      name: string;
      target: string;
      profession?: string;
      position?: string;
    }
  ): ClueResult {
    // 根据类型筛选模板
    const availableTemplates = this.templates.filter(t => t.type === type);
    
    // 随机选择一个模板
    const template = availableTemplates[
      Math.floor(Math.random() * availableTemplates.length)
    ];

    // 替换变量
    let clue_text = template.template;
    template.variables.forEach(varName => {
      const value = variables[varName as keyof typeof variables];
      if (value) {
        clue_text = clue_text.replace(`{${varName}}`, value);
      }
    });

    return {
      clue_text,
      type: template.type
    };
  }

  // 为一组角色生成相互关联的线索
  generateCluesForCharacters(characters: Character[]): void {
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
        profession: character.visual.profession,
        position: character.position
      };

      const clue = this.generateClue(clueType, variables);
      character.clue.text = clue.clue_text;
    });
  }
}

export const clueGenerator = new ClueGenerator(); 