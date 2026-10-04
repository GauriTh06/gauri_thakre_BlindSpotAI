export interface Decision {
  id: string;
  userId: string;
  title: string;
  context: string;
  goals: string[];
  constraints: string[];
  confidenceLevel: number; // 1 - 10
  templateId?: string;
  status: 'draft' | 'analyzed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export type BlindSpotCategoryType = 
  | 'Hidden Assumptions'
  | 'Risks'
  | 'Missing Information'
  | 'Unknown Factors'
  | 'Dependencies'
  | 'Potential Consequences';

export interface BlindSpotFinding {
  id: string;
  category: BlindSpotCategoryType;
  finding: string;
  explanation: string;
  whyItMatters: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export type AiCouncilRole = 'Optimist' | 'Skeptic' | 'Researcher' | 'Challenger';

export interface AiCouncilPerspective {
  role: AiCouncilRole;
  title: string;
  focus: string;
  analysis: string;
  keyQuestions: string[];
  opportunitiesOrRisks: string[];
}

export type CognitiveBiasType = 
  | 'Confirmation Bias'
  | 'Anchoring Bias'
  | 'Availability Bias'
  | 'Overconfidence Bias'
  | 'Sunk Cost Fallacy';

export interface CognitiveBias {
  name: CognitiveBiasType;
  detected: boolean;
  whyItMightExist: string;
  evidence: string;
  reflectionQuestions: string[];
}

export type EvidenceCategory = 
  | 'Customer Interviews'
  | 'Market Research'
  | 'Financial Projections'
  | 'Historical Examples'
  | 'Expert Opinions'
  | 'Technical Validation';

export interface MissingEvidenceItem {
  id: string;
  assumption: string;
  missingEvidence: string;
  category: EvidenceCategory;
  impactOnDecision: string;
  suggestedActionToVerify: string;
}

export type StakeholderGroup = 
  | 'User'
  | 'Family'
  | 'Team'
  | 'Customers'
  | 'Investors'
  | 'Society';

export interface StakeholderImpact {
  stakeholder: StakeholderGroup;
  benefits: string[];
  risks: string[];
  concerns: string[];
  unknowns: string[];
}

export interface ReadinessBreakdown {
  evidenceCompleteness: number; // 0-100
  riskAwareness: number;        // 0-100
  assumptionCoverage: number;   // 0-100
  perspectiveDiversity: number; // 0-100
  biasExploration: number;      // 0-100
}

export interface DecisionCanvasData {
  goals: string[];
  assumptions: string[];
  risks: string[];
  opportunities: string[];
  missingInformation: string[];
  missingEvidence: string[];
  stakeholders: string[];
  reflectionQuestions: string[];
}

export interface DecisionAnalysis {
  id: string;
  decisionId: string;
  userId: string;
  readinessScore: number;
  readinessBreakdown: ReadinessBreakdown;
  blindSpots: BlindSpotFinding[];
  aiCouncil: AiCouncilPerspective[];
  cognitiveBiases: CognitiveBias[];
  missingEvidence: MissingEvidenceItem[];
  stakeholderImpacts: StakeholderImpact[];
  canvasData: DecisionCanvasData;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  decisionId: string;
  userId: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  cognitivePrompts?: string[];
}

export interface DecisionJournalEntry {
  id: string;
  decisionId: string;
  userId: string;
  originalDecisionTitle: string;
  originalConfidence: number;
  revisedConfidence?: number;
  summary: string;
  keyTakeaways: string[];
  reflectionNotes: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'reviewed' | 'archived';
}

export interface DecisionTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  starterTitle: string;
  starterContext: string;
  starterGoals: string[];
  starterConstraints: string[];
  starterConfidence: number;
}
