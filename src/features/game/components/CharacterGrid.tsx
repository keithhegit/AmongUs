import { useGameStore, useProgressStore } from '@/store';
import type { Character } from '@/shared/types';
import { CharacterCard } from './CharacterCard';

interface CharacterGridProps {
  level: number;
  voteType: 'good' | 'bad';
  onCharacterClick: (character: Character) => void;
}

export const CharacterGrid = ({ 
  level,
  voteType,
  onCharacterClick 
}: CharacterGridProps) => {
  const { characters, revealedCharacters } = useGameStore();
  const { addCoins } = useProgressStore();

  return (
    <div className="grid grid-cols-3 gap-4">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          isRevealed={revealedCharacters.includes(character.id)}
          onClick={() => onCharacterClick(character)}
          onClueClick={(targetName) => {
            const target = characters.find(c => c.name === targetName);
            if (target) onCharacterClick(target);
          }}
        />
      ))}
    </div>
  );
};