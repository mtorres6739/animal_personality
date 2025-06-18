import { NextRequest, NextResponse } from 'next/server';
import { getCohortStats, initDatabase } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { cohortId: string } }
) {
  try {
    // Initialize database if needed
    await initDatabase();
    
    const cohortId = decodeURIComponent(params.cohortId);
    
    if (!cohortId || cohortId.trim() === '') {
      return NextResponse.json(
        { error: 'Cohort ID is required' },
        { status: 400 }
      );
    }

    const cohortStats = await getCohortStats(cohortId);
    
    return NextResponse.json({
      success: true,
      cohortStats
    });

  } catch (error) {
    console.error('Error fetching cohort stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cohort data' },
      { status: 500 }
    );
  }
}