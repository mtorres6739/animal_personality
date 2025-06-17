import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, selectedTraits, animalResult, cohortId } = body;

    // Validate required fields
    if (!email || !selectedTraits || !animalResult) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email with results
    // For now, we'll simulate these operations

    console.log('Quiz submission:', {
      email,
      animalResult,
      traitsCount: selectedTraits.length,
      cohortId
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      emailSent: true,
      message: 'Results sent successfully'
    });

  } catch (error) {
    console.error('Error processing quiz submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}