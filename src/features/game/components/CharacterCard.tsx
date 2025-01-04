import { observer } from 'mobx-react-lite';
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

  // 判断是否应该显示线索
  const shouldShowClue = clue && state === 'revealed';

  return (
    <div 
      className={cn(
        "relative p-4 bg-white rounded-lg shadow cursor-pointer transition-all min-h-[160px]",
        "hover:shadow-md hover:scale-105",
        isSelected && "ring-2 ring-blue-500",
        state === 'completed' && (
          identity.isImpostor ? "bg-red-50" : "bg-green-50"
        )
      )}
      onClick={onClick}
    >
      {/* 位置标识 - 左上角 */}
      <div className="absolute top-2 left-2 text-sm font-medium text-gray-500">
        {position}
      </div>

      {/* 身份标识 - 右上角 */}
      {state !== 'initial' && (
        <div className="absolute top-2 right-2 text-2xl">
          {identity.isImpostor ? '😈' : '😊'}
        </div>
      )}

      {/* 角色头像 */}
      <div className="text-center mt-8 mb-4">
        <div className="text-4xl">
          {/* 头像暂时为空 */}
        </div>
      </div>

      {/* 角色名称 */}
      <div className="text-center">
        <div className="text-lg font-medium">
          {name}
        </div>
      </div>

      {/* 线索气泡 */}
      {shouldShowClue && (
        <div className="mt-4 p-2 bg-gray-50 rounded text-sm text-gray-600">
          {clue.text}
        </div>
      )}
    </div>
  );
});