import { describe, it, expect } from 'vitest';
import { DecisionAnalysis, BlindSpot, CognitiveBias, MissingEvidenceItem } from '@/types';

describe('Decision Intelligence Component Data Structures & Validation', () => {
  const mockBlindSpot: BlindSpot = {
    id: 'bs-1',
    finding: 'Customer churn assumption unverified',
    category: 'Market & Customer',
    impactLevel: 'High',
    probingQuestion: 'What empirical retention data validates this retention curve?',
    suggestedAction: 'Run 10 customer interviews with churned users.',
  };

  const mockBias: CognitiveBias = {
    id: 'bias-1',
    biasName: 'Confirmation Bias',
    detected: true,
    severity: 'High',
    explanation: 'Overweighting early positive signals while ignoring negative feedback.',
    mitigationPrompt: 'List 3 reasons why this project might fail completely.',
  };

  const mockEvidence: MissingEvidenceItem = {
    id: 'ev-1',
    description: 'Competitive pricing benchmark report',
    urgency: 'Critical',
    category: 'Finance',
    searchQuery: 'B2B enterprise SaaS pricing benchmarks 2026',
  };

  it('should validate blind spot impact levels correctly', () => {
    expect(['High', 'Medium', 'Low']).toContain(mockBlindSpot.impactLevel);
    expect(mockBlindSpot.probingQuestion).toContain('?');
  });

  it('should validate cognitive bias severity categories', () => {
    expect(mockBias.detected).toBe(true);
    expect(['High', 'Medium', 'Low']).toContain(mockBias.severity);
    expect(mockBias.mitigationPrompt.length).toBeGreaterThan(10);
  });

  it('should validate missing evidence urgency levels', () => {
    expect(['Critical', 'Important', 'Nice-to-have']).toContain(mockEvidence.urgency);
    expect(mockEvidence.searchQuery).toBeTruthy();
  });
});
