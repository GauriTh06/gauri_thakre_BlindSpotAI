import { GoogleGenerativeAI } from '@google/generative-ai';
import { DecisionAnalysis } from '@/types';
import { buildAnalysisPrompt, REFLECTION_COACH_SYSTEM_PROMPT } from './prompts';
import { generateMockAnalysis } from './mockFallback';

const apiKey = process.env.GEMINI_API_KEY || '';

export async function analyzeDecisionWithGemini(
  decisionId: string,
  userId: string,
  title: string,
  context: string,
  goals: string[],
  constraints: string[],
  confidenceLevel: number
): Promise<DecisionAnalysis> {
  if (!apiKey || apiKey === 'mock_demo_gemini_key') {
    console.log('[BlindSpot AI] No Gemini API key configured — using structured fallback analysis.');
    return generateMockAnalysis(decisionId, userId, title, context, goals, constraints, confidenceLevel);
  }
  console.log('[BlindSpot AI] Gemini API key detected — calling live API...');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = buildAnalysisPrompt(title, context, goals, constraints, confidenceLevel);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text() || '';

    // Strip markdown code fences if returned
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);

    return {
      id: `analysis-${Date.now()}`,
      decisionId,
      userId,
      readinessScore: parsed.readinessBreakdown 
        ? Math.round(
            (parsed.readinessBreakdown.evidenceCompleteness * 0.25) +
            (parsed.readinessBreakdown.riskAwareness * 0.25) +
            (parsed.readinessBreakdown.assumptionCoverage * 0.20) +
            (parsed.readinessBreakdown.perspectiveDiversity * 0.15) +
            (parsed.readinessBreakdown.biasExploration * 0.15)
          )
        : 65,
      readinessBreakdown: parsed.readinessBreakdown || {
        evidenceCompleteness: 60,
        riskAwareness: 65,
        assumptionCoverage: 55,
        perspectiveDiversity: 60,
        biasExploration: 50,
      },
      blindSpots: (parsed.blindSpots || []).map((b: any, idx: number) => ({
        id: `bs-${idx}`,
        category: b.category,
        finding: b.finding,
        explanation: b.explanation,
        whyItMatters: b.whyItMatters,
        severity: b.severity || 'medium',
      })),
      aiCouncil: parsed.aiCouncil || [],
      cognitiveBiases: parsed.cognitiveBiases || [],
      missingEvidence: (parsed.missingEvidence || []).map((m: any, idx: number) => ({
        id: `me-${idx}`,
        ...m
      })),
      stakeholderImpacts: parsed.stakeholderImpacts || [],
      canvasData: parsed.canvasData || {
        goals,
        assumptions: [],
        risks: [],
        opportunities: [],
        missingInformation: [],
        missingEvidence: [],
        stakeholders: [],
        reflectionQuestions: [],
      },
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn('Gemini API call fallback to mock:', error);
    return generateMockAnalysis(decisionId, userId, title, context, goals, constraints, confidenceLevel);
  }
}

export async function askReflectionCoach(
  decisionTitle: string,
  decisionContext: string,
  userMessage: string,
  history: { role: 'user' | 'model'; content: string }[]
): Promise<string> {
  if (!apiKey || apiKey === 'mock_demo_gemini_key') {
    return generateMockCoachResponse(userMessage);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const formattedHistory = history.map(h => `${h.role === 'user' ? 'USER' : 'COACH'}: ${h.content}`).join('\n');

    const prompt = `
${REFLECTION_COACH_SYSTEM_PROMPT}

DECISION TITLE: "${decisionTitle}"
DECISION CONTEXT: "${decisionContext}"

CONVERSATION HISTORY:
${formattedHistory}

USER RECENT MESSAGE: "${userMessage}"

Remember: NEVER suggest an option or make a recommendation. Ask Socratic questions to challenge assumptions and uncover blind spots.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || generateMockCoachResponse(userMessage);
  } catch (err) {
    console.warn('Reflection coach Gemini API fallback:', err);
    return generateMockCoachResponse(userMessage);
  }
}

function generateMockCoachResponse(userMessage: string): string {
  return `Thank you for sharing that reflection. When you say "${userMessage.slice(0, 45)}...", it reveals an implicit assumption about control over outcomes.

Consider this Socratic angle:
1. What evidence would prove that your current interpretation of this situation is incorrect?
2. If you had to remove your top constraint completely, how would your options change?
3. Who stands to lose the most if this decision unfolds as expected, and have their concerns been addressed?`;
}
