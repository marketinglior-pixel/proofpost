-- Migration 002: brand_kits table
-- Stores user's brand identity for carousel generation

CREATE TABLE public.brand_kits (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name    TEXT NOT NULL,
  logo_url        TEXT,
  primary_color   TEXT NOT NULL DEFAULT '#2563EB',
  secondary_color TEXT NOT NULL DEFAULT '#1E293B',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)  -- One brand kit per user in MVP
);

-- Row Level Security
ALTER TABLE public.brand_kits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own brand kit"
  ON public.brand_kits FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own brand kit"
  ON public.brand_kits FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own brand kit"
  ON public.brand_kits FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own brand kit"
  ON public.brand_kits FOR DELETE
  USING (user_id = auth.uid());
