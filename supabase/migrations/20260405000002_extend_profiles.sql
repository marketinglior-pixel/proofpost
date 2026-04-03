-- Add username and payment_type to profiles for Trust Card pivot
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS payment_type TEXT DEFAULT 'subscription' CHECK (payment_type IN ('subscription', 'ltd'));

-- Username format: same validation as trust_cards
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_username_format CHECK (username IS NULL OR username ~ '^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$');

CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
