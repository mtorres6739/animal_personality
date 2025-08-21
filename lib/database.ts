import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.CONNECTION_STRING_DIRECT || process.env.DATABASE_URL || process.env.POSTGRES_URL;
    
    // If no connection string is provided, throw a meaningful error
    if (!connectionString) {
      throw new Error('Database connection not configured. Please set CONNECTION_STRING_DIRECT, DATABASE_URL, or POSTGRES_URL environment variable.');
    }
    
    // Check if we should use SSL based on the connection string
    const shouldUseSSL = connectionString && (
      connectionString.includes('sslmode=require') || 
      connectionString.includes('ssl=true') ||
      connectionString.includes('amazonaws.com') ||
      connectionString.includes('supabase.co') ||
      connectionString.includes('neon.tech')
    );
    
    pool = new Pool({
      connectionString,
      ssl: shouldUseSSL ? { rejectUnauthorized: false } : false,
    });
  }
  return pool;
}

export async function initDatabase() {
  const pool = getPool();
  
  // Create tables if they don't exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS quiz_results (
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
}

export async function saveQuizResult(data: {
  animalType: string;
  selectedTraits: string[];
  cohortId?: string;
  sessionId: string;
}) {
  const pool = getPool();

  // Use UPSERT (INSERT ... ON CONFLICT) to handle duplicate session IDs
  const result = await pool.query(
    `INSERT INTO quiz_results (animal_type, selected_traits, cohort_id, session_id)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (session_id)
     DO UPDATE SET
       animal_type = EXCLUDED.animal_type,
       selected_traits = EXCLUDED.selected_traits,
       cohort_id = EXCLUDED.cohort_id,
       updated_at = CURRENT_TIMESTAMP
     RETURNING id`,
    [data.animalType, JSON.stringify(data.selectedTraits), data.cohortId || null, data.sessionId]
  );

  return result.rows[0];
}

export async function updateQuizResultWithEmail(sessionId: string, email: string) {
  const pool = getPool();
  
  const result = await pool.query(
    `UPDATE quiz_results 
     SET email = $1, updated_at = CURRENT_TIMESTAMP
     WHERE session_id = $2
     RETURNING id`,
    [email, sessionId]
  );
  
  return result.rows[0];
}

export async function getQuizResultBySessionId(sessionId: string) {
  const pool = getPool();
  
  const result = await pool.query(
    `SELECT id, email, animal_type, selected_traits, cohort_id, session_id, created_at, updated_at
     FROM quiz_results 
     WHERE session_id = $1`,
    [sessionId]
  );
  
  return result.rows[0];
}

export async function getCohortStats(cohortId: string) {
  const pool = getPool();

  // Get animal type distribution for the cohort
  const result = await pool.query(
    `SELECT
       animal_type,
       COUNT(*) as count,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 1) as percentage
     FROM quiz_results
     WHERE cohort_id = $1
     GROUP BY animal_type
     ORDER BY count DESC`,
    [cohortId]
  );

  // Get total participants
  const totalResult = await pool.query(
    `SELECT COUNT(DISTINCT session_id) as total_participants
     FROM quiz_results
     WHERE cohort_id = $1`,
    [cohortId]
  );

  const totalParticipants = parseInt(totalResult.rows[0]?.total_participants || '0');

  return {
    cohortId,
    totalParticipants,
    distributions: result.rows.map(row => ({
      animal: row.animal_type,
      count: parseInt(row.count),
      percentage: parseFloat(row.percentage)
    }))
  };
}

export async function getTotalQuizTakers(): Promise<number> {
  const pool = getPool();

  try {
    const result = await pool.query(
      `SELECT COUNT(DISTINCT session_id) as total_count
       FROM quiz_results`
    );

    return parseInt(result.rows[0]?.total_count || '0');
  } catch (error) {
    console.error('Error getting total quiz takers:', error);
    return 0; // Return 0 if there's an error
  }
}

export async function getQuizTakerNumber(sessionId: string): Promise<number> {
  const pool = getPool();

  try {
    // Get the creation timestamp of the current session
    const sessionResult = await pool.query(
      `SELECT created_at FROM quiz_results WHERE session_id = $1`,
      [sessionId]
    );

    if (!sessionResult.rows[0]) {
      return 0; // Session not found
    }

    const sessionCreatedAt = sessionResult.rows[0].created_at;

    // Count how many unique sessions were created before this one
    const countResult = await pool.query(
      `SELECT COUNT(DISTINCT session_id) as position
       FROM quiz_results
       WHERE created_at <= $1`,
      [sessionCreatedAt]
    );

    return parseInt(countResult.rows[0]?.position || '0');
  } catch (error) {
    console.error('Error getting quiz taker number:', error);
    return 0; // Return 0 if there's an error
  }
}