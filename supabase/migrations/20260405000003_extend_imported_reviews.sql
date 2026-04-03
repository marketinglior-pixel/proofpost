-- Add verification and trust card display fields to imported_reviews
ALTER TABLE public.imported_reviews
  ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS verification_url TEXT,
  ADD COLUMN IF NOT EXISTS display_on_trust_card BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Allow public read of reviews for trust card pages (anon users visiting /username)
CREATE POLICY "Public can view reviews for trust cards"
  ON public.imported_reviews FOR SELECT
  USING (display_on_trust_card = true);

CREATE INDEX IF NOT EXISTS idx_imported_reviews_trust_card
  ON public.imported_reviews(user_id, display_on_trust_card, display_order);
