# Teen Spending Coach & Wealth Predictor

A modern web application built with React and TypeScript to help teenagers develop healthy financial habits and predict their financial future.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **UI Components**: Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Project Structure

```
src/
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
├── index.css         # Global styles
└── vite-env.d.ts     # Vite environment types
```

## Features

- User authentication with Supabase
- Spending tracking and analytics
- Financial goal setting
- Wealth prediction based on savings patterns
- Responsive design for mobile and desktop

## Development

The project uses:
- **Vite** for fast development and optimized builds
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **ESLint** for code quality

## Building for Production

```bash
npm run build
```

The optimized build will be generated in the `dist/` directory.

## License

MIT

PLAN:
Plan: Teen Financial Literacy Web App - "Spending Coach + Wealth Predictor"

Based on my analysis, this is a greenfield project with a basic Vite + React + TypeScript starter and configured Bolt Database connection. The database is empty and needs complete setup. I'll create a comprehensive plan to build this educational platform.

1. Database Foundation & Security

    Create complete Bolt Database schema with 9 tables: classes, profiles, weeks, expenses, challenges, challenge_completions, quizzes, quiz_attempts, and lesson_progress
    Design and implement Row Level Security policies for student data isolation and teacher aggregated read access
    Create database views for teacher dashboard: class_weekly_aggregates and class_quiz_trait_aggregates
    Set up database functions for secure PIN hashing and validation
    Write seed data script with 8+ challenges and 10 lesson definitions
    Add database indexes for performance on common queries
    Create migration file with all DDL statements

2. Core Infrastructure & Routing

    Install missing dependencies: react-router-dom for routing and recharts for data visualization
    Set up Bolt Database client singleton with environment variables
    Create authentication context provider for PIN-based pseudonymous sessions
    Build protected route wrapper component that checks authentication state
    Set up React Router with all 11 routes: landing, join, onboarding, input, dashboard, learn, challenges, quiz, future, settings, teacher
    Create global state management for user profile and session data
    Build reusable layout components with navigation for student and teacher views

3. Authentication & Onboarding Flow

    Build landing page with app introduction, privacy notice, and call-to-action buttons in European Portuguese
    Create join page with form for class code, student alias, and PIN entry with validation
    Implement PIN-based authentication service with secure session management using localStorage/sessionStorage
    Build onboarding flow with three steps: set weekly allowance, set savings goal, choose learning goals
    Add privacy disclaimer panel emphasizing pseudonymous data and no PII collection
    Create profile creation API calls to Bolt Database with initial user settings
    Build welcome confirmation screen after successful onboarding

4. Weekly Expense Tracking System

    Build weekly input page with date picker for week selection
    Create expense entry form with category dropdown, amount input, need/want toggle, optional note field, and date picker
    Implement dynamic expense list with add, edit, and delete functionality
    Add "sample data" generator button for demo purposes with realistic teen spending patterns
    Build income/allowance entry field for the selected week
    Create scoring calculation engine that computes: savings rate, wants share, category concentration, impulse proxy, and challenge bonus
    Implement save functionality that writes week record, expenses, and computed metrics to Bolt Database
    Add validation to prevent duplicate week entries and ensure data integrity

5. Student Analytics Dashboard

    Create dashboard layout with KPI card grid showing: weekly score, savings rate, wants percentage, saved amount, streak count, and challenges completed
    Build time-series line chart for weekly score trend over last 12 weeks using Recharts
    Build time-series line chart for savings trend showing saved amount per week
    Create pie or bar chart for spending by category distribution
    Build expandable "Why this score?" panel that breaks down the 5 scoring components with visual breakdown
    Create deterministic tips engine that analyzes latest metrics and generates 3 actionable tips in teen-friendly Portuguese
    Add empty state for new users with prompts to enter first week
    Implement data fetching from Bolt Database with loading and error states

6. Educational Lessons Module

    Create lesson listing page showing all 10 lessons with completion indicators
    Build lesson detail view with formatted text content, images/icons, and quiz section
    Write all 10 lesson texts in European Portuguese paraphrasing Psychology of Money concepts for teens
    Create 2 multiple-choice questions per lesson with 4 options each and correct answer marking
    Build quiz answer submission and immediate feedback with explanation
    Implement lesson progress tracking in database with timestamps
    Add navigation between lessons with next/previous buttons
    Create progress indicator showing completed lessons count

7. Challenges & Gamification

    Design and write 8+ challenges with clear completion criteria: track spending 3 weeks in a row, save above goal, reduce wants share, try zero-spend day, complete 5 lessons, review last month, plan next week, achieve 80+ score
    Build challenges listing page with card layout showing title, description, status, and completion date
    Create challenge completion detection logic that runs when weekly data is saved
    Implement automatic challenge_completions record creation with timestamp
    Add challenge completion contribution to weekly score calculation
    Build badge/achievement display component for completed challenges
    Create celebratory modal or notification when challenge is completed

