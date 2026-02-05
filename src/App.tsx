import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { ResultsDashboard } from './components/ResultsDashboard';

type AppState = 'quiz' | 'results';

function App() {
  const [state, setState] = useState<AppState>('quiz');
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleQuizComplete = (newSessionId: string) => {
    setSessionId(newSessionId);
    setState('results');
  };

  const handleReset = () => {
    setSessionId(null);
    setState('quiz');
  };

  return (
    <>
      {state === 'quiz' ? (
        <Quiz onComplete={handleQuizComplete} />
      ) : sessionId ? (
        <ResultsDashboard sessionId={sessionId} onReset={handleReset} />
      ) : null}
    </>
  );
}

export default App;
