import { NextResponse } from 'next/server';
import { getPool, initDatabase } from '@/lib/database';

export async function GET() {
  try {
    // Initialize database
    await initDatabase();
    
    const pool = getPool();
    
    // Test connection and get table info
    const result = await pool.query(`
      SELECT COUNT(*) as total_records 
      FROM quiz_results
    `);
    
    const totalRecords = result.rows[0]?.total_records || '0';
    
    // Get recent records
    const recentResults = await pool.query(`
      SELECT id, email, animal_type, selected_traits, cohort_id, created_at
      FROM quiz_results 
      ORDER BY created_at DESC 
      LIMIT 5
    `);
    
    return NextResponse.json({
      success: true,
      totalRecords: parseInt(totalRecords),
      recentResults: recentResults.rows,
      message: 'Database connection successful'
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Database connection failed'
    }, { status: 500 });
  }
}