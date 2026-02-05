export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  answers: {
    text: string;
    value: number;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'age',
    question: 'What is your age?',
    answers: [
      { text: '18-25', value: 1 },
      { text: '26-35', value: 2 },
      { text: '36-45', value: 3 },
      { text: '46-55', value: 4 },
      { text: '56+', value: 5 },
    ],
  },
  {
    id: 'initial_investment',
    question: 'How much are you planning to invest initially?',
    answers: [
      { text: '$1,000 - $5,000', value: 1 },
      { text: '$5,000 - $25,000', value: 2 },
      { text: '$25,000 - $100,000', value: 3 },
      { text: '$100,000 - $500,000', value: 4 },
      { text: '$500,000+', value: 5 },
    ],
  },
  {
    id: 'time_horizon',
    question: 'What is your investment time horizon?',
    answers: [
      { text: 'Less than 1 year', value: 1 },
      { text: '1-3 years', value: 2 },
      { text: '3-7 years', value: 3 },
      { text: '7-15 years', value: 4 },
      { text: '15+ years', value: 5 },
    ],
  },
  {
    id: 'risk_tolerance',
    question: 'How would you describe your risk tolerance?',
    answers: [
      { text: 'Very Conservative - Prefer safety over growth', value: 1 },
      { text: 'Conservative - Modest growth with low risk', value: 2 },
      { text: 'Moderate - Balanced growth and risk', value: 3 },
      { text: 'Aggressive - Willing to accept volatility', value: 4 },
      { text: 'Very Aggressive - Maximize growth potential', value: 5 },
    ],
  },
  {
    id: 'market_experience',
    question: 'What is your investment experience?',
    answers: [
      { text: 'No experience', value: 1 },
      { text: 'Beginner - Some familiarity', value: 2 },
      { text: 'Intermediate - Regular investor', value: 3 },
      { text: 'Advanced - Active trader', value: 4 },
      { text: 'Expert - Professional investor', value: 5 },
    ],
  },
  {
    id: 'monthly_contribution',
    question: 'How much can you invest monthly?',
    answers: [
      { text: '$0 - $500', value: 1 },
      { text: '$500 - $1,500', value: 2 },
      { text: '$1,500 - $5,000', value: 3 },
      { text: '$5,000 - $15,000', value: 4 },
      { text: '$15,000+', value: 5 },
    ],
  },
  {
    id: 'financial_goals',
    question: 'What is your primary financial goal?',
    answers: [
      { text: 'Capital preservation', value: 1 },
      { text: 'Steady income', value: 2 },
      { text: 'Moderate growth', value: 3 },
      { text: 'Aggressive growth', value: 4 },
      { text: 'Wealth maximization', value: 5 },
    ],
  },
  {
    id: 'debt_status',
    question: 'What is your current debt situation?',
    answers: [
      { text: 'High debt (more than 50% of assets)', value: 1 },
      { text: 'Moderate debt (25-50% of assets)', value: 2 },
      { text: 'Some debt (10-25% of assets)', value: 3 },
      { text: 'Minimal debt (less than 10%)', value: 4 },
      { text: 'No debt', value: 5 },
    ],
  },
];

export function calculateScenarios(
  responses: Record<string, number>
): {
  conservative: number;
  moderate: number;
  aggressive: number;
  profile: string;
} {
  const avgScore =
    Object.values(responses).reduce((a, b) => a + b, 0) / Object.keys(responses).length;

  const initialInvestment =
    responses.initial_investment === 1
      ? 3000
      : responses.initial_investment === 2
        ? 15000
        : responses.initial_investment === 3
          ? 62500
          : responses.initial_investment === 4
            ? 300000
            : 500000;

  const monthlyContribution =
    responses.monthly_contribution === 1
      ? 250
      : responses.monthly_contribution === 2
        ? 1000
        : responses.monthly_contribution === 3
          ? 3250
          : responses.monthly_contribution === 4
            ? 10000
            : 15000;

  const years =
    responses.time_horizon === 1
      ? 0.5
      : responses.time_horizon === 2
        ? 2
        : responses.time_horizon === 3
          ? 5
          : responses.time_horizon === 4
            ? 10
            : 20;

  const conservativeRate = 0.04;
  const moderateRate = 0.07;
  const aggressiveRate = 0.11;

  const futureValue = (principal: number, rate: number, years: number, monthlyPayment: number) => {
    const monthlyRate = rate / 12;
    const months = years * 12;
    const compoundedPrincipal = principal * Math.pow(1 + monthlyRate, months);
    const annuityValue = monthlyPayment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    return compoundedPrincipal + annuityValue;
  };

  const conservative = futureValue(initialInvestment, conservativeRate, years, monthlyContribution);
  const moderate = futureValue(initialInvestment, moderateRate, years, monthlyContribution);
  const aggressive = futureValue(initialInvestment, aggressiveRate, years, monthlyContribution);

  let profile = 'balanced';
  if (avgScore <= 2) profile = 'conservative';
  else if (avgScore <= 2.5) profile = 'moderate-conservative';
  else if (avgScore <= 3.5) profile = 'balanced';
  else if (avgScore <= 4) profile = 'growth';
  else profile = 'aggressive';

  return {
    conservative: Math.round(conservative),
    moderate: Math.round(moderate),
    aggressive: Math.round(aggressive),
    profile,
  };
}
