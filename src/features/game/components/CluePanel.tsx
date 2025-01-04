import type { Character } from '@/shared/types';

interface CluePanelProps {
  character: Character | null;
}

export const CluePanel = ({ character }: CluePanelProps) => {
  if (!character) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
        <p className="text-center text-gray-500">
          Select a character to view clues
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold mb-4">Clues</h3>
      
      <div className="space-y-2">
        {character.clues.map((clue, index) => (
          <div 
            key={index}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
          >
            {clue.text}
          </div>
        ))}
      </div>
    </div>
  );
}; 