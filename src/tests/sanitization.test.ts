import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateAndSanitizeDecision, DecisionInputSchema } from '../lib/utils/sanitization';

describe('Security Input Validation & Sanitization', () => {
  it('should strip dangerous HTML tags and script injections', () => {
    const malicious = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(malicious);
    expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
  });

  it('should validate valid decision inputs via Zod schema', () => {
    const validPayload = {
      title: 'Pivot startup from B2C to B2B SaaS',
      context: 'We have 15 paying team managers asking for enterprise SSO and admin controls...',
      goals: ['Reach positive cashflow', 'Secure enterprise contracts'],
      constraints: ['9 months runway', '4 engineers'],
      confidenceLevel: 8,
    };

    const result = validateAndSanitizeDecision(validPayload);
    expect(result.title).toBe('Pivot startup from B2C to B2B SaaS');
    expect(result.confidenceLevel).toBe(8);
  });

  it('should reject inputs that fail minimum length constraints', () => {
    const invalidPayload = {
      title: 'Tiny',
      context: 'Too short context',
      goals: [],
      constraints: [],
      confidenceLevel: 12, // Out of range
    };

    expect(() => validateAndSanitizeDecision(invalidPayload)).toThrow();
  });
});
