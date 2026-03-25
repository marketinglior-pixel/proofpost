-- Blog posts table for Distribb webhook integration
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content_html TEXT NOT NULL,
  content_markdown TEXT,
  meta_description TEXT,
  image_url TEXT,
  image_alt TEXT,
  tags TEXT[],
  author TEXT DEFAULT 'ProofPost',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Index for slug lookups
CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);

-- Index for listing published posts
CREATE INDEX idx_blog_posts_published ON blog_posts (status, published_at DESC);
