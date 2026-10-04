import { describe, it, expect } from 'vitest';
import { calculateReadinessScore, READINESS_WARNING_BANNER, getReadinessInsights } from '../lib/readinessCalculator';

describe('Decision Readiness Score Calculator', () => {
  it('should calculate weighted score accurately between 0 and 100', () => {
    const breakdown = {
      evidenceCompleteness: 80,
      riskAwareness: 60,
      assumptionCoverage: 70,
      perspectiveDiversity: 90,
      biasExploration: 50,
    };

    // (80*0.25) + (60*0.25) + (70*0.20) + (90*0.15) + (50*0.15) = 20 + 15 + 14 + 13.5 + 7.5 = 70
    const score = calculateReadinessScore(breakdown);
    expect(score).toBe(70);
  });

  it('should clamp scores to range [0, 100]', () => {
    const minScore = calculateReadinessScore({
      evidenceCompleteness: -10,
      riskAwareness: 0,
      assumptionCoverage: 0,
      perspectiveDiversity: 0,
      biasExploration: 0,
    });
    expect(minScore).toBe(0);

    const maxScore = calculateReadinessScore({
      evidenceCompleteness: 120,
      riskAwareness: 100,
      assumptionCoverage: 100,
      perspectiveDiversity: 100,
      biasExploration: 100,
    });
    expect(maxScore).toBe(100);
  });

  it('should enforce exact mandatory disclaimer banner text', () => {
    expect(READINESS_WARNING_BANNER).toBe(
      "This score reflects how thoroughly the decision has been explored, not whether the decision is correct."
    );
  });

  it('should generate critical badges when evidence or risk awareness is low', () => {
    const insights = getReadinessInsights({
      evidenceCompleteness: 30,
      riskAwareness: 40,
      assumptionCoverage: 50,
      perspectiveDiversity: 50,
      biasExploration: 50,
    });

    expect(insights.some(i => i.label === 'Missing Empirical Evidence' && i.status === 'critical')).toBe(true);
    expect(insights.some(i => i.label === 'Downside Risks Underexplored' && i.status === 'critical')).toBe(true);
  });
});
