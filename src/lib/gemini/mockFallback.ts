import { DecisionAnalysis, BlindSpotFinding, AiCouncilPerspective, CognitiveBias, MissingEvidenceItem, StakeholderImpact } from '@/types';
import { calculateReadinessScore } from '../readinessCalculator';

export function generateMockAnalysis(
  decisionId: string,
  userId: string,
  title: string,
  context: string,
  goals: string[],
  constraints: string[],
  confidenceLevel: number
): DecisionAnalysis {
  const readinessBreakdown = {
    evidenceCompleteness: Math.max(30, Math.min(85, 100 - (confidenceLevel * 6))),
    riskAwareness: 65,
    assumptionCoverage: 55,
    perspectiveDiversity: 60,
    biasExploration: 50,
  };

  const readinessScore = calculateReadinessScore(readinessBreakdown);

  const blindSpots: BlindSpotFinding[] = [
    {
      id: 'bs-1',
      category: 'Hidden Assumptions',
      finding: 'Unverified assumption regarding timeline speed and adoption rates.',
      explanation: `You are implicitly assuming that key stakeholders will adapt quickly without friction. Context implies minimal pushback, but transition friction is statistically common.`,
      whyItMatters: 'If adoption takes 2x longer, operational costs and stress escalate significantly.',
      severity: 'high',
    },
    {
      id: 'bs-2',
      category: 'Risks',
      finding: 'Single point of failure and bottleneck risk in initial execution phase.',
      explanation: 'The plan relies heavily on top-tier performance with low tolerance for unexpected resource bottlenecks or external shifts.',
      whyItMatters: 'Unforeseen interruptions could cause domino delays across secondary goals.',
      severity: 'medium',
    },
    {
      id: 'bs-3',
      category: 'Missing Information',
      finding: 'Absence of baseline quantitative metrics from comparable historical decisions.',
      explanation: 'No benchmark data or control group metrics were cited to substantiate confidence level.',
      whyItMatters: 'Without comparative baseline data, confidence numbers are anchored to subjective sentiment.',
      severity: 'high',
    },
    {
      id: 'bs-4',
      category: 'Unknown Factors',
      finding: 'Macro-economic & third-party dependency shifts during execution window.',
      explanation: 'External market regulations or supplier terms could change midway through implementation.',
      whyItMatters: 'External factors outside direct control can invalidate core financial assumptions.',
      severity: 'medium',
    },
    {
      id: 'bs-5',
      category: 'Dependencies',
      finding: 'Sequential execution chain where Phase 2 cannot start without Phase 1 perfection.',
      explanation: 'Sub-goals are tightly coupled rather than parallelized or decoupled.',
      whyItMatters: 'A minor delay in early milestones causes linear slippage across the entire timeline.',
      severity: 'low',
    },
    {
      id: 'bs-6',
      category: 'Potential Consequences',
      finding: 'Opportunity cost of capital & focus diverted from secondary growth initiatives.',
      explanation: 'Committing resources here precludes pursuing 2 alternate opportunities for at least 6 months.',
      whyItMatters: 'Evaluating what is sacrificed is just as vital as evaluating what is gained.',
      severity: 'high',
    }
  ];

  const aiCouncil: AiCouncilPerspective[] = [
    {
      role: 'Optimist',
      title: 'Growth & Opportunity Perspective',
      focus: 'Opportunities, Upsides, Growth possibilities',
      analysis: `Pursuing "${title}" opens strategic leverage points. If execution goes as planned, it unlocks compound advantages, expanding authority and future options.`,
      keyQuestions: [
        'What is the maximum realistic upside if everything goes right?',
        'How can we design this initiative to create long-term enterprise value?'
      ],
      opportunitiesOrRisks: [
        'Unlocks high-leverage growth trajectory',
        'Establishes competitive differentiation in key segment'
      ]
    },
    {
      role: 'Skeptic',
      title: 'Downside & Vulnerability Perspective',
      focus: 'Risks, Weaknesses, Failure points',
      analysis: `The current context over-indexes on best-case scenarios. What happens if revenue/adoption is 50% of forecast and costs are 30% higher?`,
      keyQuestions: [
        'What is the precise kill-criterion where we abort or pivot?',
        'Which constraint in your list is most fragile under pressure?'
      ],
      opportunitiesOrRisks: [
        'Overestimating execution speed',
        'Underfunding contingency buffers'
      ]
    },
    {
      role: 'Researcher',
      title: 'Empirical Evidence & Data Perspective',
      focus: 'Missing evidence, Missing data, Questions needing answers',
      analysis: `Your confidence rating of ${confidenceLevel}/10 relies primarily on qualitative intuition. We need 3 empirical data points to validate core premises before committing.`,
      keyQuestions: [
        'What historical case studies closely match this specific scenario?',
        'What minimum viable test can be conducted in 7 days to gather data?'
      ],
      opportunitiesOrRisks: [
        'Lack of benchmarked user/market data',
        'High reliance on subjective projections'
      ]
    },
    {
      role: 'Challenger',
      title: 'Counter-Hypothesis & Framing Perspective',
      focus: 'Counterarguments, Opposite viewpoints, Alternative interpretations',
      analysis: `Suppose the exact OPPOSITE of your core assumption is true. What if doing nothing or taking an inverted micro-step yields 80% of the benefit with 10% of the risk?`,
      keyQuestions: [
        'If an outsider examined this decision, what alternative solution would they propose?',
        'Are you solving the root problem or just a symptom of a deeper bottleneck?'
      ],
      opportunitiesOrRisks: [
        'Alternative zero-capital option exists',
        'Current problem statement may be incorrectly framed'
      ]
    }
  ];

  const cognitiveBiases: CognitiveBias[] = [
    {
      name: 'Confirmation Bias',
      detected: true,
      whyItMightExist: 'You may be selectively looking for evidence that validates your initial leaning while glossing over counter-indicators.',
      evidence: `Confidence level is ${confidenceLevel}/10 despite key unverified market/stakeholder variables.`,
      reflectionQuestions: [
        'What is the strongest evidence AGAINST your preferred path?',
        'Have you consulted anyone who strongly disagrees with this idea?'
      ]
    },
    {
      name: 'Anchoring Bias',
      detected: true,
      whyItMightExist: 'Your expectations are heavily anchored to your first estimate or initial offer.',
      evidence: 'Context references initial figures as baseline targets without stress testing.',
      reflectionQuestions: [
        'If you reset all metrics from scratch today, what targets would you set?',
        'How much of your timeline is anchored to arbitrary deadlines?'
      ]
    },
    {
      name: 'Availability Bias',
      detected: false,
      whyItMightExist: 'Weighting recent successes or high-visibility failures disproportionately.',
      evidence: 'No obvious over-reliance on recent isolated events detected.',
      reflectionQuestions: [
        'Are you judging risk based on actual statistics or recent memorable stories?'
      ]
    },
    {
      name: 'Overconfidence Bias',
      detected: confidenceLevel >= 7,
      whyItMightExist: confidenceLevel >= 7 
        ? 'High confidence rating prior to completing formal risk and evidence mapping.'
        : 'Moderate confidence level indicates healthy initial caution.',
      evidence: `Stated confidence level of ${confidenceLevel}/10 prior to blind spot analysis.`,
      reflectionQuestions: [
        'What specific facts, if proven wrong, would reduce your confidence to 3/10?',
        'How often have similar past decisions taken longer than anticipated?'
      ]
    },
    {
      name: 'Sunk Cost Fallacy',
      detected: context.toLowerCase().includes('already') || context.toLowerCase().includes('spent') || context.toLowerCase().includes('legacy'),
      whyItMightExist: 'Past time, effort, or capital invested may be influencing future commitment.',
      evidence: 'References to previous investments in context.',
      reflectionQuestions: [
        'If you were starting completely fresh with zero sunk investment, would you make this exact move?'
      ]
    }
  ];

  const missingEvidence: MissingEvidenceItem[] = [
    {
      id: 'me-1',
      assumption: 'Key stakeholders will readily approve and adapt to the change.',
      missingEvidence: 'Direct user feedback, survey data, or formal stakeholder interviews.',
      category: 'Customer Interviews',
      impactOnDecision: 'Without direct interviews, user resistance could derail rollout.',
      suggestedActionToVerify: 'Conduct 5 structured 15-minute interviews with key stakeholders this week.'
    },
    {
      id: 'me-2',
      assumption: 'Financial runway and cost projections will remain stable during execution.',
      missingEvidence: 'Sensitivity model showing 20% cost overrun and 30% revenue delay.',
      category: 'Financial Projections',
      impactOnDecision: 'Unfunded cost spikes could cause emergency liquidity pressure.',
      suggestedActionToVerify: 'Build a downside financial stress-test scenario in spreadsheet.'
    },
    {
      id: 'me-3',
      assumption: 'Selected technical/operational approach will perform smoothly under scale.',
      missingEvidence: 'Benchmark test data or historical case studies of similar implementations.',
      category: 'Technical Validation',
      impactOnDecision: 'Performance bottlenecks could force emergency refactoring.',
      suggestedActionToVerify: 'Run a 48-hour pilot prototype test.'
    },
    {
      id: 'me-4',
      assumption: 'External market conditions will remain favorable.',
      missingEvidence: 'Industry reports and expert second opinions on market shifts.',
      category: 'Market Research',
      impactOnDecision: 'Macro shifts could render value proposition obsolete.',
      suggestedActionToVerify: 'Consult 2 industry specialists outside your immediate network.'
    }
  ];

  const stakeholderImpacts: StakeholderImpact[] = [
    {
      stakeholder: 'User',
      benefits: ['Direct progress toward core personal & career goals', 'Increased skill leverage'],
      risks: ['Burnout from over-committing', 'High initial mental friction'],
      concerns: ['Time allocation balance'],
      unknowns: ['Long-term personal satisfaction']
    },
    {
      stakeholder: 'Family',
      benefits: ['Potential financial & quality-of-life upside long-term'],
      risks: ['Reduced availability during initial transition period'],
      concerns: ['Financial stability buffer'],
      unknowns: ['Spousal stress during peak workload']
    },
    {
      stakeholder: 'Team',
      benefits: ['Clearer direction and potential growth opportunities'],
      risks: ['Role ambiguity during early transition', 'Workload spikes'],
      concerns: ['Burnout and morale retention'],
      unknowns: ['Speed of team skill adaptation']
    },
    {
      stakeholder: 'Customers',
      benefits: ['Improved product/service offering quality over time'],
      risks: ['Temporary disruption during transition phase'],
      concerns: ['Pricing or workflow shifts'],
      unknowns: ['Customer sentiment response rate']
    },
    {
      stakeholder: 'Investors',
      benefits: ['Sharper strategic alignment and upside potential'],
      risks: ['Capital burn rate increase if timeline slips'],
      concerns: ['Milestone delivery speed'],
      unknowns: ['Future valuation impact']
    },
    {
      stakeholder: 'Society',
      benefits: ['Ethical and positive community value creation'],
      risks: ['Minimal systemic downside if contained'],
      concerns: ['Resource sustainability'],
      unknowns: ['Secondary external effects']
    }
  ];

  const canvasData = {
    goals,
    assumptions: [
      'Execution timeline will proceed without major external friction',
      'Stakeholders will align once initial results are demonstrated',
      'Capital and resource allocation is sufficient for initial phase'
    ],
    risks: [
      'Unexpected timeline slippage causing budget strain',
      'Key team or personal burnout during peak implementation',
      'Market/external context shifting midway through execution'
    ],
    opportunities: [
      'Unlocks high-leverage growth trajectory',
      'Builds strategic capability and competitive moat'
    ],
    missingInformation: [
      'Comparative baseline performance metrics',
      'Downside stress-test scenario model'
    ],
    missingEvidence: missingEvidence.map(m => m.missingEvidence),
    stakeholders: ['User', 'Family', 'Team', 'Customers', 'Investors', 'Society'],
    reflectionQuestions: [
      'What is the single most dangerous assumption in your plan?',
      'If you had to make a decision in 24 hours with half the budget, how would you reframe it?',
      'Who is affected by this decision who has not yet been consulted?'
    ]
  };

  return {
    id: `analysis-${Date.now()}`,
    decisionId,
    userId,
    readinessScore,
    readinessBreakdown,
    blindSpots,
    aiCouncil,
    cognitiveBiases,
    missingEvidence,
    stakeholderImpacts,
    canvasData,
    createdAt: new Date().toISOString(),
  };
}
