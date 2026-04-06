-- Migration: Tiered subscription plans (free/starter/pro/business)
-- Date: 2026-04-06
-- Context: Pivot from LTD $69 to tiered subscription ($19/$39/$79)

-- 1. Drop old binary plan constraint
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;

-- 2. Add new tiered plan constraint
ALTER TABLE public.profiles ADD CONSTRAINT profiles_plan_check
  CHECK (plan IN ('free', 'starter', 'pro', 'business'));

-- 3. Add trial column (14-day free trial for new signups)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ;

-- 4. Add subscription product tracking
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_product_id TEXT;

-- 5. Backfill: LTD users get grandfathered to business tier
UPDATE public.profiles
SET plan = 'business'
WHERE payment_type = 'ltd' AND plan = 'pro';

-- 6. Update trigger: new signups get 14-day trial
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, trial_ends_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NOW() + INTERVAL '14 days'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Extend imported_reviews platform options (for Amazon/Etsy)
-- First check if there's a constraint, then recreate it
DO $$
BEGIN
  -- Drop existing platform constraint if any
  ALTER TABLE public.imported_reviews DROP CONSTRAINT IF EXISTS imported_reviews_platform_check;
  -- Add new constraint with amazon and etsy
  ALTER TABLE public.imported_reviews ADD CONSTRAINT imported_reviews_platform_check
    CHECK (platform IN ('g2', 'google', 'capterra', 'trustpilot', 'linkedin', 'manual', 'amazon', 'etsy'));
EXCEPTION WHEN OTHERS THEN
  -- If no constraint exists, just add one
  ALTER TABLE public.imported_reviews ADD CONSTRAINT imported_reviews_platform_check
    CHECK (platform IN ('g2', 'google', 'capterra', 'trustpilot', 'linkedin', 'manual', 'amazon', 'etsy'));
END $$;
