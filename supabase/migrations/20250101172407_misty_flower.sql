/*
  # Add Statistics System Tables

  1. New Tables
    - `level_statistics`
      - Tracks individual level completion statistics
      - Stores start/end times, mistakes, clues used, etc.
      - Links to users and levels
    
  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users to manage their own statistics
*/

-- Create level statistics table
CREATE TABLE IF NOT EXISTS level_statistics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    level_id uuid REFERENCES levels NOT NULL,
    start_time timestamptz NOT NULL,
    end_time timestamptz NOT NULL,
    mistakes integer NOT NULL DEFAULT 0,
    clues_used text[] NOT NULL DEFAULT '{}',
    revealed_characters text[] NOT NULL DEFAULT '{}',
    outcome text CHECK (outcome IN ('victory', 'defeat')) NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE level_statistics ENABLE ROW LEVEL SECURITY;

-- Create policies for level_statistics
CREATE POLICY "Users can insert their own statistics"
    ON level_statistics
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own statistics"
    ON level_statistics
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_level_statistics_user_id ON level_statistics(user_id);
CREATE INDEX IF NOT EXISTS idx_level_statistics_level_id ON level_statistics(level_id);
CREATE INDEX IF NOT EXISTS idx_level_statistics_outcome ON level_statistics(outcome);