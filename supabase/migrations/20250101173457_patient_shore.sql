/*
  # Add initial level data

  1. New Data
    - Adds level 1 with initial characters and configuration
  2. Changes
    - Inserts sample level data for testing
*/

INSERT INTO levels (level_number, grid_layout, evil_count, complexity, characters)
VALUES (
  1, 
  jsonb_build_object(
    'columns', ARRAY['A', 'B', 'C'],
    'rows', ARRAY[1, 2],
    'maxColumns', 3,
    'maxRows', 2
  ),
  2,
  1,
  jsonb_build_array(
    jsonb_build_object(
      'position', 'A1',
      'name', 'Alice',
      'identity', jsonb_build_object('isEvil', false, 'isRevealed', false),
      'clue', jsonb_build_object(
        'text', 'I saw someone suspicious near the library last night.',
        'isUsed', false,
        'isEffective', true
      ),
      'visual', jsonb_build_object(
        'avatar', '/avatars/character1.png',
        'background', 'library',
        'profession', 'Librarian'
      )
    ),
    jsonb_build_object(
      'position', 'B1',
      'name', 'Bob',
      'identity', jsonb_build_object('isEvil', true, 'isRevealed', false),
      'clue', jsonb_build_object(
        'text', 'Everything has been normal lately.',
        'isUsed', false,
        'isEffective', false
      ),
      'visual', jsonb_build_object(
        'avatar', '/avatars/character2.png',
        'background', 'market',
        'profession', 'Merchant'
      )
    ),
    jsonb_build_object(
      'position', 'C1',
      'name', 'Carol',
      'identity', jsonb_build_object('isEvil', false, 'isRevealed', false),
      'clue', jsonb_build_object(
        'text', 'Bob was acting strange yesterday.',
        'isUsed', false,
        'isEffective', true
      ),
      'visual', jsonb_build_object(
        'avatar', '/avatars/character3.png',
        'background', 'house',
        'profession', 'Teacher'
      )
    ),
    jsonb_build_object(
      'position', 'A2',
      'name', 'David',
      'identity', jsonb_build_object('isEvil', true, 'isRevealed', false),
      'clue', jsonb_build_object(
        'text', 'I keep to myself mostly.',
        'isUsed', false,
        'isEffective', false
      ),
      'visual', jsonb_build_object(
        'avatar', '/avatars/character4.png',
        'background', 'tavern',
        'profession', 'Innkeeper'
      )
    )
  )
) ON CONFLICT (level_number) DO NOTHING;