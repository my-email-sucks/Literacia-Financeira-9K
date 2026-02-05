import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, DollarSign, Award } from 'lucide-react';
import { getQuizResults } from '../lib/supabase';
import { calculateScenarios } from '../lib/quizData';

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

  useEffect(() => {
    const loadResults = async () => {
      try {
        const data = await getQuizResults(sessionId);
        setResults(data);

        // Calculate success score if we have responses
        if (Object.keys(responses).length > 0) {
          const numericResponses: Record<string, number> = {};
          Object.entries(responses).forEach(([key, value]) => {
            if (typeof value === 'number') {
              numericResponses[key] = value;
            }
          });
          const scenarios = calculateScenarios(numericResponses);
          setSuccessScore(scenarios.successScore);
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
        <div className="text-secondary">Carregando o seu perfil financeiro...</div>
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

  const maxValue = Math.max(
    results.conservative_outcome,
    results.moderate_outcome,
    results.aggressive_outcome
  );
  const maxHeight = 300;

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

  return (
    <div className="min-h-screen bg-primary px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">O Seu Perfil Financeiro</h1>
            <p className="text-secondary text-lg">
              Recomendado: <span className="text-accent font-semibold">{profileLabels[results.recommended_profile]}</span>
            </p>
          </div>
          <button
            onClick={onReset}
            className="btn-secondary"
          >
            Repetir Questionário
          </button>
        </div>

        {successScore > 0 && (
          <div className="card bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/30 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1">Índice de Sucesso Financeiro</h3>
                <p className="text-secondary text-sm">Baseado em comportamentos e hábitos financeiros comprovados</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent/50">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">{successScore}%</div>
                    <div className="text-xs text-secondary">Excelente</div>
                  </div>
                </div>
                <Award size={40} className="text-accent" />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Estratégia Conservadora</h3>
              <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-success" />
              </div>
            </div>
            <p className="text-3xl font-bold text-success mb-2">
              {formatCurrency(results.conservative_outcome)}
            </p>
            <p className="text-secondary text-sm">
              4% rentabilidade anual, foco na preservação de capital
            </p>
          </div>

          <div className="card border-2 border-accent">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Estratégia Moderada</h3>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-accent" />
              </div>
            </div>
            <p className="text-3xl font-bold text-accent mb-2">
              {formatCurrency(results.moderate_outcome)}
            </p>
            <p className="text-secondary text-sm">
              7% rentabilidade anual, equilíbrio entre crescimento e risco
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Estratégia Agressiva</h3>
              <div className="w-10 h-10 bg-red/10 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-red" />
              </div>
            </div>
            <p className="text-3xl font-bold text-red mb-2">
              {formatCurrency(results.aggressive_outcome)}
            </p>
            <p className="text-secondary text-sm">
              11% rentabilidade anual, crescimento agressivo com volatilidade
            </p>
          </div>
        </div>

        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">Projeção de Crescimento</h2>

          <div className="flex items-end justify-around h-80 px-4 py-8 bg-secondary rounded-lg border border-primary">
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-16 rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${(results.conservative_outcome / maxValue) * maxHeight}px`,
                    background: `linear-gradient(to top, var(--color-green), var(--color-green-light))`
                  }}
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-primary">{formatCurrency(results.conservative_outcome)}</p>
                <p className="text-xs text-secondary mt-1">Conservadora</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-16 rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${(results.moderate_outcome / maxValue) * maxHeight}px`,
                    background: `linear-gradient(to top, var(--color-orange), var(--color-orange-light))`
                  }}
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-primary">{formatCurrency(results.moderate_outcome)}</p>
                <p className="text-xs text-secondary mt-1">Moderada</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-16 rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${(results.aggressive_outcome / maxValue) * maxHeight}px`,
                    background: `linear-gradient(to top, var(--color-red), var(--color-red-light))`
                  }}
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-primary">{formatCurrency(results.aggressive_outcome)}</p>
                <p className="text-xs text-secondary mt-1">Agressiva</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-4">Estratégia Conservadora</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Menor Volatilidade</p>
                  <p className="text-secondary text-sm">Rentabilidade estável e previsível</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Preservação de Capital</p>
                  <p className="text-secondary text-sm">Foco na proteção dos seus ativos</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger font-bold mt-1">×</span>
                <div>
                  <p className="text-primary font-medium">Rentabilidade Mais Baixa</p>
                  <p className="text-secondary text-sm">Pode não acompanhar a inflação</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card border-2 border-accent">
            <h3 className="text-lg font-semibold text-primary mb-4">Estratégia Recomendada</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Abordagem Equilibrada</p>
                  <p className="text-secondary text-sm">Mistura de crescimento e segurança</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Otimizada para o Seu Perfil</p>
                  <p className="text-secondary text-sm">Adaptada à sua tolerância ao risco</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Diversificação</p>
                  <p className="text-secondary text-sm">Distribuir o risco entre ativos</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="card mb-12">
          <h3 className="text-lg font-semibold text-primary mb-4">Por que isto é importante</h3>
          <p className="text-secondary leading-relaxed">
            A sua estratégia de investimento deve estar alinhada com os seus objetivos financeiros, horizonte temporal e tolerância ao risco.
            A estratégia recomendada para o seu perfil equilibra o potencial de crescimento com um nível de risco com o qual se sente confortável.
            Lembre-se, investir é um empreendimento a longo prazo, e manter a disciplina com contribuições regulares pode impactar significativamente a sua riqueza ao longo do tempo.
          </p>
        </div>
      </div>
    </div>
  );
}
