-- Collection Flow: Add auto_approve, linked_widget_id, thank_you_message to collection_forms
ALTER TABLE collection_forms
  ADD COLUMN IF NOT EXISTS auto_approve boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS linked_widget_id uuid REFERENCES widgets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS thank_you_message text;

-- Collection Flow: Add generated_content_id to submissions
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS generated_content_id uuid REFERENCES generated_content(id) ON DELETE SET NULL;

-- Widget Builder: Add style JSON to widgets
ALTER TABLE widgets
  ADD COLUMN IF NOT EXISTS style jsonb;

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_submissions_form_status ON submissions(form_id, status);
CREATE INDEX IF NOT EXISTS idx_collection_forms_linked_widget ON collection_forms(linked_widget_id);
