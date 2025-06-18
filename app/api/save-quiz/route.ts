import { NextRequest, NextResponse } from 'next/server';
import { saveQuizResult, initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed
    await initDatabase();
    
    const body = await request.json();
    const { selectedTraits, animalResult, cohortId, sessionId } = body;

    // Validate required fields
    if (!selectedTraits || !animalResult || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save quiz results without email
    const savedResult = await saveQuizResult({
      animalType: animalResult,
      selectedTraits,
      cohortId: cohortId || undefined,
      sessionId
    });

    console.log('Quiz results saved (without email):', {
      id: savedResult.id,
      animalResult,
      traitsCount: selectedTraits.length,
      cohortId,
      sessionId
    });

    return NextResponse.json({
      success: true,
      message: 'Quiz results saved successfully',
      sessionId
    });

  } catch (error) {
    console.error('Error saving quiz results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}