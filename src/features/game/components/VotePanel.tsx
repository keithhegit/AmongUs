import type { Character } from '@/shared/types';

interface VotePanelProps {
  character: Character | null;
  onVote: (characterId: string, voteType: 'good' | 'bad') => void;
}

export const VotePanel = ({ character, onVote }: VotePanelProps) => {
  if (!character) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-center text-gray-500">
          Select a character to vote
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Vote: {character.name}</h3>
      
      <div className="flex gap-2">
        <button
          onClick={() => onVote(character.id, 'good')}
          className="flex-1 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Good
        </button>
        <button
          onClick={() => onVote(character.id, 'bad')}
          className="flex-1 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Impostor
        </button>
      </div>
    </div>
  );
}; 