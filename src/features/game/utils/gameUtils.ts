import type { Character, GameState } from '@/types/game';
import { GridHelper } from './gridHelper';

export class GameUtils {
  /**
   * 检查是否可以揭示角色
   */
  static canRevealCharacter(
    character: Character,
    gameState: GameState,
    previousReveals: Character[]
  ): boolean {
    // 已经揭示过的不能再揭示
    if (character.identity.isRevealed) return false;

    // 第一个角色总是可以揭示
    if (previousReveals.length === 0) return true;

    // 必须和之前揭示的角色相邻
    const lastReveal = previousReveals[previousReveals.length - 1];
    return GridHelper.areAdjacent(character.position, lastReveal.position);
  }

  /**
   * 检查游戏是否结束
   */
  static isGameComplete(gameState: GameState): boolean {
    return gameState.impostorsFound >= gameState.totalImpostors;
  }

  /**
   * 计算得分
   */
  static calculateScore(gameState: GameState): number {
    const baseScore = 100;
    const timeBonus = Math.max(0, gameState.timeLimit - gameState.elapsedTime) * 2;
    const mistakePenalty = gameState.mistakes * 20;

    return baseScore + timeBonus - mistakePenalty;
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
        message: isImpostor ? '成功找出伪人！' : '正确判断了人类！'
      };
    }

    return {
      isCorrect: false,
      message: isImpostor ? '错过了一个伪人...' : '错误指控了人类...'
    };
  }
} 