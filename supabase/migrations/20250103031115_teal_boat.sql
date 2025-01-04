/*
  # Rename evil to impostor

  1. Changes
    - Rename 'evil_count' column to 'impostor_count'
    - Update character identity fields to use 'isImpostor' instead of 'isEvil'
    - Maintain data consistency during migration

  2. Security
    - No changes to security policies
    - Maintains existing RLS settings
*/

-- First rename the column
ALTER TABLE levels RENAME COLUMN evil_count TO impostor_count;

-- Then update the character data
UPDATE levels
SET characters = (
  SELECT jsonb_agg(
    CASE 
      WHEN character->>'identity' IS NOT NULL THEN
        jsonb_set(
          character,
          '{identity}',
          jsonb_build_object(
            'isImpostor', (character->'identity'->>'isEvil')::boolean,
            'isRevealed', (character->'identity'->>'isRevealed')::boolean
          )
        )
      ELSE character
    END
  )
  FROM jsonb_array_elements(characters) character
)
WHERE characters IS NOT NULL;