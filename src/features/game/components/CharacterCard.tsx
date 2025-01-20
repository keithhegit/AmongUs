import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import type { Character } from '@/shared/types/character';
import { cn } from '@/lib/utils';
import citizensData from '@/features/game/data/citizens.json';
import professionsData from '@/features/game/data/professions.json';
import { useLongPress } from '@/hooks/use-long-press';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
  style?: {
    width?: number;
    height?: number;
    fontSize?: {
      name: number;
      text: number;
    };
  };
}

// 生成角色图片路径
function getCitizenImagePath(citizenId: string, position?: string): string {
  // 空位卡片
  if (citizenId === '200') {
    return new URL('../../../assets/images/professions/200-blank-no.png', import.meta.url).href;
  }
  
  // 职业角色的ID范围: 101-200
  const isProfession = parseInt(citizenId) >= 101 && parseInt(citizenId) <= 200;
  
  if (isProfession) {
    // 如果是职业角色，从professions.json中查找
    const profession = professionsData.professions.find(p => p.id === citizenId);
    if (profession) {
      const { id, gender, feature, clothing } = profession;
      return new URL(`../../../assets/images/professions/${id}-${clothing}-${gender}-${feature}.png`, import.meta.url).href;
    }
  }
  
  // 其他情况都视为普通市民
  const citizen = citizensData.citizens.find(c => c.id === citizenId);
  if (!citizen) return '';
  
  const { id, gender, feature, clothing } = citizen;
  const paddedId = id.padStart(3, '0');
  const featurePart = feature === 'none' ? '' : `-${feature}`;
  
  return new URL(`../../../assets/images/citizens/${paddedId}-${gender}-citizen${featurePart}-${clothing}.png`, import.meta.url).href;
}

export const CharacterCard = observer(({ 
  character, 
  isSelected,
  onClick,
  style = {}
}: CharacterCardProps) => {
  const { name, position, state, identity, clue, id } = character;
  const [showZoomed, setShowZoomed] = useState(false);
  const [imagePath, setImagePath] = useState<string>('');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');

  useEffect(() => {
    if (id) {
      // 空位卡片
      if (id === '200') {
        setImagePath(new URL('../../../assets/images/professions/200-blank-no.png', import.meta.url).href);
        return;
      }

      // 职业角色的ID范围: 101-200
      const isProfession = parseInt(id) >= 101 && parseInt(id) <= 200;
      
      if (isProfession) {
        // 如果是职业角色，从professions.json中查找性别
        const profession = professionsData.professions.find(p => p.id === id);
        if (profession) {
          setGender(profession.gender as 'boy' | 'girl');
          setImagePath(getCitizenImagePath(id, position));
        }
      } else {
        // 如果是普通市民，从citizens.json中查找性别
        const citizen = citizensData.citizens.find(c => c.id === id);
        if (citizen) {
          setGender(citizen.gender as 'boy' | 'girl');
          setImagePath(getCitizenImagePath(id, position));
        }
      }
    }
  }, [id, position]);

  // 修改线索显示条件：只要角色被揭示就显示线索
  const shouldShowClue = clue && (state === 'revealed' || state === 'completed');

  // 长按处理
  const handleLongPress = () => {
    if (state !== 'initial') { // 只有已翻开的卡片才能放大
      setShowZoomed(true);
    }
  };

  const longPressEvent = useLongPress(handleLongPress, {
    threshold: 500,
    onFinish: (e) => {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // 修改 getTextSize 函数
  const getTextSize = (type: 'name' | 'text') => {
    if (style.fontSize) {
      return `${style.fontSize[type]}px`;
    }
    return undefined;
  };

  // 如果是空位卡片，使用特殊样式
  if (identity.isBlank) {
    return (
      <div 
        className={cn(
          "relative aspect-[3/4] rounded-lg overflow-hidden shadow-md",
          "bg-gray-100"  // 空位使用灰色背景
        )}
        style={{
          width: style.width,
          height: style.height
        }}
      >
        {/* 位置标识 - 左上角 */}
        <div className="absolute top-0 left-0 bg-black/80 text-white px-1.5 py-0.5 rounded-br"
             style={{ fontSize: getTextSize('text') }}>
          {position}
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={getCitizenImagePath('200')}
            alt="空位"
            className="w-[85%] h-[85%] object-contain opacity-50"  // 降低透明度
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className={cn(
          "relative aspect-[3/4] rounded-lg overflow-hidden shadow-md",
          "cursor-pointer transition-all hover:shadow-lg hover:scale-105",
          gender === 'boy' ? "bg-blue-100" : "bg-pink-100",
          isSelected && "ring-2 ring-blue-500"
        )}
        style={{
          width: style.width,
          height: style.height
        }}
        onClick={onClick}
        {...longPressEvent}
      >
        {/* 位置标识 - 左上角 */}
        <div className="absolute top-0 left-0 bg-black/80 text-white px-1.5 py-0.5 rounded-br"
             style={{ fontSize: getTextSize('text') }}>
          {position}
        </div>

        {/* 身份标识 - 右上角 */}
        {state !== 'initial' && (
          <div className="absolute top-0 right-0 leading-none"
               style={{ fontSize: getTextSize('text'), transform: 'scale(3)', transformOrigin: 'top right' }}>
            {identity.isImpostor ? '😈' : '😊'}
          </div>
        )}

        {/* 角色图片和名字 */}
        {state === 'initial' ? (
          // 未翻开状态：大图片
          <>
            <div className="h-full flex items-center justify-center">
              <img 
                src={imagePath}
                alt={name}
                className="w-[85%] h-[85%] object-contain"
              />
            </div>
            <div className="absolute bottom-0 w-full bg-black/70 py-1">
              <div className="text-white text-center"
                   style={{ fontSize: getTextSize('name') }}>
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
                <div className="text-center text-white py-1 font-medium"
                     style={{ fontSize: getTextSize('name') }}>
                  {name}
                </div>
                <div className="w-full h-[1px] bg-white/30" />
                <div className="px-2 py-1.5">
                  <div className="text-white leading-tight text-center"
                       style={{ fontSize: getTextSize('text') }}>
                    {clue.text}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 放大查看模态框 */}
      {showZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowZoomed(false)}
        >
          <div className="relative w-4/5 max-w-md aspect-[3/4] bg-white rounded-lg overflow-hidden">
            {state === 'initial' ? (
              // 未翻开状态的放大显示
              <>
                <div className="h-full flex items-center justify-center">
                  <img 
                    src={imagePath}
                    alt={name}
                    className="w-[85%] h-[85%] object-contain"
                  />
                </div>
                <div className="absolute bottom-0 w-full bg-black/70 py-1">
                  <div className="text-white text-center text-2xl">
                    {name}
                  </div>
                </div>
              </>
            ) : (
              // 已翻开状态的放大显示
              <div className="h-full flex flex-col p-4">
                <div className="w-full h-[30%] flex items-center justify-center bg-white/50 rounded-t">
                  <div className="w-[85%] h-[85%]">
                    <img 
                      src={imagePath}
                      alt={name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                {shouldShowClue && (
                  <div className={cn(
                    "w-full h-[70%] rounded-b overflow-hidden",
                    identity.isImpostor ? "bg-red-600/90" : "bg-black/90"
                  )}>
                    <div className="text-center text-2xl text-white py-2 font-medium">
                      {name}
                    </div>
                    <div className="w-full h-[1px] bg-white/30" />
                    <div className="px-4 py-3">
                      <div className="text-white text-xl leading-relaxed text-center">
                        {clue.text}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});