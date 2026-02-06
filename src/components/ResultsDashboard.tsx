import { useEffect, useState } from 'react';
import { TrendingUp, Award, Target, BarChart3, LineChart as LineChartIcon, Sparkles, Zap } from 'lucide-react';
import { getQuizResults } from '../lib/supabase';
import { calculateScenarios, calculateTotalPoints, getPointsGroup, PointsGroup } from '../lib/quizData';
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
  const [studentAge, setStudentAge] = useState(16);
  const [totalPoints, setTotalPoints] = useState(0);
  const [pointsGroup, setPointsGroup] = useState<PointsGroup | null>(null);

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

          const age = numericResponses.age || 3;
          const calcAge = age === 1 ? 12 : age === 2 ? 13 : age === 3 ? 14 : age === 4 ? 15 : age === 5 ? 16 : age === 6 ? 17 : 18;
          setStudentAge(calcAge);

          const points = calculateTotalPoints(numericResponses);
          setTotalPoints(points);
          setPointsGroup(getPointsGroup(points));
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
          <div className="text-secondary text-lg">A calcular o teu futuro financeiro...</div>
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
    conservative: 'Poupador Cauteloso',
    'moderate-conservative': 'Equilibrado Cauteloso',
    balanced: 'Financeiramente Equilibrado',
    growth: 'Orientado para o Futuro',
    aggressive: 'Super Poupador',
  };

  const profileDescriptions: Record<string, string> = {
    conservative: 'Preferes segurança e poupanças estáveis. És cuidadoso com o dinheiro.',
    'moderate-conservative': 'Equilibras bem segurança e crescimento. Tens bons hábitos financeiros.',
    balanced: 'Tens uma abordagem equilibrada ao dinheiro. Sabes quando poupar e quando gastar.',
    growth: 'Pensas no futuro e tomas decisões inteligentes. Excelente potencial financeiro!',
    aggressive: 'És um génio das finanças! Tens hábitos excepcionais e grande visão de futuro.',
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
    const retirementAge = 65;
    const years = retirementAge - studentAge;
    const milestones = [0, 5, 10, 20, 30, 40, years];

    milestones.forEach((yearOffset) => {
      if (yearOffset > years) return;
      const currentAge = studentAge + yearOffset;

      const conservativeValue = (results.conservative_outcome / Math.pow(1.04, years)) * Math.pow(1.04, yearOffset);
      const moderateValue = (results.moderate_outcome / Math.pow(1.07, years)) * Math.pow(1.07, yearOffset);
      const aggressiveValue = (results.aggressive_outcome / Math.pow(1.10, years)) * Math.pow(1.10, yearOffset);

      data.push({
        year: yearOffset === 0 ? 'Hoje' : `${currentAge} anos`,
        yearNum: yearOffset,
        Cautelosa: Math.round(conservativeValue),
        Equilibrada: Math.round(moderateValue),
        Ambiciosa: Math.round(aggressiveValue),
      });
    });

    return data;
  };

  const projectionData = generateProjectionData();

  const comparisonData = [
    {
      name: 'Cautelosa',
      value: results.conservative_outcome,
      fill: '#10b981',
    },
    {
      name: 'Equilibrada',
      value: results.moderate_outcome,
      fill: '#ff8c00',
    },
    {
      name: 'Ambiciosa',
      value: results.aggressive_outcome,
      fill: '#ef4444',
    },
  ];

  const potentialGain = results.aggressive_outcome - results.conservative_outcome;
  const percentageGain = ((potentialGain / results.conservative_outcome) * 100).toFixed(0);

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

  const getSuccessEmoji = (score: number) => {
    if (score >= 80) return '🌟';
    if (score >= 60) return '🎯';
    if (score >= 40) return '📈';
    return '🌱';
  };

  const getSuccessMessage = (score: number) => {
    if (score >= 80) return 'Excelente! Tens hábitos incríveis!';
    if (score >= 60) return 'Muito bom! Estás no caminho certo!';
    if (score >= 40) return 'Bom começo! Há margem para melhorar!';
    return 'Vamos trabalhar nisso juntos!';
  };

  return (
    <div className="min-h-screen bg-primary px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold text-primary mb-3">O Teu Futuro Financeiro</h1>
            <div className="flex items-center gap-3 mb-2">
              <Target className="text-accent" size={24} />
              <p className="text-secondary text-xl">
                Perfil: <span className="text-accent font-bold">{profileLabels[results.recommended_profile]}</span>
              </p>
            </div>
            <p className="text-secondary text-lg ml-9">{profileDescriptions[results.recommended_profile]}</p>
          </div>
          <button onClick={onReset} className="btn-secondary whitespace-nowrap">
            Fazer Novamente
          </button>
        </div>

        {pointsGroup && (
          <div
            className="card mb-12 relative overflow-hidden border-2"
            style={{
              backgroundColor: pointsGroup.color + '15',
              borderColor: pointsGroup.color + '50',
            }}
          >
            <div className="absolute top-0 right-0 w-80 h-80 opacity-5 rounded-full blur-3xl -mr-40 -mt-40" style={{ backgroundColor: pointsGroup.color }}></div>
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap size={32} style={{ color: pointsGroup.color }} />
                    <div>
                      <h3 className="text-3xl font-bold text-primary">{pointsGroup.title}</h3>
                      <p className="text-lg font-semibold" style={{ color: pointsGroup.color }}>
                        {pointsGroup.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-secondary text-lg leading-relaxed mb-3">{pointsGroup.message}</p>
                  <p className="text-secondary mb-4">{pointsGroup.subMessage}</p>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-primary font-bold mb-3">Dicas para ti:</p>
                    <ul className="space-y-2">
                      {pointsGroup.tips.map((tip, idx) => (
                        <li key={idx} className="text-secondary flex gap-2">
                          <span className="font-bold min-w-fit">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 md:min-w-max">
                  <div
                    className="w-40 h-40 rounded-full flex flex-col items-center justify-center border-4 shadow-2xl relative"
                    style={{
                      backgroundColor: pointsGroup.color + '20',
                      borderColor: pointsGroup.color,
                      boxShadow: `0 0 30px ${pointsGroup.color}40`,
                    }}
                  >
                    <div className="text-6xl mb-2">{pointsGroup.emoji}</div>
                    <div className="text-center">
                      <div className="text-3xl font-bold" style={{ color: pointsGroup.color }}>
                        {totalPoints}
                      </div>
                      <div className="text-sm text-secondary font-medium">pontos</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(totalPoints / 60) * 100}%`,
                        backgroundColor: pointsGroup.color,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-secondary">Máximo: 60 pontos</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {successScore > 0 && (
          <div className="card bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-2 border-accent/30 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="text-accent" size={28} />
                  <h3 className="text-2xl font-bold text-primary">A Tua Pontuação de Hábitos Financeiros</h3>
                </div>
                <p className="text-secondary text-lg">
                  Esta pontuação mostra como os teus hábitos de hoje vão impactar o teu futuro. Baseada em estudos de psicologia financeira!
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-4 border-accent/50 shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent">{successScore}%</div>
                    <div className="text-sm text-secondary font-medium">{getSuccessEmoji(successScore)}</div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-xl font-bold text-accent mb-1">{getSuccessMessage(successScore)}</p>
                  <p className="text-secondary text-sm">
                    {successScore >= 70
                      ? 'Continua assim e vais longe!'
                      : 'Pequenas mudanças = grandes resultados!'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-3">Como Os Teus Hábitos Te Podem Levar a...</h2>
            <p className="text-secondary text-lg">Projeções aos 65 anos, começando com os teus hábitos atuais</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card hover:border-success/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary">Abordagem Cautelosa</h3>
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center group-hover:bg-success/20 transition-all">
                  <TrendingUp size={24} className="text-success" />
                </div>
              </div>
              <p className="text-4xl font-bold text-success mb-3">{formatCurrency(results.conservative_outcome)}</p>
              <p className="text-secondary text-sm">Poupança segura e constante. Crescimento estável e previsível.</p>
            </div>

            <div className="card border-2 border-accent shadow-lg shadow-accent/10 hover:shadow-accent/20 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-primary">Abordagem Equilibrada</h3>
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent/30 transition-all">
                    <BarChart3 size={24} className="text-accent" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-accent mb-3">{formatCurrency(results.moderate_outcome)}</p>
                <div className="bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 inline-block mb-2">
                  <span className="text-accent font-bold text-sm">RECOMENDADO PARA TI</span>
                </div>
                <p className="text-secondary text-sm">Equilíbrio perfeito entre poupar e aproveitar a vida.</p>
              </div>
            </div>

            <div className="card hover:border-danger/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary">Abordagem Ambiciosa</h3>
                <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center group-hover:bg-danger/20 transition-all">
                  <LineChartIcon size={24} className="text-danger" />
                </div>
              </div>
              <p className="text-4xl font-bold text-danger mb-3">{formatCurrency(results.aggressive_outcome)}</p>
              <p className="text-secondary text-sm">Poupança máxima e investimentos inteligentes. Requer disciplina!</p>
            </div>
          </div>
        </div>

        <div className="card mb-12">
          <div className="flex items-center gap-3 mb-6">
            <LineChartIcon className="text-accent" size={28} />
            <h2 className="text-3xl font-bold text-primary">A Tua Jornada Financeira</h2>
          </div>
          <p className="text-secondary mb-8 text-lg">
            Vê como pequenas decisões hoje se transformam em grande riqueza ao longo da vida. Isto é o poder dos juros compostos!
          </p>

          <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 border border-[var(--color-border)]">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="colorCautelosa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEquilibrada" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff8c00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff8c00" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAmbiciosa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a4452" opacity={0.3} />
                <XAxis dataKey="year" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} tickFormatter={(value) => formatCurrencyShort(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" />
                <Area
                  type="monotone"
                  dataKey="Cautelosa"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorCautelosa)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="Equilibrada"
                  stroke="#ff8c00"
                  strokeWidth={3}
                  fill="url(#colorEquilibrada)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="Ambiciosa"
                  stroke="#ef4444"
                  strokeWidth={3}
                  fill="url(#colorAmbiciosa)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-accent" size={28} />
            <h2 className="text-3xl font-bold text-primary">Comparação Final: Aos 65 Anos</h2>
          </div>
          <p className="text-secondary mb-8 text-lg">
            A diferença entre os três caminhos pode ser ENORME. Tudo depende dos hábitos que crias AGORA!
          </p>

          <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 border border-[var(--color-border)]">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a4452" opacity={0.3} />
                <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '14px', fontWeight: 'bold' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} tickFormatter={(value) => formatCurrencyShort(value)} />
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
              <h3 className="text-xl font-bold text-primary mb-2">A Diferença</h3>
              <p className="text-4xl font-bold text-accent mb-2">{formatCurrency(potentialGain)}</p>
              <p className="text-secondary">
                Podes ter <span className="text-accent font-bold">{percentageGain}% mais</span> se melhorares os teus hábitos!
              </p>
            </div>
            <div className="bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary mb-2">O Teu Caminho Recomendado</h3>
              <p className="text-3xl font-bold text-success mb-2">{formatCurrency(results.moderate_outcome)}</p>
              <p className="text-secondary">Com o perfil {profileLabels[results.recommended_profile]}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-accent/5 to-transparent border-l-4 border-l-accent">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Award className="text-accent" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">Porque é que isto importa?</h3>
              <p className="text-secondary leading-relaxed text-lg mb-4">
                Os hábitos financeiros que crias <span className="text-accent font-bold">AGORA</span>, na adolescência, vão moldar toda a tua vida. Estudos mostram que jovens que aprendem a poupar e investir cedo têm muito mais probabilidade de serem financeiramente independentes no futuro.
              </p>
              <p className="text-secondary leading-relaxed text-lg mb-4">
                Não é sobre ter muito dinheiro agora. É sobre aprender a <span className="text-success font-bold">controlar impulsos</span>, <span className="text-success font-bold">pensar no futuro</span>, e <span className="text-success font-bold">tomar decisões inteligentes</span>. Estas competências vão ajudar-te em TUDO na vida!
              </p>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-4">
                <p className="text-primary font-bold text-lg mb-2">Dica Pro:</p>
                <p className="text-secondary">
                  Começa pequeno: poupa €5 por semana. Em 1 ano, são €260. Com juros compostos e aumentos graduais, isso pode crescer para centenas de milhares ao longo da vida. O segredo é começar AGORA!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
