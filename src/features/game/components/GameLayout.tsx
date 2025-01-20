import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterCard } from './CharacterCard';
import { RoleToggle } from './RoleToggle';
import { GameResultModal } from './GameResultModal';
import { gameStore } from '@/stores';
import type { Character } from '@/shared/types/game';
import { audioService } from '@/shared/services/AudioService';
import { useGridSize } from '@/hooks/use-grid-size';
import { cn } from '@/lib/utils';

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

  // 计算网格大小
  const gridCols = Math.max(
    ...sortedCharacters.map(c => c.position[0].charCodeAt(0) - 'A'.charCodeAt(0) + 1)
  );
  const gridRows = Math.max(
    ...sortedCharacters.map(c => parseInt(c.position.slice(1)))
  );

  // 使用自适应hook
  const { cardWidth, cardHeight, fontSize } = useGridSize({
    columns: gridCols,
    rows: gridRows
  });

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      {/* 头部区域 123px (164px * 0.75) */}
      <header className="h-[123px] flex-shrink-0 flex flex-col justify-center bg-[#499DFF] shadow-md">
        {/* 头部内容保持不变 */}
      </header>

      {/* 主内容区域 - 卡片网格 */}
      <main className="flex-1 flex items-center justify-center overflow-hidden">
        {/* 卡片网格容器 */}
        <div 
          className={cn(
            "grid auto-rows-max",
            "mx-auto px-2", // 水平内边距
            "transform-gpu" // 启用GPU加速
          )}
          style={{
            gap: '4px',
            gridTemplateColumns: `repeat(${gridCols}, ${cardWidth}px)`,
            width: 'fit-content'
          }}
        >
          {sortedCharacters.map(character => (
            <CharacterCard
              key={character.position}
              character={character}
              isSelected={character.state !== 'initial'}
              onClick={() => handleCharacterClick(character.position)}
              style={{
                width: cardWidth,
                height: cardHeight,
                fontSize: fontSize
              }}
            />
          ))}
        </div>
      </main>

      {/* 底部区域 */}
      <footer className="h-[107px] flex-shrink-0 flex flex-col justify-center"> {/* 27px + 70px + 10px */}
        <div className="h-[27px] flex items-center justify-center">
          {/* 基础内容 */}
        </div>
        <div className="flex items-center justify-center">
          {/* 判断按钮区域 */}
          <div className="h-[70px] mt-[10px]">
            <RoleToggle />
          </div>
        </div>
      </footer>

      {/* 结算弹窗 */}
      <GameResultModal />
    </div>
  );
});