# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Animal Personality Quiz application built with Next.js 13.5, TypeScript, and PostgreSQL. The quiz determines user personality types based on animal archetypes (Dove, Owl, Peacock, Shark) through a 20-question assessment.

## Commands

### Development
```bash
npm run dev       # Start development server on localhost:3000
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

### Database
The application uses PostgreSQL with the `pg` library. Database connection is configured through environment variables:
- `CONNECTION_STRING_DIRECT` (primary)
- `DATABASE_URL` (fallback)
- `POSTGRES_URL` (fallback)

### Email Service
Uses Brevo (formerly SendinBlue) for transactional emails. Requires:
- `BREVO_API_KEY`
- `FROM_EMAIL`

## Architecture

### Tech Stack
- **Frontend**: Next.js 13.5 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: PostgreSQL with raw SQL queries via `pg` library
- **Email**: Brevo API for sending quiz results
- **State Management**: React hooks and local state
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion

### Project Structure
```
/app                    # Next.js App Router
  /api                  # API routes for backend operations
    /save-quiz          # Save quiz results without email
    /submit             # Submit email and send results
    /cohort             # Get cohort statistics
    /quiz-stats         # Get overall quiz statistics
  layout.tsx            # Root layout
  page.tsx              # Home page with quiz container

/components
  /quiz                 # Quiz-specific components
    /steps              # Step components (welcome, questions, results, thank-you)
    quiz-container.tsx  # Main quiz orchestrator
  /ui                   # Reusable UI components (shadcn/ui based)

/lib                    # Core business logic
  database.ts           # PostgreSQL operations
  email.ts              # Brevo email integration
  quiz-data.ts          # Animal archetypes and quiz logic
  trait-definitions.ts  # Trait definitions and mappings
```

### Data Flow
1. **Session Management**: Each quiz session gets a unique ID generated on mount
2. **Quiz Flow**: Welcome → Questions (20) → Results → Thank You
3. **Saving Strategy**: 
   - Quiz results saved immediately after questions (without email)
   - Email updated separately when user submits on results page
   - Non-blocking saves to ensure smooth UX even if database fails

### Animal Type Determination
The quiz uses a scoring system where:
- Each selected trait is matched against animal archetype traits
- Primary trait matches get 2 points
- Traits mentioned in strengths get 1 point
- Animal with highest score becomes the result
- Blended percentages show how much of each animal type the user exhibits

### Database Schema
```sql
quiz_results (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  animal_type VARCHAR(50) NOT NULL,
  selected_traits JSONB NOT NULL,
  cohort_id VARCHAR(255),
  session_id VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Key Features
- **Cohort Support**: Track group results via cohort IDs
- **Social Sharing**: Generate shareable links and QR codes
- **Progress Tracking**: Visual progress bar and step indicators
- **Responsive Design**: Mobile-first with animated backgrounds
- **Email Results**: Comprehensive results sent via Brevo
- **Statistics**: Track total quiz takers and cohort distributions

## Environment Variables

Required environment variables:
```
CONNECTION_STRING_DIRECT  # PostgreSQL connection string
BREVO_API_KEY            # Brevo API key for sending emails
FROM_EMAIL               # Sender email address
```

## API Endpoints

- `POST /api/save-quiz` - Save quiz results (no email required)
- `POST /api/submit` - Update result with email and send email
- `GET /api/cohort/[cohortId]` - Get cohort statistics
- `GET /api/quiz-stats` - Get total quiz taker count[byterover-mcp]

# important 
always use byterover-retrieve-knowledge tool to get the related context before any tasks 
always use byterover-store-knowledge to store all the critical informations after sucessful tasks