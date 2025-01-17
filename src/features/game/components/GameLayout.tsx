import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { CharacterCard } from './CharacterCard';
import { RoleToggle } from './RoleToggle';
import { GameResultModal } from './GameResultModal';
import { useStore } from '@/providers/StoreProvider';
import type { Character } from '@/shared/types/game';
import { audioService } from '@/shared/services/AudioService';

export const GameLayout = observer(() => {
  const { gameStore } = useStore();
  const { characters, handleCharacterClick } = gameStore;

  useEffect(() => {
    // 播放游戏BGM
    audioService.playGameplayBGM();
    
    // 组件卸载时停止BGM
    return () => {
      audioService.stopGameplayBGM();
    };
  }, []);

  if (!gameStore.currentLevel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    );
  }

  if (!characters || characters.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">没有角色数据</div>
      </div>
    );
  }

  // 重新排序角色
  const sortedCharacters = [...characters].sort((a, b) => {
    // 先按行号排序
    const rowA = parseInt(a.position[1]);
    const rowB = parseInt(b.position[1]);
    if (rowA !== rowB) return rowA - rowB;
    
    // 再按列名排序
    return a.position[0].localeCompare(b.position[0]);
  });

  // 计算网格列数
  const gridCols = Math.max(
    ...sortedCharacters.map(c => c.position[0].charCodeAt(0) - 'A'.charCodeAt(0) + 1)
  );

  // 根据列数决定网格类名
  const gridColsClass = `grid-cols-${gridCols}`;

  return (
    <div className="relative min-h-screen pb-[120px] flex flex-col">
      {/* Safe Area Container */}
      <div className="w-full mx-auto px-2 flex-1">
        {/* 游戏状态 */}
        <div className="mb-4 text-center">
          <div className="text-lg font-medium text-gray-700">
            当前回合: {gameStore.currentRound + 1}
          </div>
        </div>

        {/* 角色网格 */}
        <div className={`grid ${gridColsClass} gap-1.5 mt-[164px]`}>
          {sortedCharacters.map(character => (
            <CharacterCard
              key={character.position}
              character={character}
              isSelected={character.state !== 'initial'}
              onClick={() => handleCharacterClick(character.position)}
            />
          ))}
        </div>
      </div>

      {/* 底部控制栏 */}
      <RoleToggle />

      {/* 结算弹窗 */}
      <GameResultModal />
    </div>
  );
});