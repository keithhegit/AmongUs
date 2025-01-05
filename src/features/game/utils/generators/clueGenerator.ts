import type { Character } from '@/shared/types';

export class ClueGenerator {
  private readonly clueTemplates = {
    direct: [
      "{target}是好人，{reason}",
      "我相信{target}，因为{reason}"
    ],
    neighbor: [
      "{position}附近的人很可疑",
      "在{position}周围一定有坏人"
    ],
    area: [
      "{area}区的都是好人",
      "{area}排没有坏人"
    ],
    relation: [
      "我和{target}{reason}",
      "{target}和我{reason}"
    ]
  };

  private readonly reasons = {
    direct: [
      "他帮过我",
      "他很靠谱",
      "我们是老朋友"
    ],
    relation: [
      "一起工作很久了",
      "共事多年",
      "经常一起吃饭"
    ]
  };

  generateClue(params: {
    type: 'direct' | 'neighbor' | 'area' | 'relation';
    position?: string;
    target?: string;
    area?: string;
  }): string {
    const templates = this.clueTemplates[params.type];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    return this.replaceVariables(template, {
      position: params.position,
      target: params.target,
      area: params.area,
      reason: this.getRandomReason(params.type)
    });
  }

  private getRandomReason(type: string): string {
    const reasons = this.reasons[type] || this.reasons.direct;
    return reasons[Math.floor(Math.random() * reasons.length)];
  }

  private replaceVariables(template: string, vars: Record<string, string>): string {
    return template.replace(/{(\w+)}/g, (_, key) => vars[key] || '');
  }
}

export const clueGenerator = new ClueGenerator(); 