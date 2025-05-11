import { createSignal, onMount, onCleanup } from 'solid-js';
import hljs from 'highlight.js';
import '../styles/highlight.css';

interface CodeModeProps {
  text: string;
  onComplete: () => void;
  onTypingProgress: (index: number, errors: number[]) => void;
}

export default function CodeMode(props: CodeModeProps) {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [errors, setErrors] = createSignal<number[]>([]);
  const [isFocused, setIsFocused] = createSignal(false);
  const [cursorPosition, setCursorPosition] = createSignal({ line: 0, column: 0 });
  const [isCompleted, setIsCompleted] = createSignal(false);
  const [isCapsLockOn, setIsCapsLockOn] = createSignal(false);
  let editorRef: HTMLDivElement | undefined;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isFocused()) return;

    // Check for CapsLock
    setIsCapsLockOn(e.getModifierState('CapsLock'));

    // Prevent default behavior for special keys
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
    }

    const char = props.text[currentIndex()];
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
      if (currentIndex() === props.text.length - 1) {
        setIsCompleted(true);
        props.onComplete();
      }
    } else {
      setErrors((prev) => [...prev, currentIndex()]);
      props.onTypingProgress(currentIndex(), [...errors(), currentIndex()]);
    }
  };

  const updateCursorPosition = () => {
    const text = props.text.slice(0, currentIndex());
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
    const lines = props.text.split('\n');
    let globalIndex = 0;

    return lines.map((line, lineIndex) => {
      const chars = line.split('').map((char, charIndex) => {
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

  return (
    <div class="mt-8">
      <Show when={isCapsLockOn()}>
        <div class="capslock-warning">
          CapsLock is ON
        </div>
      </Show>

      <div 
        ref={editorRef}
        class={`typing-text code-mode p-4 rounded bg-tokyo-bg-light font-mono outline-none h-[500px] overflow-y-auto ${isCompleted() ? 'firework' : ''}`}
        onClick={handleClick}
        tabIndex={0}
      >
        <pre class="m-0 p-0"><code>{renderText()}</code></pre>
      </div>
    </div>
  );
} 