import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { quizQuestions, calculateScenarios } from '../lib/quizData';
import { saveQuizResponses, saveQuizResults } from '../lib/supabase';

interface QuizProps {
  onComplete: (sessionId: string, responses: Record<string, number | string>) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, number | string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;
  const isNameQuestion = currentQuestion.id === 'name';

  const handleTextInput = (value: string) => {
    setResponses({
      ...responses,
      [currentQuestion.id]: value,
    });
  };

  const handleAnswer = (value: number) => {
    setResponses({
      ...responses,
      [currentQuestion.id]: value,
    });

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const sessionId = `session_${Date.now()}`;

      // Convert responses to numeric for calculation (excluding name)
      const numericResponses: Record<string, number> = {};
      Object.entries(responses).forEach(([key, value]) => {
        if (typeof value === 'number') {
          numericResponses[key] = value;
        }
      });

      const scenarios = calculateScenarios(numericResponses);

      await saveQuizResponses(sessionId, responses);
      await saveQuizResults(
        sessionId,
        scenarios.conservative,
        scenarios.moderate,
        scenarios.aggressive,
        scenarios.profile
      );

      onComplete(sessionId, responses);
    } catch (error) {
      console.error('Error saving quiz results:', error);
      setIsLoading(false);
    }
  };

  const isAnswered = responses[currentQuestion.id] !== undefined && responses[currentQuestion.id] !== '';
  const isComplete = Object.keys(responses).length === quizQuestions.length;

  const categoryLabels: Record<string, string> = {
    personal: 'Informação Pessoal',
    behavior: 'Comportamento Financeiro',
    investment: 'Perfil de Investimento',
    psychology: 'Psicologia Financeira',
    financial: 'Saúde Financeira',
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Perfil Financeiro</h1>
              {currentQuestion.category && (
                <p className="text-sm text-secondary mt-1">
                  {categoryLabels[currentQuestion.category]}
                </p>
              )}
            </div>
            <span className="text-sm text-secondary">
              {currentStep + 1} de {quizQuestions.length}
            </span>
          </div>
          <div className="w-full h-2 bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="card mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              {currentQuestion.question}
            </h2>
            {currentQuestion.description && (
              <p className="text-secondary text-sm">{currentQuestion.description}</p>
            )}
          </div>

          {isNameQuestion ? (
            <input
              type="text"
              placeholder="Introduza o seu nome completo"
              value={(responses[currentQuestion.id] as string) || ''}
              onChange={(e) => handleTextInput(e.target.value)}
              className="w-full p-4 rounded-lg border-2 border-primary bg-secondary text-primary placeholder-secondary focus:outline-none focus:border-accent transition-colors"
            />
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(answer.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    responses[currentQuestion.id] === answer.value
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-primary bg-secondary text-primary hover:border-accent/50'
                  }`}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 0
                ? 'bg-bg-secondary text-secondary cursor-not-allowed opacity-50'
                : 'btn-secondary'
            }`}
          >
            <ChevronLeft size={20} />
            Anterior
          </button>

          {currentStep === quizQuestions.length - 1 && isComplete ? (
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                isLoading ? 'bg-accent/50 cursor-not-allowed' : 'btn-primary'
              }`}
            >
              {isLoading ? 'Calculando...' : 'Ver Resultados'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isAnswered || currentStep === quizQuestions.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                !isAnswered || currentStep === quizQuestions.length - 1
                  ? 'bg-bg-secondary text-secondary cursor-not-allowed opacity-50'
                  : 'btn-primary'
              }`}
            >
              Seguinte
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
