import { describe, it, expect } from 'vitest';
import { REFLECTION_COACH_SYSTEM_PROMPT, SYSTEM_PHILOSOPHY_CONSTRAINT, buildAnalysisPrompt } from '../lib/gemini/prompts';

describe('Gemini Prompt & Philosophy Enforcement', () => {
  it('should include explicit non-recommendation constraints in core prompt', () => {
    expect(SYSTEM_PHILOSOPHY_CONSTRAINT).toContain('You must NEVER make decisions for users.');
    expect(SYSTEM_PHILOSOPHY_CONSTRAINT).toContain('You must NEVER recommend what users should do.');
    expect(SYSTEM_PHILOSOPHY_CONSTRAINT).toContain('You must NEVER choose an option.');
  });

  it('should include Socratic questioning rules in Reflection Coach system prompt', () => {
    expect(REFLECTION_COACH_SYSTEM_PROMPT).toContain('Use Socratic questioning.');
    expect(REFLECTION_COACH_SYSTEM_PROMPT).toContain('Ask thoughtful questions');
    expect(REFLECTION_COACH_SYSTEM_PROMPT).toContain('Challenge assumptions');
  });

  it('should build valid JSON prompt structure containing 4 council roles', () => {
    const prompt = buildAnalysisPrompt(
      'Acquire rival business',
      'Context detail description long enough to satisfy specs',
      ['Goal 1'],
      ['Constraint 1'],
      7
    );

    expect(prompt).toContain('Optimist');
    expect(prompt).toContain('Skeptic');
    expect(prompt).toContain('Researcher');
    expect(prompt).toContain('Challenger');
    expect(prompt).toContain('Confirmation Bias');
    expect(prompt).toContain('Missing Information');
  });
});
