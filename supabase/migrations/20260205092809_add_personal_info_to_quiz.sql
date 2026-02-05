/*
  # Add personal information fields to quiz responses

  1. Changes
    - Add personal_info JSONB column to quiz_responses to store name, age, education, occupation, class
    - These fields enhance prediction accuracy based on financial psychology research
  
  2. New Fields in personal_info:
    - name (text)
    - age (integer)
    - education (text)
    - occupation (text)
    - social_class (text)
    - years_working (integer)
    - family_background (text)
*/

ALTER TABLE quiz_responses ADD COLUMN IF NOT EXISTS personal_info jsonb DEFAULT '{}'::jsonb;
