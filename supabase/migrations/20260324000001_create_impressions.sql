-- Migration 006: Impressions tracking for widget analytics

CREATE TABLE public.impressions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id  UUID,
  widget_id   UUID,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- No RLS needed for inserts (done via service role from embed API)
-- But users can read their own
ALTER TABLE public.impressions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own impressions"
  ON public.impressions FOR SELECT USING (user_id = auth.uid());

-- Allow service role to insert (bypass RLS)
-- Public embed API uses service role

-- Index for fast monthly counts
CREATE INDEX idx_impressions_user_month
  ON public.impressions(user_id, created_at DESC);

CREATE INDEX idx_impressions_content
  ON public.impressions(content_id, created_at DESC);
