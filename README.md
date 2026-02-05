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
Plan: Teen Financial Personality Quiz & Lifetime Wealth Predictor

1. Database Schema Design

    Create quiz_submissions table to store: id, full_name, email, age, class_level, timestamp, anonymous_flag
    Create quiz_responses table with: submission_id, question_id, answer_selected, answer_weight
    Create questions table with: id, question_text, category (impulse_control, planning, awareness, saving_habits), answer_options (JSON), weights
    Create predictions table with: submission_id, spending_score, saving_score, personality_type, financial_trajectory_data (JSON)
    Design predictions table to include calculated projections for each year across lifespan
    Ensure all tables follow RLS policies for anonymity and security

2. Quiz Content & Flow

    Create 4 demographic questions: full name (optional), school email (optional), age, class level (9k/10k/11k/12k)
    Design 15-20 behavioral questions covering: impulse buying, planning habits, peer pressure, saving patterns, financial awareness, spending triggers, needs vs wants
    Use weighted scoring system where each answer contributes points to spending_score and saving_score
    Organize questions into logical sections with smooth transitions
    Add progress indicator showing percentage completion
    Include confirmation screen before submission showing user's responses can be reviewed
    Implement 3-5 minute target completion time with estimated time display

3. Quiz Interface Design (MooMoo-Inspired)

    Use dark theme (dark gray/charcoal background) throughout site
    Apply orange and green accent colors: green for positive financial behaviors, orange for caution/areas to improve
    Create clean card-based layout for each question
    Display progress bar at top with orange accent
    Use modern typography with good hierarchy and spacing
    Implement smooth micro-interactions and transitions
    Add small icons next to question categories for visual interest
    Style submit button in orange with hover effects

4. Scoring & Prediction Algorithm

    Calculate spending_score (0-100): Sum weighted answers related to impulse spending, peer pressure, materialism
    Calculate saving_score (0-100): Sum weighted answers related to planning, goal-setting, delayed gratification
    Create financial trajectory model: base starting from age at quiz, project 70-80 years forward
    Generate yearly wealth projections using formula: previous_year_wealth + (annual_income × saving_ratio) - (annual_expenses × spending_ratio)
    Create three scenarios:
        Current trajectory: Based directly on user's quiz answers
        Normal/Median trajectory: Based on statistical teen spending/saving behavior
        Potential trajectory: If user adopts recommended financial behaviors
    Assign personality type: Big Spender, Balanced Saver, Super Saver, Impulse Buyer, Goal Setter, etc.
    Generate personalized psychology-of-money tips based on personality type and score combinations

5. Results Dashboard - Lifetime Projection

    Create main results page with dark MooMoo aesthetic
    Display user's personality type prominently with icon and description
    Build primary graph showing spending vs saving trajectory:
        X-axis: Years (from current age to 80 years old)
        Y-axis: Accumulated wealth
        Three lines: Current (orange), Normal (green), Potential (bright green)
        Include hover tooltips showing yearly values
        Add shaded areas under curves for visual clarity
    Add text summary of financial behavior analysis
    Display key spending and saving scores with progress indicators

6. Final Wealth Comparison Graph

    Create larger, prominent secondary visualization showing end-of-life wealth:
        Compare three scenarios side by side with bars or circular gauges
        Current Trajectory: Orange bar showing projected final wealth
        Normal Trajectory: Green bar showing typical peer outcome
        Potential Trajectory: Bright Green bar showing optimized financial behavior result
        Display exact numbers and percentage differences
        Show potential wealth gain if switching from Current to Potential trajectory
    Use MooMoo's multi-chart approach with various visualizations (bars, numbers, percentages)

7. Educational Psychology of Money Insights

    Generate 4-6 personalized tips based on user's personality type and scores
    Topics covered: impulse control, peer pressure resistance, goal setting, compound interest power, budgeting basics, long-term thinking
    Display tips as expandable cards with icons and color coding (green for strengths, orange for growth areas)
    Include specific actionable advice like: "Start with saving 10% of weekly allowance" or "Set a 24-hour rule before purchases over $20"
    Add surprising statistics comparing their behavior to peers
    Include motivational context about how small changes compound over decades
    Reference psychology principles: loss aversion, present bias, social proof, mental accounting

8. Visual Design & Branding

    Apply dark gray/charcoal background throughout (matching MooMoo)
    Use orange (#FF6B35 or similar) for primary CTAs, important metrics, caution indicators
    Use green (#2ECC71 or similar) for positive financial behavior, gains, recommended actions
    Use white or light gray text for clarity on dark backgrounds
    Implement modern rounded corners on cards and buttons (12-16px border-radius)
    Add subtle animations and transitions for graph rendering
    Create consistent spacing using 8px or 16px grid
    Use professional sans-serif typography (Inter, Roboto, or similar)
    Add subtle shadows for depth and card separation

9. Technical Implementation

    Build welcome screen component with quiz overview
    Create quiz question component with answer selection and validation
    Implement results calculation service to generate trajectories and scores
    Build Recharts visualizations for lifetime projection and final wealth comparison
    Create insights generation service based on personality type
    Implement API calls to Bolt Database for storing responses
    Add error handling and loading states with MooMoo-style spinners
    Ensure responsive design for mobile and desktop viewing
    Optimize graphs for performance with data aggregation

Summary

This plan creates a sophisticated yet quick financial literacy tool for teens that combines a 3-5 minute anonymous quiz with compelling lifetime financial projections. Using the modern MooMoo trading platform aesthetic, users will see how their current financial behaviors compound over 70+ years, visualized in two powerful graphs: a trajectory showing spending/saving patterns over their lifetime and a final wealth comparison showing current vs potential outcomes. Personalized psychology-of-money insights provide actionable guidance grounded in behavioral economics. The dark theme with orange and green accents creates a professional, trustworthy appearance while making financial data engaging and easy to understand.
Core Visual Characteristics I'm Committing To:

    Dark, Professional Aesthetic
        Deep charcoal/dark gray backgrounds (not pure black)
        Creates a premium, serious financial platform feel
        Reduces eye strain while maintaining sophistication
        Signals "this is serious money/data territory"

    Color Palette - Very Specific
        Orange as primary action/highlight color - conveys energy, importance, calls-to-action (buttons, warnings, key metrics)
        Green for positive metrics, gains, and recommended behaviors - represents growth and financial health
        Red for losses/areas of concern - standard financial warning color
        White/light gray text for readability on dark backgrounds
        These three colors CARRY MEANING - orange = action, green = good, red = caution

    Data Visualization Philosophy
        Multiple sophisticated charts and graphs working together
        Clean, information-dense layouts with clear hierarchy
        Charts with multiple data series (your three wealth trajectory lines)
        Hover states and interactive elements
        Professional, not cartoonish - serious analytics feel

    Layout & Information Architecture
        Cards and sections clearly separated on dark background
        Multiple visualizations visible simultaneously
        Clean spacing and breathing room
        Top-to-bottom reading flow with progressive information reveal
        Dashboard-style organization where data speaks for itself

    Typography & Polish
        Modern, clean sans-serif fonts
        Strong hierarchy with clear visual weight differences
        Small icons alongside text elements
        Professional micro-interactions (smooth animations, not flashy)
        Numbers and metrics displayed prominently with context
