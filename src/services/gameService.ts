import { supabase } from '../lib/supabase';
import type { Level, Character, Clue } from '../types/game';

export class GameService {
  async getLevel(levelNumber: number): Promise<Level> {
    const { data, error } = await supabase
      .from('levels')
      .select('*')
      .eq('level_number', levelNumber)
      .single();

    if (error) throw error;
    return data;
  }

  async getClues(levelId: string): Promise<Clue[]> {
    const { data, error } = await supabase
      .from('clues')
      .select('*')
      .eq('level_id', levelId);

    if (error) throw error;
    return data;
  }

  async saveProgress(levelNumber: number, score: number) {
    const { error } = await supabase
      .from('game_sessions')
      .insert({
        level_number: levelNumber,
        score,
        completed_at: new Date().toISOString()
      });

    if (error) throw error;
  }
}