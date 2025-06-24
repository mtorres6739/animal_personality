import { NextRequest, NextResponse } from 'next/server';
import { saveQuizResult, initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed
    await initDatabase();
    
    const body = await request.json();
    const { sessionId } = body;

    // Test saving the same session ID twice to verify UPSERT works
    const testData = {
      animalType: 'dove',
      selectedTraits: ['peaceful', 'friendly', 'loyal'],
      cohortId: 'test-cohort',
      sessionId: sessionId || 'test-session-123'
    };

    console.log('Testing first save...');
    const firstSave = await saveQuizResult(testData);
    console.log('First save result:', firstSave);

    console.log('Testing second save (should update, not fail)...');
    const secondSave = await saveQuizResult({
      ...testData,
      animalType: 'owl', // Different animal type
      selectedTraits: ['logical', 'methodical']
    });
    console.log('Second save result:', secondSave);

    return NextResponse.json({
      success: true,
      message: 'UPSERT test completed successfully',
      firstSave,
      secondSave
    });

  } catch (error) {
    console.error('Test save error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      },
      { status: 500 }
    );
  }
}
