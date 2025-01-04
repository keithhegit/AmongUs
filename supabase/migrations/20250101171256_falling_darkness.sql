/*
  # Initial Schema Setup for Who's the Spy Game

  1. New Tables
    - `clues`: Stores game clues and their properties
      - `id` (uuid, primary key)
      - `clue_id` (text, unique)
      - `main_type` (text)
      - `sub_type` (text)
      - `clue_text` (text)
      - `reliability` (integer, 1-5)
      - `complexity` (integer, 1-5)
      - `is_template` (boolean)
      - `variables` (jsonb)
      - `validation_rules` (jsonb)
      - `related_professions` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `levels`: Stores game level configurations
      - `id` (uuid, primary key)
      - `level_number` (integer, unique)
      - `grid_layout` (jsonb)
      - `evil_count` (integer)
      - `complexity` (integer)
      - `characters` (jsonb)
      - `created_at` (timestamptz)

    - `game_sessions`: Stores active game sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `level_id` (uuid, references levels)
      - `current_state` (jsonb)
      - `mistakes` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create clues table
CREATE TABLE IF NOT EXISTS clues (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    clue_id text UNIQUE NOT NULL,
    main_type text NOT NULL,
    sub_type text,
    clue_text text NOT NULL,
    reliability integer CHECK (reliability BETWEEN 1 AND 5),
    complexity integer CHECK (complexity BETWEEN 1 AND 5),
    is_template boolean DEFAULT false,
    variables jsonb DEFAULT '[]',
    validation_rules jsonb DEFAULT '[]',
    related_professions jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create levels table
CREATE TABLE IF NOT EXISTS levels (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    level_number integer UNIQUE NOT NULL,
    grid_layout jsonb NOT NULL,
    evil_count integer NOT NULL,
    complexity integer NOT NULL,
    characters jsonb NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Create game_sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    level_id uuid REFERENCES levels NOT NULL,
    current_state jsonb NOT NULL,
    mistakes integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE clues ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for clues table
CREATE POLICY "Anyone can read clues"
    ON clues
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policies for levels table
CREATE POLICY "Anyone can read levels"
    ON levels
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policies for game_sessions table
CREATE POLICY "Users can CRUD their own game sessions"
    ON game_sessions
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clues_main_type ON clues(main_type);
CREATE INDEX IF NOT EXISTS idx_levels_level_number ON levels(level_number);
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_id ON game_sessions(user_id);