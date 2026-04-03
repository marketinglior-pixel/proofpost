-- Analytics: track trust card page views
CREATE TABLE public.trust_card_views (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trust_card_id   UUID NOT NULL REFERENCES public.trust_cards(id) ON DELETE CASCADE,
  referrer        TEXT,
  user_agent      TEXT,
  country         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.trust_card_views ENABLE ROW LEVEL SECURITY;

-- Anyone can record a view (public pages)
CREATE POLICY "Public can insert views"
  ON public.trust_card_views FOR INSERT
  WITH CHECK (true);

-- Only owner can read their analytics
CREATE POLICY "Owner can view own analytics"
  ON public.trust_card_views FOR SELECT
  USING (
    trust_card_id IN (
      SELECT id FROM public.trust_cards WHERE user_id = auth.uid()
    )
  );

CREATE INDEX idx_trust_card_views_card ON public.trust_card_views(trust_card_id);
CREATE INDEX idx_trust_card_views_time ON public.trust_card_views(created_at);