8. Financial Personality Quiz

    Build quiz page with 12-16 multiple-choice questions covering patience, planning, impulse control, and risk awareness
    Create quiz scoring algorithm that outputs 4 trait scores from 0-100 based on answer patterns
    Design quiz questions in European Portuguese with teen-relevant scenarios
    Implement quiz submission that stores attempt with trait scores in database
    Create results page showing trait breakdown with visual bars and explanations
    Build retake functionality that updates to latest quiz results
    Add link from quiz results to wealth predictor dashboard

9. Wealth Predictor Simulation Dashboard

    Build future dashboard that fetches latest quiz traits and last 4 weeks of metrics
    Create three slider inputs: income growth rate, interest rate, and spending inflation rate with labeled ranges
    Implement projection algorithm that simulates balance over 1, 5, and 10 year horizons using quiz-adjusted savings behavior
    Build bar chart showing projected balance at three time horizons
    Create behavior impact contributions bar chart showing relative impact of savings rate, wants control, consistency, and planning
    Design KPI tiles showing saver personality type, projected 5-year balance, and best improvement lever
    Build detailed explainability panel that lists all assumptions, input values used, and calculation formula explanation
    Add real-time recalculation when sliders change with instant chart updates
    Include educational disclaimer that this is a simplified simulation for learning purposes

10. User Settings & Data Controls

    Build settings page with sections for privacy, data export, and account deletion
    Create data export function that generates JSON file with all user data
    Implement account deletion with confirmation modal that hard deletes or anonymizes all user records
    Add privacy information panel explaining what data is collected and how it's used
    Build demo mode toggle that adds sample data for exploration
    Create weekly allowance and savings goal update form
    Add learning goals modification option

11. Teacher Dashboard & Admin Features

    Build teacher landing page with class creation form that generates unique class code
    Create role detection logic based on teacher flag in profiles table
    Build aggregated analytics view showing class-level metrics over time
    Create line chart for average weekly score across all students by week
    Build line chart for average savings rate trend for the class
    Create bar chart for average wants share across the class
    Build trait aggregates display showing average quiz scores for patience, planning, impulse control, and risk awareness
    Create challenge completion rate summary table
    Add week range selector to filter aggregated data
    Implement privacy-preserving aggregation that requires minimum 3 students before showing data
    Build class roster view showing only aliases and join dates without drilling into individual records

12. UI Components & Portuguese Localization

    Create reusable KPI card component with icon, label, value, and trend indicator
    Build chart wrapper components with consistent styling and responsive behavior
    Create form input components: text input, select dropdown, number input, toggle switch, date picker
    Design modal component for confirmations and alerts
    Build notification/toast system for success and error messages
    Write all UI strings in European Portuguese including labels, buttons, placeholders, validation messages, empty states, and tooltips
    Create consistent color scheme avoiding purple/indigo tones unless requested
    Implement responsive layouts that work on mobile, tablet, and desktop
    Add loading skeletons for async data fetching
    Build error boundary components for graceful error handling

13. Scoring & Tips Logic Implementation

    Implement weekly scoring function with 5 components: savings rate (0-35 points), needs vs wants balance (0-25 points), category concentration (0-15 points), impulse proxy based on transaction count (0-15 points), and challenge completion bonus (0-10 points)
    Create score breakdown object that shows points earned in each category
    Build deterministic tips engine with rule-based logic: check if savings rate below goal, check if wants share above 60%, check for single category dominance, check for high transaction count, check for low streak
    Write 15+ tip templates in conversational European Portuguese teen language
    Implement tip prioritization that selects 3 most relevant tips based on current metrics
    Add metric calculation functions for all derived values: savings rate, wants share, category distribution, streak count

14. Documentation & Deployment Preparation

    Write comprehensive README in European Portuguese covering project overview, target users, and educational goals
    Document Bolt Database setup instructions including project creation and environment variable configuration
    Include complete database migration SQL with table definitions, RLS policies, views, and seed data
    Document scoring model formula with detailed breakdown and point allocation explanation
    Explain wealth predictor simulation assumptions and calculation methodology
    Provide local development setup instructions with npm install and dev server commands
    Add environment variables template file
    Document privacy and safety features implemented
    Include teacher dashboard access instructions

Summary

This plan builds a complete educational financial literacy platform for Portuguese teens with privacy-first design. The implementation follows a logical sequence starting with database foundation, moving through authentication and core features, then adding educational content, gamification, and teacher tools. The wealth predictor provides explainable simulations tied to behavioral traits and actual spending patterns. All content will be in European Portuguese with teen-appropriate language, and the scoring system uses transparent, rule-based logic that students can understand and act upon.