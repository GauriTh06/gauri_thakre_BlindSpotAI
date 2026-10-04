import { describe, it, expect } from 'vitest';
import { DECISION_TEMPLATES, STARTER_EXAMPLES } from '@/lib/templates';

describe('Decision Templates & Starter Examples Integrity', () => {
  it('should provide non-empty pre-configured decision templates', () => {
    expect(DECISION_TEMPLATES.length).toBeGreaterThan(0);
    DECISION_TEMPLATES.forEach(template => {
      expect(template.id).toBeTruthy();
      expect(template.title).toBeTruthy();
      expect(template.description).toBeTruthy();
      expect(template.starterGoals.length).toBeGreaterThan(0);
      expect(template.starterConstraints.length).toBeGreaterThan(0);
    });
  });

  it('should provide valid starter examples for quick user exploration', () => {
    expect(STARTER_EXAMPLES.length).toBeGreaterThan(0);
    STARTER_EXAMPLES.forEach(example => {
      expect(example.title).toBeTruthy();
      expect(example.context).toBeTruthy();
      expect(example.confidence).toBeGreaterThan(0);
    });
  });

  it('should strictly comply with non-prescriptive framing principles', () => {
    DECISION_TEMPLATES.forEach(template => {
      expect(template.title).not.toMatch(/Choose option A|You should select|Do this/i);
    });
  });
});
