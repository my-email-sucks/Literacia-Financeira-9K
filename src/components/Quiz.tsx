import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { quizQuestions, calculateScenarios } from '../lib/quizData';
import { saveQuizResponses, saveQuizResults } from '../lib/supabase';

interface QuizProps {
  onComplete: (sessionId: string) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

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
      const scenarios = calculateScenarios(responses);

      await saveQuizResponses(sessionId, responses);
      await saveQuizResults(
        sessionId,
        scenarios.conservative,
        scenarios.moderate,
        scenarios.aggressive,
        scenarios.profile
      );

      onComplete(sessionId);
    } catch (error) {
      console.error('Error saving quiz results:', error);
      setIsLoading(false);
    }
  };

  const isAnswered = responses[currentQuestion.id] !== undefined;
  const isComplete = Object.keys(responses).length === quizQuestions.length;

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-primary">Financial Profile Quiz</h1>
            <span className="text-sm text-secondary">
              {currentStep + 1} of {quizQuestions.length}
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

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(answer.value)}
                className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                  responses[currentQuestion.id] === answer.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-bg-secondary text-primary hover:border-accent/50'
                }`}
              >
                {answer.text}
              </button>
            ))}
          </div>
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
            Previous
          </button>

          {currentStep === quizQuestions.length - 1 && isComplete ? (
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                isLoading ? 'bg-accent/50 cursor-not-allowed' : 'btn-primary'
              }`}
            >
              {isLoading ? 'Calculating...' : 'View Results'}
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
              Next
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
