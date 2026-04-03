-- Allow 'manual' as a platform for user-uploaded reviews
ALTER TABLE public.imported_reviews DROP CONSTRAINT IF EXISTS imported_reviews_platform_check;
ALTER TABLE public.imported_reviews ADD CONSTRAINT imported_reviews_platform_check
  CHECK (platform IN ('g2', 'google', 'capterra', 'trustpilot', 'linkedin', 'manual'));
