-- Migration: Add case_studies table
-- Date: 2026-03-24
-- Purpose: AI Case Study Generator (Phase 3)

CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES public.generated_content(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_case_studies_user ON public.case_studies(user_id);

-- RLS
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own case studies"
  ON public.case_studies FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own case studies"
  ON public.case_studies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own case studies"
  ON public.case_studies FOR DELETE
  USING (auth.uid() = user_id);

-- Public read for case study pages
CREATE POLICY "Anyone can view case studies"
  ON public.case_studies FOR SELECT
  USING (true);
