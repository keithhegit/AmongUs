import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterCard } from './CharacterCard';
import { RoleToggle } from './RoleToggle';
import { GameResultModal } from './GameResultModal';
import { gameStore } from '@/stores';
import type { Character } from '@/shared/types/game';
import { audioService } from '@/shared/services/AudioService';

export const GameLayout = observer(() => {
  const navigate = useNavigate();
  const { characters, handleCharacterClick } = gameStore;

  useEffect(() => {
    // 播放游戏BGM
    audioService.playGameplayBGM();
    
    // 组件卸载时停止BGM
    return () => {
      audioService.stopGameplayBGM();
    };
  }, []);

  // 检查游戏状态
  if (!gameStore.currentLevel) {
    console.log('游戏未初始化，返回主菜单');
    navigate('/');
    return null;
  }

  if (!characters || characters.length === 0) {
    console.log('角色数据不存在，返回主菜单');
    navigate('/');
    return null;
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