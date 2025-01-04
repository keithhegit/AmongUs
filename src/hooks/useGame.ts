import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { gameStore } from '@/stores/gameStore';

export const useGame = () => {
  useEffect(() => {
    // 初始化游戏
    if (gameStore.characters.length === 0) {
      gameStore.startLevel(1);
    }
  }, []);

  const handleCharacterClick = (position: string) => {
    gameStore.revealCharacter(position);
  };

  return {
    gameStore,
    handleCharacterClick,
    loading: false,
    error: null
  };
};