import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import type { Character } from '@/shared/types/game';
import { cn } from '@/lib/utils';
import citizensData from '@/features/game/data/citizens.json';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
}

// 生成市民图片路径
function getCitizenImagePath(citizenId: string): string {
  const citizen = citizensData.citizens.find(c => c.id === citizenId);
  if (!citizen) return '';
  
  const { id, gender, feature, clothing } = citizen;
  const paddedId = id.padStart(3, '0');
  const featurePart = feature === 'none' ? '' : `-${feature}`;
  
  return `/src/assets/images/citizens/${paddedId}-${gender}-citizen${featurePart}-${clothing}.png`;
}

export const CharacterCard = observer(({ 
  character, 
  isSelected,
  onClick 
}: CharacterCardProps) => {
  const { name, position, state, identity, clue, id } = character;
  const [showZoomed, setShowZoomed] = useState(false);
  const [imagePath, setImagePath] = useState<string>('');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');

  useEffect(() => {
    if (id) {
      const citizen = citizensData.citizens.find(c => c.id === id);
      if (citizen) {
        setGender(citizen.gender as 'boy' | 'girl');
        setImagePath(getCitizenImagePath(id));
      }
    }
  }, [id]);

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
          "relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md",
          "cursor-pointer transition-all hover:shadow-lg hover:scale-105",
          gender === 'boy' ? "bg-blue-100" : "bg-pink-100",
          isSelected && "ring-2 ring-blue-500"
        )}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 位置标识 - 左上角 */}
        <div className="absolute top-0 left-0 bg-black/80 text-white px-1.5 py-0.5 text-[min(3vw,14px)] rounded-br">
          {position}
        </div>

        {/* 身份标识 - 右上角 */}
        {state !== 'initial' && (
          <div className="absolute top-0 right-0 text-[min(8vw,40px)] leading-none">
            {identity.isImpostor ? '😈' : '😊'}
          </div>
        )}

        {/* 角色图片和名字 */}
        {state === 'initial' ? (
          // 未翻开状态：大图片
          <>
            {imagePath && (
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <img 
                  src={imagePath}
                  alt={name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="absolute bottom-0 w-full bg-black/70 py-1">
              <div className="text-white text-center text-[min(3vw,14px)]">
                {name}
              </div>
            </div>
          </>
        ) : (
          // 已翻开状态：小图片和线索
          <div className="h-full flex flex-col p-2">
            {/* 图片区域 - 与文本容器对齐 */}
            <div className="w-full h-[30%] flex items-center justify-center bg-white/50 rounded-t">
              <div className="w-[85%] h-[85%] relative">
                <img 
                  src={imagePath}
                  alt={name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* 文本容器区域 */}
            {shouldShowClue && (
              <div className={cn(
                "w-full h-[70%] rounded-b overflow-hidden",
                identity.isImpostor ? "bg-red-600/90" : "bg-black/90"
              )}>
                <div className="text-center text-[min(3vw,14px)] text-white py-1 font-medium">
                  {name}
                </div>
                <div className="w-full h-[1px] bg-white/30" />
                <div className="px-2 py-1.5">
                  <div className="text-white text-[min(3vw,14px)] leading-tight text-center">
                    {clue.text}
                  </div>
                </div>
              </div>
            )}
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
            className={cn(
              "rounded-lg p-4 w-[280px] max-h-[90vh] overflow-y-auto",
              gender === 'boy' ? "bg-blue-100" : "bg-pink-100"
            )}
            onClick={e => e.stopPropagation()}
          >
            {imagePath && (
              <div className="w-32 h-32 mx-auto mb-4">
                <img 
                  src={imagePath}
                  alt={name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="text-lg font-bold mb-2 text-center">{name}</div>
            {shouldShowClue && (
              <div className={cn(
                "rounded-lg p-3",
                identity.isImpostor ? "bg-red-600/90" : "bg-black/90"
              )}>
                <div className="text-white">
                  {clue.text}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});