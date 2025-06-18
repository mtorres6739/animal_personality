import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.CONNECTION_STRING_DIRECT || process.env.DATABASE_URL || process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
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
  
  const result = await pool.query(
    `INSERT INTO quiz_results (animal_type, selected_traits, cohort_id, session_id)
     VALUES ($1, $2, $3, $4)
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