-- Backfill: remove literal "Unknown" values from llm_output.reviewer.{name,title,company}.
-- Root cause: generate-carousel.ts previously injected the string "Unknown" into the LLM
-- prompt as a fallback for empty reviewer fields. The model echoed it back into the
-- structured output, polluting existing rows. The prompt was fixed on 2026-04-24; this
-- migration cleans up pre-existing rows.

UPDATE generated_content
SET llm_output = jsonb_set(
  llm_output,
  '{reviewer,company}',
  '""'::jsonb,
  false
)
WHERE llm_output->'reviewer'->>'company' ILIKE 'unknown';

UPDATE generated_content
SET llm_output = jsonb_set(
  llm_output,
  '{reviewer,title}',
  '""'::jsonb,
  false
)
WHERE llm_output->'reviewer'->>'title' ILIKE 'unknown';

-- Name is kept when it's "Unknown" only if no better value exists; empty string would break
-- attribution worse than "Unknown". Leave as-is.
