import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqmekoqisegssgkznubl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxbWVrb3Fpc2Vnc3Nna3pudWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NTE3OTksImV4cCI6MjA1MTMyNzc5OX0.nykaC2nYXirIIuuCCYpvGRnpPX1Yl_kY39q59ezXeR0';

export const supabase = createClient(supabaseUrl, supabaseKey);

// 类型定义
export type Database = {
  public: {
    Tables: {
      levels: {
        Row: {
          id: string;
          level_number: number;
          grid_layout: any;
          evil_count: number;
          complexity: number;
          characters: any[];
          created_at?: string;
        };
        Insert: {
          id?: string;
          level_number: number;
          grid_layout: any;
          evil_count: number;
          complexity: number;
          characters: any[];
          created_at?: string;
        };
        Update: {
          id?: string;
          level_number?: number;
          grid_layout?: any;
          evil_count?: number;
          complexity?: number;
          characters?: any[];
          created_at?: string;
        };
      };
      game_sessions: {
        Row: {
          id: string;
          user_id: string;
          level_id: string;
          status: 'ongoing' | 'completed' | 'failed';
          mistakes: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      level_statistics: {
        Row: {
          id: string;
          level_id: string;
          total_plays: number;
          success_rate: number;
          avg_completion_time: number;
        };
      };
      clues: {
        Row: {
          id: string;
          level_id: string;
          text: string;
          is_effective: boolean;
        };
      };
    };
  };
};