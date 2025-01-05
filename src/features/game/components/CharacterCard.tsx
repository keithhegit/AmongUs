import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import type { Character } from '@/shared/types';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
}

export const CharacterCard = observer(({ 
  character, 
  isSelected,
  onClick 
}: CharacterCardProps) => {
  const { name, position, state, identity, clue } = character;
  const [showZoomed, setShowZoomed] = useState(false);

  // 修改线索显示条件：只要角色被揭示就显示线索
  const shouldShowClue = clue && (state === 'revealed' || state === 'completed');

  // 长按处理
  let pressTimer: NodeJS.Timeout;
  
  const handleMouseDown = () => {
    pressTimer = setTimeout(() => {
      setShowZoomed(true);
    }, 500);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  const handleTouchStart = () => {
    pressTimer = setTimeout(() => {
      setShowZoomed(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer);
  };

  return (
    <>
      <div 
        className={cn(
          "relative w-[93.33px] h-[120px] p-2",  // 增加高度到120px
          "bg-white rounded-lg shadow cursor-pointer transition-all",
          "hover:shadow-md hover:scale-105",
          isSelected && "ring-2 ring-blue-500",
          state === 'completed' && (
            identity.isImpostor ? "bg-red-50" : "bg-green-50"
          )
        )}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 位置标识 - 左上角 */}
        <div className="absolute top-1 left-1 text-xs font-medium text-gray-500">
          {position}
        </div>

        {/* 身份标识 - 右上角 */}
        {state !== 'initial' && (
          <div className="absolute top-1 right-1 text-lg">
            {identity.isImpostor ? '😈' : '😊'}
          </div>
        )}

        {/* 角色名称 - 缩小20% */}
        <div className="text-center mt-6">
          <div className="text-[80%] font-medium">
            {name}
          </div>
        </div>

        {/* 线索气泡 - 自适应字体大小 */}
        {shouldShowClue && (
          <div className="mt-2 p-1 bg-gray-50 rounded">
            <div className="text-[clamp(8px,1.8vw,12px)] text-gray-600 line-clamp-3">
              {clue.text}
            </div>
          </div>
        )}
      </div>

      {/* 放大显示模态框 */}
      {showZoomed && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowZoomed(false)}
        >
          <div 
            className="bg-white rounded-lg p-4 w-[280px] max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-lg font-bold mb-2">{name}</div>
            {shouldShowClue && (
              <div className="text-base">
                {clue.text}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});