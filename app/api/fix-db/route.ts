import { NextResponse } from 'next/server';
import { getPool } from '@/lib/database';

export async function POST() {
  try {
    const pool = getPool();
    
    // Drop the existing table and recreate with correct schema
    await pool.query('DROP TABLE IF EXISTS quiz_results');
    
    // Create table with nullable email
    await pool.query(`
      CREATE TABLE quiz_results (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255),
        animal_type VARCHAR(50) NOT NULL,
        selected_traits JSONB NOT NULL,
        cohort_id VARCHAR(255),
        session_id VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create index on cohort_id for faster queries
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quiz_results_cohort_id 
      ON quiz_results(cohort_id) 
      WHERE cohort_id IS NOT NULL;
    `);
    
    return NextResponse.json({
      success: true,
      message: 'Database schema fixed successfully'
    });
    
  } catch (error) {
    console.error('Database fix error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}