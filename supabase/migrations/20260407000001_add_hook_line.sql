-- Add hook_line column for AI-extracted "money line" highlighting
ALTER TABLE imported_reviews ADD COLUMN hook_line TEXT;

COMMENT ON COLUMN imported_reviews.hook_line IS 'AI-extracted converting sentence from the review, displayed with highlight';
