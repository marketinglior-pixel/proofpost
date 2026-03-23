-- Migration 003: generated_content table
-- Stores each review-to-carousel generation

CREATE TABLE public.generated_content (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  raw_input   TEXT NOT NULL,
  llm_output  JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own content"
  ON public.generated_content FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own content"
  ON public.generated_content FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own content"
  ON public.generated_content FOR DELETE
  USING (user_id = auth.uid());

-- Index for fast user-scoped queries
CREATE INDEX idx_generated_content_user
  ON public.generated_content(user_id, created_at DESC);
