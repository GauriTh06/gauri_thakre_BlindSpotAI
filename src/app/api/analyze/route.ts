import { NextRequest, NextResponse } from 'next/server';
import { validateAndSanitizeDecision } from '@/lib/utils/sanitization';
import { checkRateLimit } from '@/lib/utils/rateLimiter';
import { analyzeDecisionWithGemini } from '@/lib/gemini/client';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anon-client';
    const rateLimit = checkRateLimit(ip, 15, 60000);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before requesting another analysis.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const sanitized = validateAndSanitizeDecision(body);

    const decisionId = body.decisionId || `dec-${Date.now()}`;
    const userId = body.userId || 'guest-user';

    const analysis = await analyzeDecisionWithGemini(
      decisionId,
      userId,
      sanitized.title,
      sanitized.context,
      sanitized.goals,
      sanitized.constraints,
      sanitized.confidenceLevel
    );

    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    console.error('API /api/analyze error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process decision analysis' },
      { status: 400 }
    );
  }
}
