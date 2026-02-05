import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { ResultsDashboard } from './components/ResultsDashboard';

type AppState = 'quiz' | 'results';

function App() {
  const [state, setState] = useState<AppState>('quiz');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, number | string>>({});

  const handleQuizComplete = (newSessionId: string, quizResponses: Record<string, number | string>) => {
    setSessionId(newSessionId);
    setResponses(quizResponses);
    setState('results');
  };

  const handleReset = () => {
    setSessionId(null);
    setResponses({});
    setState('quiz');
  };

  return (
    <>
      {state === 'quiz' ? (
        <Quiz onComplete={handleQuizComplete} />
      ) : sessionId ? (
        <ResultsDashboard sessionId={sessionId} onReset={handleReset} responses={responses} />
      ) : null}
    </>
  );
}

export default App;
