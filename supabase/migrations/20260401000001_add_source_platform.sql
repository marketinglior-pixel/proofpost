-- Add source_platform to submissions (where the review came from)
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS source_platform text;

-- Add source_platform to generated_content (carried over from source)
ALTER TABLE generated_content ADD COLUMN IF NOT EXISTS source_platform text;

-- Comment for clarity
COMMENT ON COLUMN submissions.source_platform IS 'Platform where review originated: facebook, google, g2, linkedin, trustpilot, capterra, etc.';
COMMENT ON COLUMN generated_content.source_platform IS 'Platform where review originated, carried from submission or import';
