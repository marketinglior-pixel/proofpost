-- Migration 005: Create widgets table for multi-review carousel embeds

CREATE TABLE public.widgets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL DEFAULT 'My Widget',
  content_ids UUID[] NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.widgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own widgets"
  ON public.widgets FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own widgets"
  ON public.widgets FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own widgets"
  ON public.widgets FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own widgets"
  ON public.widgets FOR DELETE USING (user_id = auth.uid());

CREATE INDEX idx_widgets_user ON public.widgets(user_id);
