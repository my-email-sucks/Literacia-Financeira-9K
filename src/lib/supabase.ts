import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveQuizResponses(sessionId: string, responses: Record<string, any>) {
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
  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('session_id', sessionId)
    .maybeSingle();

  if (error) throw error;
  return data;
}
