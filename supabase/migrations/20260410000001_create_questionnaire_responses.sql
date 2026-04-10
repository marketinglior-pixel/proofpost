CREATE TABLE public.questionnaire_responses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  questionnaire TEXT NOT NULL DEFAULT 'post_first_trust_card',
  responses     JSONB NOT NULL DEFAULT '{}'::jsonb,
  completed     BOOLEAN NOT NULL DEFAULT false,
  skipped       BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, questionnaire)
);

ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own responses"
  ON public.questionnaire_responses FOR ALL
  USING (user_id = auth.uid());

CREATE INDEX idx_questionnaire_responses_user
  ON public.questionnaire_responses(user_id, questionnaire);
