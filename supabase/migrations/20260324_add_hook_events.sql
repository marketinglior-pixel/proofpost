-- Migration: Add hook_events table for A/B testing
-- Date: 2026-03-24
-- Purpose: Track which hook variant is shown and clicked (Phase 2 - AI Moat)

CREATE TABLE IF NOT EXISTS public.hook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES public.generated_content(id) ON DELETE CASCADE,
  widget_id UUID REFERENCES public.widgets(id) ON DELETE SET NULL,
  hook_variant_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'click')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_hook_events_content ON public.hook_events(content_id);
CREATE INDEX idx_hook_events_variant ON public.hook_events(content_id, hook_variant_id);
CREATE INDEX idx_hook_events_type ON public.hook_events(event_type);

-- RLS
ALTER TABLE public.hook_events ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (from embed iframe)
CREATE POLICY "Anyone can track hook events"
  ON public.hook_events FOR INSERT
  WITH CHECK (true);

-- Service role reads all (for analytics API)
-- Regular users read via API which uses service role
