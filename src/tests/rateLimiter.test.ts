import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '@/lib/utils/rateLimiter';

describe('Rate Limiter Engine', () => {
  it('should allow requests within rate limit threshold', () => {
    const key = `test-user-${Date.now()}`;
    const result = checkRateLimit(key, 5, 60000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it('should track request consumption correctly', () => {
    const key = `test-track-${Date.now()}`;
    checkRateLimit(key, 3, 60000); // 2 left
    checkRateLimit(key, 3, 60000); // 1 left
    const third = checkRateLimit(key, 3, 60000); // 0 left

    expect(third.success).toBe(true);
    expect(third.remaining).toBe(0);
  });

  it('should block requests exceeding the rate limit', () => {
    const key = `test-block-${Date.now()}`;
    for (let i = 0; i < 3; i++) {
      checkRateLimit(key, 3, 60000);
    }
    const blocked = checkRateLimit(key, 3, 60000);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});
