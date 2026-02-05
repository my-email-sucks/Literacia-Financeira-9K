import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';
import { getQuizResults } from '../lib/supabase';

interface ResultsDashboardProps {
  sessionId: string;
  onReset: () => void;
}

interface QuizResult {
  conservative_outcome: number;
  moderate_outcome: number;
  aggressive_outcome: number;
  recommended_profile: string;
}

export function ResultsDashboard({ sessionId, onReset }: ResultsDashboardProps) {
  const [results, setResults] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const data = await getQuizResults(sessionId);
        setResults(data);
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-secondary">Loading your financial profile...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-secondary">Unable to load results</div>
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
    conservative: 'Conservative Investor',
    'moderate-conservative': 'Moderate Conservative',
    balanced: 'Balanced Investor',
    growth: 'Growth-Oriented',
    aggressive: 'Aggressive Investor',
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-primary px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Your Financial Profile</h1>
            <p className="text-secondary text-lg">
              Recommended: <span className="text-accent font-semibold">{profileLabels[results.recommended_profile]}</span>
            </p>
          </div>
          <button
            onClick={onReset}
            className="btn-secondary"
          >
            Retake Quiz
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Conservative Strategy</h3>
              <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-success" />
              </div>
            </div>
            <p className="text-3xl font-bold text-success mb-2">
              {formatCurrency(results.conservative_outcome)}
            </p>
            <p className="text-secondary text-sm">
              4% annual return, focus on capital preservation
            </p>
          </div>

          <div className="card border-2 border-accent">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Moderate Strategy</h3>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-accent" />
              </div>
            </div>
            <p className="text-3xl font-bold text-accent mb-2">
              {formatCurrency(results.moderate_outcome)}
            </p>
            <p className="text-secondary text-sm">
              7% annual return, balanced growth and risk
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Aggressive Strategy</h3>
              <div className="w-10 h-10 bg-red/10 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-red" />
              </div>
            </div>
            <p className="text-3xl font-bold text-red mb-2">
              {formatCurrency(results.aggressive_outcome)}
            </p>
            <p className="text-secondary text-sm">
              11% annual return, growth focused with volatility
            </p>
          </div>
        </div>

        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">Growth Projection</h2>

          <div className="flex items-end justify-around h-80 px-4 py-8 bg-bg-primary rounded-lg border border-border">
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-16 bg-gradient-to-t from-green to-green-light rounded-t-lg transition-all duration-500"
                  style={{ height: `${(results.conservative_outcome / maxValue) * maxHeight}px` }}
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-primary">{formatCurrency(results.conservative_outcome)}</p>
                <p className="text-xs text-secondary mt-1">Conservative</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-16 bg-gradient-to-t from-accent to-orange-light rounded-t-lg transition-all duration-500"
                  style={{ height: `${(results.moderate_outcome / maxValue) * maxHeight}px` }}
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-primary">{formatCurrency(results.moderate_outcome)}</p>
                <p className="text-xs text-secondary mt-1">Moderate</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-16 bg-gradient-to-t from-red to-red-light rounded-t-lg transition-all duration-500"
                  style={{ height: `${(results.aggressive_outcome / maxValue) * maxHeight}px` }}
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-primary">{formatCurrency(results.aggressive_outcome)}</p>
                <p className="text-xs text-secondary mt-1">Aggressive</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-4">Conservative Strategy</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Lower Volatility</p>
                  <p className="text-secondary text-sm">Stable, predictable returns</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Capital Preservation</p>
                  <p className="text-secondary text-sm">Focus on protecting your assets</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-danger font-bold mt-1">×</span>
                <div>
                  <p className="text-primary font-medium">Lower Returns</p>
                  <p className="text-secondary text-sm">May not keep pace with inflation</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card border-2 border-accent">
            <h3 className="text-lg font-semibold text-primary mb-4">Recommended Strategy</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Balanced Approach</p>
                  <p className="text-secondary text-sm">Mix of growth and stability</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Optimized for Your Profile</p>
                  <p className="text-secondary text-sm">Tailored to your risk tolerance</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold mt-1">✓</span>
                <div>
                  <p className="text-primary font-medium">Diversification</p>
                  <p className="text-secondary text-sm">Spread risk across assets</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="card mb-12">
          <h3 className="text-lg font-semibold text-primary mb-4">Why This Matters</h3>
          <p className="text-secondary leading-relaxed">
            Your investment strategy should align with your financial goals, time horizon, and risk tolerance.
            The strategy recommended for your profile balances the potential for growth with a level of risk
            you're comfortable with. Remember, investing is a long-term endeavor, and staying disciplined with
            regular contributions can significantly impact your wealth over time.
          </p>
        </div>
      </div>
    </div>
  );
}
