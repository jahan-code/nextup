import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple in-memory rate limiter
 * For production, consider using @upstash/ratelimit or Vercel Edge Config
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

interface RateLimitOptions {
  limit: number; // Number of requests allowed
  window: number; // Time window in milliseconds
  identifier?: string; // Custom identifier (defaults to IP)
}

/**
 * Rate limit middleware
 * Returns null if allowed, or NextResponse with error if rate limited
 */
export function rateLimit(
  req: NextRequest,
  options: RateLimitOptions
): NextResponse | null {
  const { limit, window, identifier } = options;

  // Get identifier (IP address or custom)
  const key = identifier || getClientIP(req);

  const now = Date.now();
  const record = store[key];

  // Clean up expired entries periodically (every 1000 requests)
  if (Math.random() < 0.001) {
    cleanupExpiredEntries(now);
  }

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    store[key] = {
      count: 1,
      resetTime: now + window,
    };
    return null; // Allowed
  }

  if (record.count >= limit) {
    // Rate limited
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: `Rate limit exceeded. Please try again later.`,
        retryAfter: Math.ceil((record.resetTime - now) / 1000),
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((record.resetTime - now) / 1000)),
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': String(0),
          'X-RateLimit-Reset': String(record.resetTime),
        },
      }
    );
  }

  // Increment count
  record.count++;
  return null; // Allowed
}

function getClientIP(req: NextRequest): string {
  // Try various headers for IP address
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback to a default identifier
  return 'unknown';
}

function cleanupExpiredEntries(now: number): void {
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}

/**
 * Predefined rate limit configurations
 */
export const RateLimitConfig = {
  // Authentication endpoints
  AUTH: {
    limit: 5,
    window: 60 * 1000, // 5 requests per minute
  },
  // Stream creation
  STREAM_CREATE: {
    limit: 10,
    window: 60 * 60 * 1000, // 10 requests per hour
  },
  // Upvote operations
  UPVOTE: {
    limit: 100,
    window: 60 * 60 * 1000, // 100 requests per hour
  },
  // General API
  GENERAL: {
    limit: 100,
    window: 60 * 1000, // 100 requests per minute
  },
};
