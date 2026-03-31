-- Add video support to submissions
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS video_thumbnail_url text;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS submission_type text DEFAULT 'text' CHECK (submission_type IN ('text', 'video'));

-- Add video support to collection forms
ALTER TABLE collection_forms ADD COLUMN IF NOT EXISTS allow_video boolean DEFAULT true;

-- Create storage bucket for video testimonials
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true) ON CONFLICT DO NOTHING;

-- Storage policy for video uploads (anyone can upload, owner can manage)
CREATE POLICY "Anyone can upload videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos');
CREATE POLICY "Videos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
