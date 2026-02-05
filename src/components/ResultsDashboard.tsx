import { useEffect, useState } from 'react';
import { TrendingUp, Award, Target, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { getQuizResults } from '../lib/supabase';
import { calculateScenarios } from '../lib/quizData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ResultsDashboardProps {
  sessionId: string;
  onReset: () => void;
  responses?: Record<string, number | string>;
}

interface QuizResult {
  conservative_outcome: number;
  moderate_outcome: number;
  aggressive_outcome: number;
  recommended_profile: string;
}

export function ResultsDashboard({ sessionId, onReset, responses = {} }: ResultsDashboardProps) {
  const [results, setResults] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successScore, setSuccessScore] = useState(0);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [timeHorizon, setTimeHorizon] = useState(10);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const data = await getQuizResults(sessionId);
        setResults(data);

        if (Object.keys(responses).length > 0) {
          const numericResponses: Record<string, number> = {};
          Object.entries(responses).forEach(([key, value]) => {
            if (typeof value === 'number') {
              numericResponses[key] = value;
            }
          });
          const scenarios = calculateScenarios(numericResponses);
          setSuccessScore(scenarios.successScore);

          const investmentValue =
            numericResponses.initial_investment === 1
              ? 3000
              : numericResponses.initial_investment === 2
                ? 15000
                : numericResponses.initial_investment === 3
                  ? 62500
                  : numericResponses.initial_investment === 4
                    ? 300000
                    : 500000;
          setInitialInvestment(investmentValue);

          const years =
            numericResponses.time_horizon === 1
              ? 0.5
              : numericResponses.time_horizon === 2
                ? 2
                : numericResponses.time_horizon === 3
                  ? 5
                  : numericResponses.time_horizon === 4
                    ? 10
                    : 20;
          setTimeHorizon(Math.ceil(years));
        }
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [sessionId, responses]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <div className="text-secondary text-lg">Calculando o seu perfil financeiro...</div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-secondary">Não foi possível carregar os resultados</div>
      </div>
    );
  }

  const profileLabels: Record<string, string> = {
    conservative: 'Investidor Conservador',
    'moderate-conservative': 'Conservador Moderado',
    balanced: 'Investidor Equilibrado',
    growth: 'Orientado para Crescimento',
    aggressive: 'Investidor Agressivo',
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyShort = (value: number) => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`;
    }
    return formatCurrency(value);
  };

  const generateProjectionData = () => {
    const data = [];
    const years = Math.max(timeHorizon, 5);

    for (let year = 0; year <= years; year++) {
      const conservativeGrowth = initialInvestment * Math.pow(1.04, year);
      const moderateGrowth = initialInvestment * Math.pow(1.07, year);
      const aggressiveGrowth = initialInvestment * Math.pow(1.11, year);

      data.push({
        year: year === 0 ? 'Hoje' : `Ano ${year}`,
        yearNum: year,
        Conservadora: Math.round(conservativeGrowth),
        Moderada: Math.round(moderateGrowth),
        Agressiva: Math.round(aggressiveGrowth),
      });
    }

    return data;
  };

  const projectionData = generateProjectionData();

  const comparisonData = [
    {
      name: 'Conservadora',
      value: results.conservative_outcome,
      fill: '#10b981',
    },
    {
      name: 'Moderada',
      value: results.moderate_outcome,
      fill: '#ff8c00',
    },
    {
      name: 'Agressiva',
      value: results.aggressive_outcome,
      fill: '#ef4444',
    },
  ];

  const potentialGain = results.aggressive_outcome - results.conservative_outcome;
  const percentageGain = ((potentialGain / results.conservative_outcome) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-lg p-4 shadow-xl">
          <p className="text-primary font-semibold mb-2">{payload[0].payload.year}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-lg p-4 shadow-xl">
          <p className="text-primary font-semibold mb-1">{payload[0].payload.name}</p>
          <p className="text-accent text-lg font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-primary px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold text-primary mb-3">O Seu Perfil Financeiro</h1>
            <div className="flex items-center gap-3">
              <Target className="text-accent" size={24} />
              <p className="text-secondary text-xl">
                Perfil Recomendado: <span className="text-accent font-bold">{profileLabels[results.recommended_profile]}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="btn-secondary whitespace-nowrap"
          >
            Repetir Questionário
          </button>
        </div>

        {successScore > 0 && (
          <div className="card bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-2 border-accent/30 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-accent" size={28} />
                  <h3 className="text-2xl font-bold text-primary">Índice de Sucesso Financeiro</h3>
                </div>
                <p className="text-secondary">
                  Baseado em comportamentos e hábitos financeiros comprovados por estudos de psicologia financeira
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-4 border-accent/50 shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent">{successScore}%</div>
                    <div className="text-sm text-secondary font-medium">
                      {successScore >= 80 ? 'Excelente' : successScore >= 60 ? 'Bom' : 'Em Desenvolvimento'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="card hover:border-success/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary">Conservadora</h3>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center group-hover:bg-success/20 transition-all">
                <TrendingUp size={24} className="text-success" />
              </div>
            </div>
            <p className="text-4xl font-bold text-success mb-3">
              {formatCurrency(results.conservative_outcome)}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <p className="text-secondary text-sm">4% rentabilidade anual</p>
              </div>
              <p className="text-secondary text-sm">
                Preservação de capital com crescimento estável
              </p>
            </div>
          </div>

          <div className="card border-2 border-accent shadow-lg shadow-accent/10 hover:shadow-accent/20 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary">Moderada</h3>
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent/30 transition-all">
                  <BarChart3 size={24} className="text-accent" />
                </div>
              </div>
              <p className="text-4xl font-bold text-accent mb-3">
                {formatCurrency(results.moderate_outcome)}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <p className="text-secondary text-sm">7% rentabilidade anual</p>
                </div>
                <p className="text-secondary text-sm">
                  Equilíbrio ideal entre crescimento e segurança
                </p>
              </div>
            </div>
          </div>

          <div className="card hover:border-danger/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary">Agressiva</h3>
              <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center group-hover:bg-danger/20 transition-all">
                <LineChartIcon size={24} className="text-danger" />
              </div>
            </div>
            <p className="text-4xl font-bold text-danger mb-3">
              {formatCurrency(results.aggressive_outcome)}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-danger"></div>
                <p className="text-secondary text-sm">11% rentabilidade anual</p>
              </div>
              <p className="text-secondary text-sm">
                Crescimento máximo com volatilidade elevada
              </p>
            </div>
          </div>
        </div>

        <div className="card mb-12">
          <div className="flex items-center gap-3 mb-6">
            <LineChartIcon className="text-accent" size={28} />
            <h2 className="text-3xl font-bold text-primary">Projeção de Crescimento ao Longo do Tempo</h2>
          </div>
          <p className="text-secondary mb-8">
            Visualize como o seu investimento inicial de {formatCurrency(initialInvestment)} crescerá ao longo de {timeHorizon} anos com cada estratégia
          </p>

          <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 border border-[var(--color-border)]">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="colorConservadora" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorModerada" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff8c00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff8c00" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAgressiva" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a4452" opacity={0.3} />
                <XAxis
                  dataKey="year"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                  interval={Math.floor(timeHorizon / 5)}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => formatCurrencyShort(value)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="line"
                />
                <Area
                  type="monotone"
                  dataKey="Conservadora"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorConservadora)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="Moderada"
                  stroke="#ff8c00"
                  strokeWidth={3}
                  fill="url(#colorModerada)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="Agressiva"
                  stroke="#ef4444"
                  strokeWidth={3}
                  fill="url(#colorAgressiva)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <p className="text-success font-semibold mb-1">Retorno Conservador</p>
              <p className="text-2xl font-bold text-success">{formatCurrency(results.conservative_outcome)}</p>
            </div>
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
              <p className="text-accent font-semibold mb-1">Retorno Moderado</p>
              <p className="text-2xl font-bold text-accent">{formatCurrency(results.moderate_outcome)}</p>
            </div>
            <div className="bg-danger/5 border border-danger/20 rounded-lg p-4">
              <p className="text-danger font-semibold mb-1">Retorno Agressivo</p>
              <p className="text-2xl font-bold text-danger">{formatCurrency(results.aggressive_outcome)}</p>
            </div>
          </div>
        </div>

        <div className="card mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-accent" size={28} />
            <h2 className="text-3xl font-bold text-primary">Comparação Final de Riqueza</h2>
          </div>
          <p className="text-secondary mb-8">
            Valor acumulado ao final do período de investimento com cada estratégia
          </p>

          <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 border border-[var(--color-border)]">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a4452" opacity={0.3} />
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  style={{ fontSize: '14px', fontWeight: 'bold' }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => formatCurrencyShort(value)}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1500}>
                  {comparisonData.map((entry, index) => (
                    <Bar key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary mb-2">Potencial de Ganho</h3>
              <p className="text-4xl font-bold text-accent mb-2">{formatCurrency(potentialGain)}</p>
              <p className="text-secondary">
                Diferença entre estratégia agressiva e conservadora (+{percentageGain}%)
              </p>
            </div>
            <div className="bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary mb-2">Estratégia Recomendada</h3>
              <p className="text-3xl font-bold text-success mb-2">
                {results.recommended_profile === 'conservative' || results.recommended_profile === 'moderate-conservative'
                  ? formatCurrency(results.conservative_outcome)
                  : results.recommended_profile === 'aggressive'
                    ? formatCurrency(results.aggressive_outcome)
                    : formatCurrency(results.moderate_outcome)}
              </p>
              <p className="text-secondary">
                Valor projetado com o perfil {profileLabels[results.recommended_profile]}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="card hover:border-success/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-success" />
              </div>
              <h3 className="text-xl font-bold text-primary">Conservadora</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="text-primary font-semibold">Menor Volatilidade</p>
                  <p className="text-secondary text-sm">Rentabilidade estável e previsível</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="text-primary font-semibold">Preservação de Capital</p>
                  <p className="text-secondary text-sm">Proteção dos seus ativos</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-danger/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-danger font-bold text-sm">×</span>
                </div>
                <div>
                  <p className="text-primary font-semibold">Crescimento Limitado</p>
                  <p className="text-secondary text-sm">Rentabilidade mais baixa</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card border-2 border-accent shadow-lg hover:shadow-accent/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary">Moderada</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="text-primary font-semibold">Abordagem Equilibrada</p>
                  <p className="text-secondary text-sm">Crescimento com segurança</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="text-primary font-semibold">Otimizada ao Perfil</p>
                  <p className="text-secondary text-sm">Adaptada à tolerância ao risco</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="text-primary font-semibold">Diversificação</p>
                  <p className="text-secondary text-sm">Risco distribuído</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card hover:border-danger/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center">
                <LineChartIcon size={20} className="text-danger" />
              </div>
              <h3 className="text-xl font-bold text-primary">Agressiva</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="text-primary font-semibold">Máximo Crescimento</p>
                  <p className="text-secondary text-sm">Maior potencial de retorno</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-danger/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-danger font-bold text-sm">×</span>
                </div>
                <div>
                  <p className="text-primary font-semibold">Alta Volatilidade</p>
                  <p className="text-secondary text-sm">Flutuações significativas</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-danger/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-danger font-bold text-sm">×</span>
                </div>
                <div>
                  <p className="text-primary font-semibold">Maior Risco</p>
                  <p className="text-secondary text-sm">Requer tolerância elevada</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-accent/5 to-transparent border-l-4 border-l-accent">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="text-accent" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">Por que isto é importante</h3>
              <p className="text-secondary leading-relaxed text-lg">
                A sua estratégia de investimento deve estar alinhada com os seus objetivos financeiros, horizonte temporal e tolerância ao risco.
                A estratégia recomendada para o seu perfil equilibra o potencial de crescimento com um nível de risco com o qual se sente confortável.
              </p>
              <p className="text-secondary leading-relaxed text-lg mt-4">
                Lembre-se: investir é um compromisso a longo prazo. Manter disciplina com contribuições regulares e resistir à tentação de reagir emocionalmente
                às flutuações do mercado pode impactar significativamente a sua riqueza ao longo do tempo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
