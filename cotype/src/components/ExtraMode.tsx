import { createSignal, onMount, onCleanup, createEffect } from 'solid-js';

interface ExtraModeProps {
  text: string;
  onComplete: () => void;
  onTypingProgress: (index: number, errors: number[]) => void;
  problematicKeys: Record<string, number>;
  onBack: () => void;
}

export default function ExtraMode(props: ExtraModeProps) {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [errors, setErrors] = createSignal<number[]>([]);
  const [isFocused, setIsFocused] = createSignal(false);
  const [cursorPosition, setCursorPosition] = createSignal({ line: 0, column: 0 });
  const [isCompleted, setIsCompleted] = createSignal(false);
  let editorRef: HTMLDivElement | undefined;

  // Generate practice text based on problematic keys
  const generatePracticeText = () => {
    const lines: string[] = [];
    const charsPerLine = 36;
    
    // Get top problematic keys or use defaults
    const defaultKeys = ['[', ']', '{', '}', '(', ')', ';', ':', '"', "'"];
    const topKeys = Object.keys(props.problematicKeys).length > 0
      ? Object.entries(props.problematicKeys)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([key]) => key)
      : defaultKeys;

    // Generate 5 lines
    for (let i = 0; i < 5; i++) {
      let line = '';
      while (line.length < charsPerLine) {
        // Add a random problematic key
        const key = topKeys[Math.floor(Math.random() * topKeys.length)];
        line += key;
        
        // Add a space if not at the end
        if (line.length < charsPerLine) {
          line += ' ';
        }
      }
      lines.push(line.trimEnd());
    }

    return lines.join('\n');
  };

  const practiceText = generatePracticeText();

  // Reset state when component mounts or problematic keys change
  createEffect(() => {
    setCurrentIndex(0);
    setErrors([]);
    setIsCompleted(false);
    setIsFocused(true);
    editorRef?.focus();
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isFocused()) return;

    // Prevent default behavior for special keys
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
    }

    const char = practiceText[currentIndex()];
    let inputChar = e.key;

    // Handle special characters
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
      return;
    }

    // Handle Enter key or Space at end of line
    if (e.key === 'Enter' || (e.key === ' ' && char === '\n')) {
      inputChar = '\n';
      e.preventDefault();
    }

    // Handle backspace
    if (e.key === 'Backspace') {
      if (currentIndex() > 0) {
        setCurrentIndex((prev) => prev - 1);
        setErrors((prev) => prev.filter((i) => i !== currentIndex() - 1));
        updateCursorPosition();
        props.onTypingProgress(currentIndex() - 1, errors());
      }
      return;
    }

    if (inputChar === char) {
      setCurrentIndex((prev) => prev + 1);
      updateCursorPosition();
      props.onTypingProgress(currentIndex() + 1, errors());
      if (currentIndex() === practiceText.length - 1) {
        setIsCompleted(true);
        props.onComplete();
      }
    } else {
      setErrors((prev) => [...prev, currentIndex()]);
      props.onTypingProgress(currentIndex(), [...errors(), currentIndex()]);
    }
  };

  const updateCursorPosition = () => {
    const text = practiceText.slice(0, currentIndex());
    const lines = text.split('\n');
    const line = lines.length - 1;
    const column = lines[lines.length - 1].length;
    setCursorPosition({ line, column });
  };

  const handleClick = () => {
    setIsFocused(true);
    editorRef?.focus();
  };

  // Auto-focus when component mounts
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Focus immediately
    setIsFocused(true);
    editorRef?.focus();
  });

  onCleanup(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  const renderText = () => {
    const lines = practiceText.split('\n');
    let globalIndex = 0;

    return lines.map((line, lineIndex) => {
      const chars = line.split('').map((char) => {
        const index = globalIndex++;
        let className = 'untyped-char';
        
        if (index < currentIndex()) {
          className = errors().includes(index) ? 'error-char' : 'typed-char';
        } else if (index === currentIndex()) {
          className = 'current-char';
        }

        return <span class={className}>{char}</span>;
      });

      // Add cursor at the current position
      if (lineIndex === cursorPosition().line) {
        if (cursorPosition().column === line.length) {
          // Cursor at the end of the line
          chars.push(<span class="cursor"></span>);
        } else if (cursorPosition().column === 0) {
          // Cursor at the start of the line
          chars.unshift(<span class="cursor"></span>);
        } else {
          // Cursor in the middle of the line
          chars.splice(cursorPosition().column, 0, <span class="cursor"></span>);
        }
      }

      // Add newline character if not the last line
      if (lineIndex < lines.length - 1) {
        const newlineIndex = globalIndex++;
        const newlineClass = newlineIndex < currentIndex() ? 'typed-char' : 'untyped-char';
        chars.push(<span class={newlineClass}>{'\n'}</span>);
      }

      return (
        <div class="line">
          {chars}
        </div>
      );
    });
  };

  const getTopProblematicKeys = () => {
    const defaultKeys = ['[', ']', '{', '}', '(', ')', ';', ':', '"', "'"];
    return Object.keys(props.problematicKeys).length > 0
      ? Object.entries(props.problematicKeys)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([key, count]) => ({ key, count }))
      : defaultKeys.map(key => ({ key, count: 0 }));
  };

  return (
    <div class="mt-8">
      <div 
        ref={editorRef}
        class={`typing-text extra-mode p-4 rounded bg-tokyo-bg-light font-mono outline-none h-[500px] overflow-y-auto ${isCompleted() ? 'firework' : ''}`}
        onClick={handleClick}
        tabIndex={0}
      >
        <pre class="m-0 p-0"><code>{renderText()}</code></pre>
      </div>
      
      {isCompleted() && (
        <div class="mt-8 text-center">
          <h3 class="text-xl font-bold mb-4">Your Most Problematic Keys:</h3>
          <div class="flex gap-2 justify-center mb-6">
            {getTopProblematicKeys().map(({ key, count }) => (
              <div class="problematic-key">
                {key} ({count})
              </div>
            ))}
          </div>
          <button 
            class="btn-large"
            onClick={() => window.location.reload()}
          >
            Practice Problematic Keys
          </button>
        </div>
      )}
    </div>
  );
} 