import React from 'react';
import type { Character, Clue } from '../types/game';
import { Badge } from './Badge';

interface CharacterDetailProps {
  character: Character | null;
  onClose: () => void;
  onShowClue: (clue: Clue) => void;
}

export function CharacterDetail({ character, onClose, onShowClue }: CharacterDetailProps) {
  if (!character) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-4/5 max-w-md p-4">
        <div className="flex items-center space-x-4">
          <img
            className="w-24 h-24 rounded-lg"
            src={character.visual.avatar}
            alt={character.name}
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold">{character.name}</h3>
            {character.visual.profession && (
              <Badge label={character.visual.profession} color="blue" />
            )}
          </div>
        </div>
        
        {character.clue && !character.clue.isUsed && (
          <button 
            className="mt-4 p-3 bg-blue-50 rounded-lg w-full text-blue-800"
            onClick={() => onShowClue(character.clue)}
          >
            View Available Clue
          </button>
        )}

        <button 
          className="mt-4 py-2 w-full text-gray-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}