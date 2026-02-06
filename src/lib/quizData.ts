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

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'name',
    question: 'Qual é o teu nome?',
    description: 'Opcional - podes deixar em branco se preferires!',
    category: 'personal',
    answers: [],
  },
  {
    id: 'age',
    question: 'Que ano estás?',
    category: 'personal',
    answers: [
      { text: '7º ano', value: 1 },
      { text: '8º ano', value: 2 },
      { text: '9º ano', value: 3 },
      { text: '10º ano', value: 4 },
      { text: '11º ano', value: 5 },
      { text: '12º ano', value: 6 },
      { text: 'Já acabei o secundário', value: 7 },
    ],
  },
  {
    id: 'weekly_money',
    question: 'Quanto dinheiro recebes por semana? (semanada, mesada, trabalho part-time)',
    category: 'personal',
    answers: [
      { text: 'Não recebo nada regular', value: 1 },
      { text: '€5-€15 por semana', value: 2 },
      { text: '€15-€30 por semana', value: 3 },
      { text: '€30-€50 por semana', value: 4 },
      { text: 'Mais de €50 por semana', value: 5 },
    ],
  },
  {
    id: 'current_savings',
    question: 'Quando recebes dinheiro (aniversário, Natal, semanada), o que fazes normalmente?',
    category: 'behavior',
    answers: [
      { text: 'Gasto tudo rapidamente', value: 1 },
      { text: 'Gasto a maior parte, guardo um bocadinho', value: 2 },
      { text: 'Gasto metade, guardo metade', value: 3 },
      { text: 'Guardo a maior parte, gasto só um bocadinho', value: 4 },
      { text: 'Guardo quase tudo para objetivos futuros', value: 5 },
    ],
  },
  {
    id: 'spending_discipline',
    question: 'Quando vês algo que queres comprar (roupa, jogos, snacks), o que fazes?',
    description: 'Sê honesto - não há respostas certas ou erradas!',
    category: 'behavior',
    answers: [
      { text: 'Compro imediatamente sem pensar muito', value: 1 },
      { text: 'Normalmente compro, mas depois arrependo-me às vezes', value: 2 },
      { text: 'Penso um bocadinho e depois decido', value: 3 },
      { text: 'Espero alguns dias para ter a certeza que quero', value: 4 },
      { text: 'Faço uma lista de prós e contras antes de comprar', value: 5 },
    ],
  },
  {
    id: 'peer_pressure',
    question: 'Os teus amigos querem ir todos ao cinema/comer fora, mas tu estavas a poupar. O que fazes?',
    category: 'psychology',
    answers: [
      { text: 'Vou sempre, não quero ficar de fora', value: 1 },
      { text: 'Vou na maior parte das vezes', value: 2 },
      { text: 'Às vezes vou, às vezes não', value: 3 },
      { text: 'Sugiro alternativas mais baratas', value: 4 },
      { text: 'Explico que estou a poupar e não vou', value: 5 },
    ],
  },
  {
    id: 'future_thinking',
    question: 'Imagina que tens €100. O que preferes?',
    description: 'Teste de pensamento a longo prazo',
    category: 'psychology',
    answers: [
      { text: '€100 agora para gastar como quiser', value: 1 },
      { text: '€120 daqui a 1 mês', value: 2 },
      { text: '€150 daqui a 6 meses', value: 3 },
      { text: '€200 daqui a 1 ano', value: 4 },
      { text: '€500 daqui a 3 anos', value: 5 },
    ],
  },
  {
    id: 'big_purchase',
    question: 'Estavas a poupar para umas sapatilhas fixes que custam €80. Só tens €60. O que fazes?',
    description: 'Teste de controlo de impulsos',
    category: 'behavior',
    answers: [
      { text: 'Peço dinheiro emprestado aos pais/amigos', value: 1 },
      { text: 'Compro outras sapatilhas mais baratas agora', value: 2 },
      { text: 'Espero mais um mês até ter o dinheiro todo', value: 3 },
      { text: 'Espero por saldos/promoções', value: 4 },
      { text: 'Reavalio se realmente preciso delas', value: 5 },
    ],
  },
  {
    id: 'birthday_money',
    question: 'Recebeste €50 no teu aniversário. Qual é o teu primeiro pensamento?',
    category: 'psychology',
    answers: [
      { text: 'Que fixe! Vou gastá-lo este fim de semana!', value: 1 },
      { text: 'Vou comprar aquela coisa que eu queria', value: 2 },
      { text: 'Vou guardar um bocado e gastar um bocado', value: 3 },
      { text: 'Vou poupar para algo maior que quero', value: 4 },
      { text: 'Vou investir/poupar para o futuro', value: 5 },
    ],
  },
  {
    id: 'financial_knowledge',
    question: 'O que sabes sobre "juros compostos"?',
    description: 'Teste de conhecimento financeiro básico',
    category: 'psychology',
    answers: [
      { text: 'Nunca ouvi falar', value: 1 },
      { text: 'Já ouvi mas não sei o que é', value: 2 },
      { text: 'Sei mais ou menos - tem a ver com dinheiro crescer', value: 3 },
      { text: 'Sei bem - é quando ganhas juros sobre juros', value: 4 },
      { text: 'Domino o conceito e sei como funciona', value: 5 },
    ],
  },
  {
    id: 'social_media',
    question: 'Vês influencers nas redes sociais com coisas fixes. Como te sentes?',
    description: 'Influência das redes sociais nos gastos',
    category: 'psychology',
    answers: [
      { text: 'Quero comprar as mesmas coisas imediatamente', value: 1 },
      { text: 'Fico com vontade de ter essas coisas', value: 2 },
      { text: 'Acho giro mas não afeta os meus gastos', value: 3 },
      { text: 'Não me influencia, tenho as minhas prioridades', value: 4 },
      { text: 'Reconheço que é marketing e ignoro', value: 5 },
    ],
  },
  {
    id: 'part_time_job',
    question: 'Se tivesses um part-time e ganhasses €200/mês, o que farias?',
    category: 'financial',
    answers: [
      { text: 'Gastava tudo em coisas que quero', value: 1 },
      { text: 'Gastava a maior parte, guardava €20-50', value: 2 },
      { text: 'Dividia: metade para gastar, metade para poupar', value: 3 },
      { text: 'Guardava €100-150, gastava o resto', value: 4 },
      { text: 'Guardava quase tudo (€150+) para objetivos grandes', value: 5 },
    ],
  },
  {
    id: 'lunch_money',
    question: 'Tens €5 para o almoço na escola. Como gastas?',
    category: 'behavior',
    answers: [
      { text: 'Gasto tudo em comida/snacks que gosto', value: 1 },
      { text: 'Gasto €4-5, às vezes sobra algo', value: 2 },
      { text: 'Gasto €3-4, guardo €1-2', value: 3 },
      { text: 'Trago comida de casa e guardo os €5', value: 4 },
      { text: 'Trago comida e invisto o dinheiro poupado', value: 5 },
    ],
  },
  {
    id: 'financial_goals',
    question: 'Tens um objetivo financeiro para os próximos anos?',
    category: 'financial',
    answers: [
      { text: 'Não penso nisso, vivo o presente', value: 1 },
      { text: 'Gostava de ter dinheiro mas não tenho plano', value: 2 },
      { text: 'Quero poupar mas ainda não comecei', value: 3 },
      { text: 'Estou a poupar para algo específico', value: 4 },
      { text: 'Tenho objetivos claros e plano para alcançá-los', value: 5 },
    ],
  },
  {
    id: 'money_talks',
    question: 'Com que frequência falas sobre dinheiro com a tua família/amigos?',
    description: 'Comunicação sobre finanças',
    category: 'behavior',
    answers: [
      { text: 'Nunca, é tabu', value: 1 },
      { text: 'Raramente', value: 2 },
      { text: 'Às vezes, quando necessário', value: 3 },
      { text: 'Frequentemente, pergunto conselhos', value: 4 },
      { text: 'Muito, aprendo sobre dinheiro ativamente', value: 5 },
    ],
  },
];

