/*
  # Create Quiz Response and Results Tables

  1. New Tables
    - `quiz_responses` - Stores individual quiz response records with session data
      - `id` (uuid, primary key)
      - `session_id` (text, unique identifier for a quiz session)
      - `responses` (jsonb, stores all quiz answers)
      - `created_at` (timestamp)
    
    - `quiz_results` - Stores computed financial scenarios based on responses
      - `id` (uuid, primary key)
      - `session_id` (text, foreign key reference)
      - `conservative_outcome` (numeric, projected wealth in conservative scenario)
      - `moderate_outcome` (numeric, projected wealth in moderate scenario)
      - `aggressive_outcome` (numeric, projected wealth in aggressive scenario)
      - `recommended_profile` (text, investment profile recommendation)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - All data is public (no authentication required for demo/educational purposes)

  3. Notes
    - quiz_responses stores raw user answers as JSON for flexibility
    - quiz_results stores computed outcomes for visualization
    - session_id allows linking responses to their results
*/

CREATE TABLE IF NOT EXISTS quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  responses jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL UNIQUE,
  conservative_outcome numeric(12,2) NOT NULL DEFAULT 0,
  moderate_outcome numeric(12,2) NOT NULL DEFAULT 0,
  aggressive_outcome numeric(12,2) NOT NULL DEFAULT 0,
  recommended_profile text NOT NULL DEFAULT 'balanced',
  created_at timestamptz DEFAULT now(),
  FOREIGN KEY (session_id) REFERENCES quiz_responses(session_id) ON DELETE CASCADE
);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quiz responses are publicly accessible"
  ON quiz_responses
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert quiz responses"
  ON quiz_responses
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Quiz results are publicly accessible"
  ON quiz_results
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert quiz results"
  ON quiz_results
  FOR INSERT
  WITH CHECK (true);
