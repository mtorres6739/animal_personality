import { NextRequest, NextResponse } from 'next/server';
import { updateQuizResultWithEmail, getQuizResultBySessionId, initDatabase } from '@/lib/database';
import { sendQuizResults } from '@/lib/email';
import { animalArchetypes } from '@/lib/quiz-data';

export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed
    await initDatabase();
    
    const body = await request.json();
    const { email, sessionId } = body;

    // Validate required fields
    if (!email || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update existing quiz result with email
    const updatedResult = await updateQuizResultWithEmail(sessionId, email);

    if (!updatedResult) {
      return NextResponse.json(
        { error: 'Quiz session not found' },
        { status: 404 }
      );
    }

    console.log('Email added to quiz result:', {
      id: updatedResult.id,
      email,
      sessionId
    });

    // Get the complete quiz results to send in email
    const quizResult = await getQuizResultBySessionId(sessionId);
    
    if (quizResult) {
      const animalData = animalArchetypes[quizResult.animal_type];
      const selectedTraits = quizResult.selected_traits;
      
      // Send actual email with results
      await sendQuizResults(
        email,
        quizResult.animal_type,
        animalData,
        selectedTraits,
        quizResult.cohort_id
      );

      console.log('Email sent successfully to:', email);
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      message: 'Email saved and results sent successfully'
    });

  } catch (error) {
    console.error('Error processing email submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}