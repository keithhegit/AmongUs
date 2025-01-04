import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';

export const useGameAnimations = () => {
  const [animatingCharacters, setAnimatingCharacters] = useState<Set<string>>(new Set());
  const { characters, revealedCharacters } = useGameStore();

  // 处理角色揭示动画
  const handleRevealAnimation = (characterId: string) => {
    setAnimatingCharacters(prev => new Set([...prev, characterId]));
    
    // 动画结束后移除
    setTimeout(() => {
      setAnimatingCharacters(prev => {
        const next = new Set(prev);
        next.delete(characterId);
        return next;
      });
    }, 500);
  };

  // 监听角色状态变化
  useEffect(() => {
    const newReveals = characters.filter(
      char => revealedCharacters.includes(char.id) && 
      !animatingCharacters.has(char.id)
    );

    newReveals.forEach(char => handleRevealAnimation(char.id));
  }, [revealedCharacters, characters]);

  return {
    isAnimating: (characterId: string) => animatingCharacters.has(characterId)
  };
}; 