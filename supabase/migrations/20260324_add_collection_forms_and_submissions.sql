-- Migration: Add collection_forms and submissions tables
-- Date: 2026-03-24
-- Purpose: Enable testimonial collection forms (Phase 1 competitor research)

-- Collection Forms table
CREATE TABLE IF NOT EXISTS public.collection_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  brand_kit_id UUID REFERENCES public.brand_kits(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT 'Share your experience',
  description TEXT,
  questions JSONB NOT NULL DEFAULT '["What do you like most about our product?", "How has it helped your business?"]'::jsonb,
  slug TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID NOT NULL REFERENCES public.collection_forms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  reviewer_title TEXT,
  reviewer_company TEXT,
  reviewer_photo_url TEXT,
  review_text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_collection_forms_user_id ON public.collection_forms(user_id);
CREATE INDEX idx_collection_forms_slug ON public.collection_forms(slug);
CREATE INDEX idx_submissions_form_id ON public.submissions(form_id);
CREATE INDEX idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);

-- RLS Policies
ALTER TABLE public.collection_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Collection Forms: owners can CRUD their own forms
CREATE POLICY "Users can view own forms"
  ON public.collection_forms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own forms"
  ON public.collection_forms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own forms"
  ON public.collection_forms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own forms"
  ON public.collection_forms FOR DELETE
  USING (auth.uid() = user_id);

-- Collection Forms: public read for active forms (needed for /collect/[slug])
CREATE POLICY "Anyone can view active forms"
  ON public.collection_forms FOR SELECT
  USING (active = true);

-- Submissions: owners can view/update their submissions
CREATE POLICY "Users can view own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
  ON public.submissions FOR UPDATE
  USING (auth.uid() = user_id);

-- Submissions: anyone can insert (public form submission)
-- Note: The API validates form_id exists and is active before inserting
CREATE POLICY "Anyone can submit reviews"
  ON public.submissions FOR INSERT
  WITH CHECK (true);
