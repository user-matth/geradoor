import { NextResponse } from 'next/server';

const rateLimitCache = new Map<string, { count: number; timestamp: number }>();

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export function rateLimit(key: string, options: RateLimitOptions) {
  const now = Date.now();
  const cacheEntry = rateLimitCache.get(key);

  if (!cacheEntry) {
    rateLimitCache.set(key, { count: 1, timestamp: now });
    return { allowed: true };
  }

  const { count, timestamp } = cacheEntry;

  if (now - timestamp > options.windowMs) {
    rateLimitCache.set(key, { count: 1, timestamp: now });
    return { allowed: true };
  }

  if (count < options.limit) {
    rateLimitCache.set(key, { count: count + 1, timestamp });
    return { allowed: true };
  }

  return { allowed: false };
}
