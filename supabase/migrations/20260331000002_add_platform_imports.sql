-- Table for imported reviews from external platforms
CREATE TABLE IF NOT EXISTS imported_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  platform text NOT NULL CHECK (platform IN ('g2', 'google', 'capterra', 'trustpilot', 'linkedin')),
  source_url text,
  reviewer_name text NOT NULL,
  reviewer_title text,
  reviewer_company text,
  reviewer_photo_url text,
  review_text text NOT NULL,
  rating numeric(2,1) DEFAULT 5.0,
  review_date text,
  imported_at timestamptz DEFAULT now(),
  generated_content_id uuid REFERENCES generated_content(id),

  -- Prevent duplicates
  CONSTRAINT unique_review UNIQUE (user_id, platform, reviewer_name, review_text)
);

ALTER TABLE imported_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own imports" ON imported_reviews FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_imported_reviews_user ON imported_reviews(user_id);
CREATE INDEX idx_imported_reviews_platform ON imported_reviews(platform);