export interface PointsGroup {
  name: string;
  emoji: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  title: string;
  message: string;
  subMessage: string;
  tips: string[];
}

export const pointsGroups: PointsGroup[] = [
  {
    name: 'Aprendiz Financeiro',
    emoji: '🌱',
    minPoints: 0,
    maxPoints: 30,
    color: '#ef4444',
    title: 'Há muito para aprender!',
    message: 'Estás no início da tua jornada financeira. O dinheiro ainda não é uma prioridade no teu dia a dia.',
    subMessage: 'A boa notícia? Tens TODO o tempo do mundo para mudar! Começa pequeno e verás como faz diferença.',
    tips: [
      'Tenta poupar €2-5 por semana - é um ótimo início!',
      'Quando vires algo que queres, espera 3 dias antes de comprar',
      'Pede a alguém para te ensinar sobre dinheiro',
    ],
  },
  {
    name: 'Poupador Iniciante',
    emoji: '📚',
    minPoints: 31,
    maxPoints: 50,
    color: '#f97316',
    title: 'Bom começo!',
    message: 'Tens alguns hábitos bons, mas ainda há muito por melhorar. Consegues ver o valor de poupar.',
    subMessage: 'Estás na direção certa! Foca em ser mais consistente com os teus objetivos.',
    tips: [
      'Aumenta a tua poupança para €10+ por semana',
      'Define um objetivo claro (ex: "quero €200 até Junho")',
      'Evita gastos por impulso - faz uma lista antes de comprar',
    ],
  },
  {
    name: 'Poupador Solid',
    emoji: '🎯',
    minPoints: 51,
    maxPoints: 65,
    color: '#ff8c00',
    title: 'Tens bons hábitos!',
    message: 'Equilibras bem entre poupar e gastar. Tens disciplina e pensas no futuro.',
    subMessage: 'Estás acima da média! Continua com esta atitude e vais longe.',
    tips: [
      'Experimenta o método 50/30/20: 50% necessidades, 30% vontades, 20% poupança',
      'Começa a pensar em objetivos de médio prazo (1-2 anos)',
      'Ensina os teus amigos o que aprendeste sobre finanças',
    ],
  },
  {
    name: 'Poupador Star',
    emoji: '⭐',
    minPoints: 66,
    maxPoints: 80,
    color: '#10b981',
    title: 'Excelente!',
    message: 'Tens hábitos financeiros excecionais para a tua idade. Resistis bem à pressão e pensas no longo prazo.',
    subMessage: 'Estás muito acima da média! Com esta atitude, vais construir riqueza ao longo da vida.',
    tips: [
      'Aprende sobre investimentos simples (ETFs, fundos de investimento)',
      'Define objetivos de longo prazo (ex: €5000 aos 18 anos)',
      'Continua a resistir à pressão social e mantém o foco',
    ],
  },
  {
    name: 'Génio das Finanças',
    emoji: '🚀',
    minPoints: 81,
    maxPoints: 100,
    color: '#06b6d4',
    title: 'Sensacional!',
    message: 'Tens os melhores hábitos financeiros que podemos imaginar. Estás pronto para objetivos ambiciosos!',
    subMessage: 'Rare! Tens uma vantagem ENORME sobre a maioria das pessoas. O teu futuro é brilhante!',
    tips: [
      'Cria um plano de investimento personalizado com juros compostos',
      'Pensa em como ganhar mais dinheiro (negócio, skills, trabalho)',
      'Torna-te um mentor para outros jovens - compartilha o que sabes',
    ],
  },
];

