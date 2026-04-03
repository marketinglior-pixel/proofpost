-- Trust Cards: standalone verified trust page per user
CREATE TABLE public.trust_cards (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username        TEXT NOT NULL UNIQUE,
  display_name    TEXT NOT NULL,
  headline        TEXT,
  bio             TEXT,
  avatar_url      TEXT,
  cta_label       TEXT DEFAULT 'Book a Call',
  cta_url         TEXT,
  cta_type        TEXT DEFAULT 'link' CHECK (cta_type IN ('link', 'calendly', 'whatsapp', 'email')),
  social_links    JSONB DEFAULT '[]'::jsonb,
  portfolio       JSONB DEFAULT '[]'::jsonb,
  theme           TEXT DEFAULT 'dark' CHECK (theme IN ('light', 'dark')),
  accent_color    TEXT DEFAULT '#10B981',
  layout          TEXT DEFAULT 'masonry' CHECK (layout IN ('masonry', 'list', 'grid')),
  custom_domain   TEXT,
  is_published    BOOLEAN DEFAULT true,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Username must be lowercase alphanumeric + hyphens, 3-30 chars
ALTER TABLE public.trust_cards
  ADD CONSTRAINT username_format CHECK (username ~ '^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$');

-- Row Level Security
ALTER TABLE public.trust_cards ENABLE ROW LEVEL SECURITY;

-- Owner can do everything
CREATE POLICY "Owner manages own trust card"
  ON public.trust_cards FOR ALL
  USING (user_id = auth.uid());

-- Public can view published cards
CREATE POLICY "Public can view published trust cards"
  ON public.trust_cards FOR SELECT
  USING (is_published = true);

-- Indexes
CREATE INDEX idx_trust_cards_username ON public.trust_cards(username);
CREATE INDEX idx_trust_cards_user_id ON public.trust_cards(user_id);
