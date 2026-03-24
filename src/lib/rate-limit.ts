const hits = new Map<string, number[]>();

/**
 * Simple in-memory sliding-window rate limiter.
 * Returns { success: true } if under limit, { success: false } if over.
 */
export function rateLimit(
  key: string,
  { maxRequests, windowMs }: { maxRequests: number; windowMs: number }
): { success: boolean } {
  const now = Date.now();
  const timestamps = hits.get(key) ?? [];

  // Remove expired timestamps
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= maxRequests) {
    hits.set(key, valid);
    return { success: false };
  }

  valid.push(now);
  hits.set(key, valid);
  return { success: true };
}
