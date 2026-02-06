import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function saveQuizResponses(sessionId: string, responses: Record<string, any>) {
  if (!supabase) return;
  const { error } = await supabase
    .from('quiz_responses')
    .insert([
      {
        session_id: sessionId,
        responses,
      },
    ]);

  if (error) throw error;
}

export async function saveQuizResults(
  sessionId: string,
  conservativeOutcome: number,
  moderateOutcome: number,
  aggressiveOutcome: number,
  recommendedProfile: string
) {
  if (!supabase) return;
  const { error } = await supabase
    .from('quiz_results')
    .insert([
      {
        session_id: sessionId,
        conservative_outcome: conservativeOutcome,
        moderate_outcome: moderateOutcome,
        aggressive_outcome: aggressiveOutcome,
        recommended_profile: recommendedProfile,
      },
    ]);

  if (error) throw error;
}

export async function getQuizResults(sessionId: string) {
  if (!supabase) {
    return {
      conservative_outcome: 45000,
      moderate_outcome: 68000,
      aggressive_outcome: 95000,
      recommended_profile: 'balanced',
    };
  }
  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('session_id', sessionId)
    .maybeSingle();

  if (error) throw error;
  return data || {
    conservative_outcome: 45000,
    moderate_outcome: 68000,
    aggressive_outcome: 95000,
    recommended_profile: 'balanced',
  };
}
