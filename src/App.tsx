import { createSignal, Show } from 'solid-js';
import { TypingArea } from './components/TypingArea';
import { Stats } from './components/Stats';
import { ModeSelector } from './components/ModeSelector';
import { ExtraMode } from './components/ExtraMode';

type Mode = 'news' | 'code';

function App() {
  const [mode, setMode] = createSignal<Mode>('news');
  const [showExtra, setShowExtra] = createSignal(false);
  const [text, setText] = createSignal('');
  const [input, setInput] = createSignal('');
  const [startTime, setStartTime] = createSignal<number | null>(null);
  const [endTime, setEndTime] = createSignal<number | null>(null);
  const [errors, setErrors] = createSignal<number[]>([]);
  const [problematicKeys, setProblematicKeys] = createSignal<Record<string, number>>({});

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setInput(value);

    if (!startTime()) {
      setStartTime(Date.now());
    }

    // Check for errors
    const newErrors: number[] = [];
    const newProblematicKeys: Record<string, number> = { ...problematicKeys() };

    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text()[i]) {
        newErrors.push(i);
        newProblematicKeys[text()[i]] = (newProblematicKeys[text()[i]] || 0) + 1;
      }
    }

    setErrors(newErrors);
    setProblematicKeys(newProblematicKeys);

    // Check if typing is complete
    if (value.length === text().length) {
      setEndTime(Date.now());
    }
  };

  const resetTyping = () => {
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setErrors([]);
    setProblematicKeys({});
  };

  return (
    <div class="min-h-screen p-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-center text-tokyo-blue">Cotype</h1>
        
        <Show when={!showExtra()}>
          <ModeSelector mode={mode()} onModeChange={setMode} />
          <TypingArea
            mode={mode()}
            text={text()}
            input={input()}
            errors={errors()}
            onInput={handleInput}
            onTextChange={setText}
          />
          <Stats
            startTime={startTime()}
            endTime={endTime()}
            text={text()}
            input={input()}
            problematicKeys={problematicKeys()}
          />
          <div class="mt-8 text-center">
            <button
              class="btn"
              onClick={() => setShowExtra(true)}
            >
              Practice Problematic Keys
            </button>
          </div>
        </Show>

        <Show when={showExtra()}>
          <ExtraMode
            problematicKeys={problematicKeys()}
            onBack={() => setShowExtra(false)}
          />
        </Show>
      </div>
    </div>
  );
}

export default App; 