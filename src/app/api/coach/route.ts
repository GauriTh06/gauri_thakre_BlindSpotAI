import { NextRequest, NextResponse } from 'next/server';
import { askReflectionCoach } from '@/lib/gemini/client';
import { sanitizeInput } from '@/lib/utils/sanitization';
import { checkRateLimit } from '@/lib/utils/rateLimiter';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anon-client';
    const rateLimit = checkRateLimit(`coach-${ip}`, 20, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { decisionTitle, decisionContext, userMessage, history } = body;

    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const sanitizedMsg = sanitizeInput(userMessage);
    const sanitizedTitle = sanitizeInput(decisionTitle || '');
    const sanitizedContext = sanitizeInput(decisionContext || '');

    const reply = await askReflectionCoach(
      sanitizedTitle,
      sanitizedContext,
      sanitizedMsg,
      history || []
    );

    return NextResponse.json({ success: true, reply });
  } catch (error: any) {
    console.error('API /api/coach error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate coach reflection' },
      { status: 500 }
    );
  }
}