export function calculateTotalPoints(responses: Record<string, number>): number {
  const questionIds = [
    'current_savings',
    'spending_discipline',
    'peer_pressure',
    'future_thinking',
    'financial_knowledge',
    'social_media',
    'part_time_job',
    'lunch_money',
    'financial_goals',
    'money_talks',
    'big_purchase',
    'birthday_money',
  ];

  let totalPoints = 0;
  questionIds.forEach((id) => {
    const value = responses[id] || 0;
    totalPoints += value;
  });

  return totalPoints;
}

export function getPointsGroup(totalPoints: number): PointsGroup {
  return pointsGroups.find(
    (group) => totalPoints >= group.minPoints && totalPoints <= group.maxPoints
  ) || pointsGroups[0];
}

export function calculateScenarios(
  responses: Record<string, number>
): {
  conservative: number;
  moderate: number;
  aggressive: number;
  profile: string;
  successScore: number;
} {
  const age = responses.age || 3;
  const studentAge = age === 1 ? 12 : age === 2 ? 13 : age === 3 ? 14 : age === 4 ? 15 : age === 5 ? 16 : age === 6 ? 17 : 18;
  const yearsUntilRetirement = 65 - studentAge;

  const behavioralFactors = {
    spendingDiscipline: responses.spending_discipline || 3,
    savingsRate: responses.current_savings || 2,
    peerPressure: (6 - (responses.peer_pressure || 3)),
    futureThinking: responses.future_thinking || 3,
    financialKnowledge: responses.financial_knowledge || 2,
    socialMediaResistance: responses.social_media || 3,
  };

  const behavioralScore = (
    behavioralFactors.spendingDiscipline * 0.25 +
    behavioralFactors.savingsRate * 0.25 +
    behavioralFactors.peerPressure * 0.15 +
    behavioralFactors.futureThinking * 0.15 +
    behavioralFactors.financialKnowledge * 0.10 +
    behavioralFactors.socialMediaResistance * 0.10
  );

  const successScore = Math.round((behavioralScore / 5) * 100);

  const weeklyMoney = responses.weekly_money || 2;
  const monthlyIncome =
    weeklyMoney === 1 ? 20 : weeklyMoney === 2 ? 40 : weeklyMoney === 3 ? 100 : weeklyMoney === 4 ? 160 : 250;

  const savingsRatePercent = behavioralScore / 5;
  const monthlySavings = monthlyIncome * savingsRatePercent;

  const startingCapital = 0;

  let profile = 'balanced';
  if (behavioralScore < 2.5) profile = 'conservative';
  else if (behavioralScore < 3) profile = 'moderate-conservative';
  else if (behavioralScore < 3.5) profile = 'balanced';
  else if (behavioralScore < 4) profile = 'growth';
  else profile = 'aggressive';

  const conservativeRate = 0.04;
  const moderateRate = 0.07;
  const aggressiveRate = 0.10;

  const futureValue = (monthlyPayment: number, rate: number, years: number) => {
    if (years === 0) return 0;
    const monthlyRate = rate / 12;
    const months = years * 12;
    const annuityValue = monthlyPayment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    return annuityValue;
  };

  const conservative = futureValue(monthlySavings * 0.8, conservativeRate, yearsUntilRetirement);
  const moderate = futureValue(monthlySavings, moderateRate, yearsUntilRetirement);
  const aggressive = futureValue(monthlySavings * 1.2, aggressiveRate, yearsUntilRetirement);

  return {
    conservative: Math.round(conservative),
    moderate: Math.round(moderate),
    aggressive: Math.round(aggressive),
    profile,
    successScore,
  };
}
