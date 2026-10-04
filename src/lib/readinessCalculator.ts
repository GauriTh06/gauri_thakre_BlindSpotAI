import { DecisionAnalysis, ReadinessBreakdown } from '@/types';

export const READINESS_WARNING_BANNER = 
  "This score reflects how thoroughly the decision has been explored, not whether the decision is correct.";

/**
 * Calculates a 0-100 Decision Readiness Score based on 5 core pillars.
 */
export function calculateReadinessScore(breakdown: ReadinessBreakdown): number {
  const {
    evidenceCompleteness,
    riskAwareness,
    assumptionCoverage,
    perspectiveDiversity,
    biasExploration,
  } = breakdown;

  // Weighted formula:
  // Evidence Completeness: 25%
  // Risk Awareness: 25%
  // Assumption Coverage: 20%
  // Perspective Diversity: 15%
  // Bias Exploration: 15%
  const weighted = 
    (evidenceCompleteness * 0.25) +
    (riskAwareness * 0.25) +
    (assumptionCoverage * 0.20) +
    (perspectiveDiversity * 0.15) +
    (biasExploration * 0.15);

  return Math.min(100, Math.max(0, Math.round(weighted)));
}

/**
 * Generates actionable feedback badges based on readiness breakdown
 */
export function getReadinessInsights(breakdown: ReadinessBreakdown): { label: string; status: 'good' | 'warning' | 'critical' }[] {
  const insights: { label: string; status: 'good' | 'warning' | 'critical' }[] = [];

  if (breakdown.evidenceCompleteness < 50) {
    insights.push({ label: 'Missing Empirical Evidence', status: 'critical' });
  } else if (breakdown.evidenceCompleteness >= 80) {
    insights.push({ label: 'Strong Evidence Basis', status: 'good' });
  }

  if (breakdown.riskAwareness < 50) {
    insights.push({ label: 'Downside Risks Underexplored', status: 'critical' });
  } else if (breakdown.riskAwareness >= 80) {
    insights.push({ label: 'Thorough Risk Assessment', status: 'good' });
  }

  if (breakdown.biasExploration < 60) {
    insights.push({ label: 'Potential Unexamined Biases', status: 'warning' });
  } else {
    insights.push({ label: 'High Bias Awareness', status: 'good' });
  }

  if (breakdown.perspectiveDiversity < 60) {
    insights.push({ label: 'Lacks Alternate Viewpoints', status: 'warning' });
  }

  return insights;
}
