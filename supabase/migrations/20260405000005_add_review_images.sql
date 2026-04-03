-- Storage bucket for review screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-images', 'review-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload into their own folder
CREATE POLICY "Users can upload own review images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'review-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own review images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'review-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Public read (needed for Trust Card pages)
CREATE POLICY "Public read review images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'review-images');

-- Add image_url to imported_reviews for screenshot support
ALTER TABLE public.imported_reviews
  ADD COLUMN IF NOT EXISTS image_url TEXT;
