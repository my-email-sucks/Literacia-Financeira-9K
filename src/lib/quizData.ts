export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  category?: string;
  answers: {
    text: string;
    value: number;
  }[];
}

export interface PersonalInfo {
  name: string;
  age: number;
  education: string;
  occupation: string;
  socialClass: string;
  yearsWorking: number;
  familyBackground: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'name',
    question: 'Qual é o seu nome completo?',
    category: 'personal',
    answers: [],
  },
  {
    id: 'age',
    question: 'Qual é a sua idade?',
    category: 'personal',
    answers: [
      { text: '18-25 anos', value: 1 },
      { text: '26-35 anos', value: 2 },
      { text: '36-45 anos', value: 3 },
      { text: '46-55 anos', value: 4 },
      { text: '56+ anos', value: 5 },
    ],
  },
  {
    id: 'education',
    question: 'Qual é o seu nível de educação?',
    category: 'personal',
    answers: [
      { text: 'Ensino Básico', value: 1 },
      { text: 'Ensino Secundário', value: 2 },
      { text: 'Licenciatura', value: 3 },
      { text: 'Mestrado', value: 4 },
      { text: 'Doutorado/Pós-graduação', value: 5 },
    ],
  },
  {
    id: 'occupation',
    question: 'Qual é a sua profissão/setor de atividade?',
    category: 'personal',
    answers: [
      { text: 'Sector público/Funcionário', value: 2 },
      { text: 'Sector privado - Técnico', value: 2 },
      { text: 'Sector privado - Gestão', value: 3 },
      { text: 'Profissional autónomo/Negócios próprios', value: 4 },
      { text: 'Diretor executivo/Empreendedor', value: 5 },
    ],
  },
  {
    id: 'years_working',
    question: 'Há quantos anos trabalha?',
    category: 'personal',
    answers: [
      { text: 'Menos de 2 anos', value: 1 },
      { text: '2-5 anos', value: 2 },
      { text: '5-10 anos', value: 3 },
      { text: '10-20 anos', value: 4 },
      { text: 'Mais de 20 anos', value: 5 },
    ],
  },
  {
    id: 'family_background',
    question: 'Como caracteriza a situação financeira da sua família durante a sua infância?',
    category: 'personal',
    answers: [
      { text: 'Muito difícil/Dificuldades económicas', value: 1 },
      { text: 'Difícil/Rendimento baixo', value: 2 },
      { text: 'Confortável/Classe média', value: 3 },
      { text: 'Boa/Classe média alta', value: 4 },
      { text: 'Muito boa/Abastada', value: 5 },
    ],
  },
  {
    id: 'current_savings',
    question: 'Qual é a sua taxa de poupança atual (% do rendimento)?',
    category: 'behavior',
    answers: [
      { text: 'Poupo menos de 10%', value: 1 },
      { text: 'Poupo 10-20%', value: 2 },
      { text: 'Poupo 20-30%', value: 3 },
      { text: 'Poupo 30-40%', value: 4 },
      { text: 'Poupo mais de 40%', value: 5 },
    ],
  },
  {
    id: 'spending_discipline',
    question: 'Como descreve o seu comportamento de gastos?',
    description: 'Baseado na psicologia do comportamento financeiro',
    category: 'behavior',
    answers: [
      { text: 'Gasto por impulso, tenho dificuldade em controlar', value: 1 },
      { text: 'Gasto mais do que deveria regularmente', value: 2 },
      { text: 'Equilibro bem as despesas com o rendimento', value: 3 },
      { text: 'Controlo bem os meus gastos', value: 4 },
      { text: 'Sou muito disciplinado, planejo cada euro', value: 5 },
    ],
  },
  {
    id: 'market_experience',
    question: 'Qual é a sua experiência com investimentos?',
    category: 'investment',
    answers: [
      { text: 'Nenhuma experiência', value: 1 },
      { text: 'Iniciante - Alguns conhecimentos básicos', value: 2 },
      { text: 'Intermédio - Invisto regularmente', value: 3 },
      { text: 'Avançado - Opero ativamente', value: 4 },
      { text: 'Especialista - Investidor profissional', value: 5 },
    ],
  },
  {
    id: 'risk_tolerance',
    question: 'Como descreveria a sua tolerância ao risco?',
    description: 'Psicologia: Como reage face à volatilidade?',
    category: 'investment',
    answers: [
      { text: 'Muito conservador - Prefiro segurança', value: 1 },
      { text: 'Conservador - Crescimento modesto com risco baixo', value: 2 },
      { text: 'Moderado - Equilíbrio entre crescimento e segurança', value: 3 },
      { text: 'Agressivo - Aceito volatilidade para crescimento', value: 4 },
      { text: 'Muito agressivo - Maximizar crescimento', value: 5 },
    ],
  },
  {
    id: 'panic_reaction',
    question: 'Se os seus investimentos caíssem 30% repentinamente, o que faria?',
    description: 'Teste psicológico: Controlo emocional',
    category: 'psychology',
    answers: [
      { text: 'Vendo imediatamente por medo de perder mais', value: 1 },
      { text: 'Fico muito preocupado e considero vender', value: 2 },
      { text: 'Mantenho-me neutro e observo', value: 3 },
      { text: 'Considero uma oportunidade de compra', value: 4 },
      { text: 'Compro mais - Grandes oportunidades em baixas', value: 5 },
    ],
  },
  {
    id: 'long_term_patience',
    question: 'Como descreve a sua capacidade de manter investimentos a longo prazo?',
    description: 'Baseado em "The Psychology of Money" - paciência financeira',
    category: 'psychology',
    answers: [
      { text: 'Tenho dificuldade em esperar, quero resultados rápidos', value: 1 },
      { text: 'Fico impaciente com pouco progresso', value: 2 },
      { text: 'Consigo esperar alguns anos', value: 3 },
      { text: 'Sou paciente e piso firme a longo prazo', value: 4 },
      { text: 'Excelente capacidade de aguardar décadas', value: 5 },
    ],
  },
  {
    id: 'financial_knowledge',
    question: 'Qual é o seu nível de conhecimento financeiro?',
    description: 'Como avalia a sua literacia financeira?',
    category: 'psychology',
    answers: [
      { text: 'Muito baixo - Tenho muitas dúvidas básicas', value: 1 },
      { text: 'Baixo - Conheço pouco', value: 2 },
      { text: 'Moderado - Compreendo conceitos principais', value: 3 },
      { text: 'Bom - Tenho conhecimento sólido', value: 4 },
      { text: 'Excelente - Domino conceitos avançados', value: 5 },
    ],
  },
  {
    id: 'peer_influence',
    question: 'O seu círculo social influencia as suas decisões financeiras?',
    description: 'Psicologia social: Influência do grupo',
    category: 'psychology',
    answers: [
      { text: 'Muito - Sigo o que os outros fazem', value: 1 },
      { text: 'Bastante - Tenho influência', value: 2 },
      { text: 'Moderadamente - Ouço mas decido independentemente', value: 3 },
      { text: 'Pouco - Faço as minhas escolhas', value: 4 },
      { text: 'Nenhuma - Sou completamente independente', value: 5 },
    ],
  },
  {
    id: 'initial_investment',
    question: 'Quanto planeia investir inicialmente?',
    category: 'investment',
    answers: [
      { text: '€1.000 - €5.000', value: 1 },
      { text: '€5.000 - €25.000', value: 2 },
      { text: '€25.000 - €100.000', value: 3 },
      { text: '€100.000 - €500.000', value: 4 },
      { text: '€500.000+', value: 5 },
    ],
  },
  {
    id: 'time_horizon',
    question: 'Qual é o seu horizonte temporal de investimento?',
    category: 'investment',
    answers: [
      { text: 'Menos de 1 ano', value: 1 },
      { text: '1-3 anos', value: 2 },
      { text: '3-7 anos', value: 3 },
      { text: '7-15 anos', value: 4 },
      { text: '15+ anos', value: 5 },
    ],
  },
  {
    id: 'monthly_contribution',
    question: 'Quanto consegue investir mensalmente?',
    category: 'investment',
    answers: [
      { text: '€0 - €500', value: 1 },
      { text: '€500 - €1.500', value: 2 },
      { text: '€1.500 - €5.000', value: 3 },
      { text: '€5.000 - €15.000', value: 4 },
      { text: '€15.000+', value: 5 },
    ],
  },
  {
    id: 'financial_goals',
    question: 'Qual é o seu objetivo financeiro principal?',
    category: 'investment',
    answers: [
      { text: 'Preservação de capital', value: 1 },
      { text: 'Rendimento estável', value: 2 },
      { text: 'Crescimento moderado', value: 3 },
      { text: 'Crescimento agressivo', value: 4 },
      { text: 'Maximizar riqueza', value: 5 },
    ],
  },
  {
    id: 'debt_status',
    question: 'Qual é a sua situação de endividamento?',
    description: 'Importante preditor de sucesso financeiro',
    category: 'financial',
    answers: [
      { text: 'Muito endividado (>50% dos ativos)', value: 1 },
      { text: 'Moderadamente (25-50% dos ativos)', value: 2 },
      { text: 'Algum endividamento (10-25%)', value: 3 },
      { text: 'Pouco endividado (<10%)', value: 4 },
      { text: 'Sem dívidas', value: 5 },
    ],
  },
  {
    id: 'emergency_fund',
    question: 'Tem um fundo de emergência?',
    description: 'Hábito financeiro crucial de segurança',
    category: 'financial',
    answers: [
      { text: 'Não tenho nenhum', value: 1 },
      { text: 'Tenho menos de 1 mês de despesas', value: 2 },
      { text: 'Tenho 1-3 meses de despesas', value: 3 },
      { text: 'Tenho 3-6 meses de despesas', value: 4 },
      { text: 'Tenho mais de 6 meses guardados', value: 5 },
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
  successScore: number;
} {
  // Extract key behavioral factors
  const behavioralFactors = {
    spendingDiscipline: responses.spending_discipline || 3,
    savingsRate: responses.current_savings || 2,
    emotionalControl: responses.panic_reaction || 3,
    patience: responses.long_term_patience || 3,
    financialKnowledge: responses.financial_knowledge || 2,
    peerInfluence: (6 - (responses.peer_influence || 3)), // Inverted: lower is better
  };

  // Personal background factors (predictors of wealth)
  const backgroundFactors = {
    education: responses.education || 2,
    familyBackground: responses.family_background || 2,
    yearsWorking: responses.years_working || 2,
    age: responses.age || 2,
  };

  // Financial health factors
  const financialHealth = {
    debtStatus: responses.debt_status || 3,
    emergencyFund: responses.emergency_fund || 2,
  };

  // Calculate behavioral score (highest predictor of wealth)
  const behavioralScore = (
    behavioralFactors.spendingDiscipline * 0.25 +
    behavioralFactors.savingsRate * 0.25 +
    behavioralFactors.emotionalControl * 0.20 +
    behavioralFactors.patience * 0.15 +
    behavioralFactors.financialKnowledge * 0.10 +
    behavioralFactors.peerInfluence * 0.05
  ) / 5;

  // Calculate background score
  const backgroundScore = (
    backgroundFactors.education * 0.30 +
    backgroundFactors.familyBackground * 0.25 +
    backgroundFactors.yearsWorking * 0.25 +
    backgroundFactors.age * 0.20
  ) / 5;

  // Calculate financial health score
  const healthScore = (
    financialHealth.debtStatus * 0.6 +
    financialHealth.emergencyFund * 0.4
  ) / 5;

  // Combined success score (predictor of investment success)
  const successScore = (
    behavioralScore * 0.50 +
    backgroundScore * 0.25 +
    healthScore * 0.25
  );

  // Risk tolerance from responses
  const riskTolerance = responses.risk_tolerance || 3;
  const investmentExperience = responses.market_experience || 2;

  // Adjust rate multipliers based on behavioral score and risk tolerance
  const rateAdjustment = (successScore - 3) * 0.015; // -0.03 to +0.03 adjustment

  const conservativeRate = Math.max(0.02, 0.04 + rateAdjustment);
  const moderateRate = Math.max(0.04, 0.07 + rateAdjustment);
  const aggressiveRate = Math.max(0.06, 0.11 + rateAdjustment);

  // Investment parameters
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

  const futureValue = (principal: number, rate: number, years: number, monthlyPayment: number) => {
    if (years === 0) return principal + monthlyPayment * 12;
    const monthlyRate = rate / 12;
    const months = years * 12;
    const compoundedPrincipal = principal * Math.pow(1 + monthlyRate, months);
    const annuityValue = monthlyPayment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    return compoundedPrincipal + annuityValue;
  };

  const conservative = futureValue(initialInvestment, conservativeRate, years, monthlyContribution);
  const moderate = futureValue(initialInvestment, moderateRate, years, monthlyContribution);
  const aggressive = futureValue(initialInvestment, aggressiveRate, years, monthlyContribution);

  // Determine profile based on behavioral score and risk tolerance
  let profile = 'balanced';
  if (behavioralScore < 2.5 || riskTolerance <= 1) profile = 'conservative';
  else if (behavioralScore < 3 || riskTolerance === 2) profile = 'moderate-conservative';
  else if (behavioralScore < 3.5 || riskTolerance === 3) profile = 'balanced';
  else if (behavioralScore < 4 || riskTolerance === 4) profile = 'growth';
  else profile = 'aggressive';

  return {
    conservative: Math.round(conservative),
    moderate: Math.round(moderate),
    aggressive: Math.round(aggressive),
    profile,
    successScore: Math.round((successScore / 5) * 100),
  };
}
