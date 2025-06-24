import { NextRequest, NextResponse } from 'next/server';
import { getTotalQuizTakers, getQuizTakerNumber, initDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Initialize database if needed
    await initDatabase();
    
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get both total count and user's position
    const [totalQuizTakers, quizTakerNumber] = await Promise.all([
      getTotalQuizTakers(),
      getQuizTakerNumber(sessionId)
    ]);

    return NextResponse.json({
      totalQuizTakers,
      quizTakerNumber,
      sessionId
    });

  } catch (error) {
    console.error('Quiz stats error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        totalQuizTakers: 0,
        quizTakerNumber: 0
      },
      { status: 500 }
    );
  }
}
