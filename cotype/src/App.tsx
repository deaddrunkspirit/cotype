import { createSignal, Show } from 'solid-js';
import ModeSelector from './components/ModeSelector';
import TypingArea from './components/TypingArea';
import ExtraMode from './components/ExtraMode';

type Mode = 'news' | 'code' | 'extra';

function App() {
  const [showExtra, setShowExtra] = createSignal(false);
  const [startTime, setStartTime] = createSignal<number | null>(null);
  const [endTime, setEndTime] = createSignal<number | null>(null);

  const handleTypingProgress = (index: number, newErrors: number[]) => {
    if (!startTime()) {
      setStartTime(Date.now());
    }
  };

  const handleComplete = () => {
    setEndTime(Date.now());
  };

  return (
    <div class="min-h-screen p-8 bg-tokyo-bg text-tokyo-fg">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-center text-tokyo-blue">Cotype</h1>
        
        <Show when={!showExtra()}>
          <ModeSelector mode="news" onModeChange={() => {}} />
          <TypingArea
            text=""
            onComplete={handleComplete}
            onTypingProgress={handleTypingProgress}
          />
        </Show>

        <Show when={showExtra()}>
          <ExtraMode
            text=""
            onComplete={handleComplete}
            onTypingProgress={handleTypingProgress}
            problematicKeys={{}}
            onBack={() => setShowExtra(false)}
          />
        </Show>
      </div>
    </div>
  );
}

export default App; 