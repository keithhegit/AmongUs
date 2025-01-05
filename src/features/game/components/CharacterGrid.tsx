import { motion } from 'framer-motion';
import type { Character } from '@/shared/types';
import { CharacterCard } from './CharacterCard';

interface CharacterGridProps {
  characters: Character[];
  selectedCharacter: Character | null;
  revealedCharacters: string[];
  onCharacterSelect: (characterId: string) => void;
}

export const CharacterGrid = ({ 
  characters, 
  selectedCharacter, 
  revealedCharacters,
  onCharacterSelect
}: CharacterGridProps) => {
  // 生成位置标识 (A1, A2, A3, B1, B2, B3, C1, C2, C3)
  const getPosition = (index: number): string => {
    const row = String.fromCharCode(65 + Math.floor(index / 3)); // A, B, C
    const col = (index % 3) + 1; // 1, 2, 3
    return `${row}${col}`;
  };

  return (
    <motion.div 
      className="grid grid-cols-3 gap-4 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          position={getPosition(index)}
          isSelected={selectedCharacter?.id === character.id}
          isRevealed={revealedCharacters.includes(character.id)}
          onClick={() => onCharacterSelect(character.id)}
        />
      ))}
    </motion.div>
  );
};