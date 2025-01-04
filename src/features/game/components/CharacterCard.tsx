import type { Character } from '@/shared/types';

interface CharacterCardProps {
  character: Character;
  isRevealed: boolean;
  onClick: () => void;
  onClueClick: (targetName: string) => void;
}

export const CharacterCard = ({
  character,
  isRevealed,
  onClick,
  onClueClick
}: CharacterCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="relative aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
    >
      {/* 角色头像 */}
      <div className="absolute inset-0 flex items-center justify-center text-4xl">
        {character.visual.emoji}
      </div>
      
      {/* 角色信息 */}
      {isRevealed && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-2">
          <div className="text-lg font-bold">{character.name}</div>
          {character.visual.profession && (
            <div className="text-sm opacity-75">{character.visual.profession}</div>
          )}
        </div>
      )}
    </div>
  );
};