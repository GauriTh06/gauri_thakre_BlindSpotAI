import { z } from 'zod';

/**
 * Zod Schema for Decision Input Validation
 */
export const DecisionInputSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' })
    .max(200, { message: 'Title cannot exceed 200 characters' }),
  context: z
    .string()
    .min(15, { message: 'Please provide at least 15 characters of context for accurate analysis' })
    .max(5000, { message: 'Context cannot exceed 5000 characters' }),
  goals: z
    .array(z.string().min(2))
    .min(1, { message: 'Please add at least one clear goal' }),
  constraints: z
    .array(z.string().min(2))
    .default([]),
  confidenceLevel: z
    .number()
    .min(1)
    .max(10),
});

/**
 * Sanitizes raw string input against XSS scripts and malicious html tags.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validates decision payload and returns sanitized result
 */
export function validateAndSanitizeDecision(data: unknown) {
  const parsed = DecisionInputSchema.parse(data);
  return {
    ...parsed,
    title: sanitizeInput(parsed.title),
    context: sanitizeInput(parsed.context),
    goals: parsed.goals.map(sanitizeInput),
    constraints: parsed.constraints.map(sanitizeInput),
  };
}
