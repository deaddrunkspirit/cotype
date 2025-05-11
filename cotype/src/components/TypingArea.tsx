import { createSignal, onMount, onCleanup, Show, createEffect } from 'solid-js';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import NewsMode from './NewsMode';
import CodeMode from './CodeMode';
import ExtraMode from './ExtraMode';
import Stats from './Stats';
import PasteArea from './PasteArea';

interface TypingAreaProps {
  text: string;
  onComplete: () => void;
  onTypingProgress: (index: number, errors: number[]) => void;
}

export default function TypingArea(props: TypingAreaProps) {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [errors, setErrors] = createSignal<number[]>([]);
  const [isFocused, setIsFocused] = createSignal(false);
  const [mode, setMode] = createSignal<'news' | 'code' | 'extra'>('news');
  const [pastedText, setPastedText] = createSignal('');
  const [githubUrl, setGithubUrl] = createSignal('');
  const [problematicKeys, setProblematicKeys] = createSignal<Record<string, number>>({});
  const [currentText, setCurrentText] = createSignal(props.text);
  const [startTime, setStartTime] = createSignal<number | null>(null);
  const [endTime, setEndTime] = createSignal<number | null>(null);

  // Default text sources
  const defaultNewsText = 'My father\'s family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip.';
  const defaultCodeText = 
  `def classify_image(image_path):
    # Load the image
    image = cv2.imread(image_path)
    
    # Preprocess the image
    image = preprocess_image(image)
    
    # Classify the image
    result = model.predict(image)
    
    return result`;

  // Set initial text based on mode
  createEffect(() => {
    if (mode() === 'news') {
      setCurrentText(defaultNewsText);
    } else if (mode() === 'code') {
      setCurrentText(defaultCodeText);
    }
    // Reset all state when mode changes
    resetTyping();
  });

  const resetTyping = () => {
    setCurrentIndex(0);
    setErrors([]);
    setProblematicKeys({});
    setStartTime(null);
    setEndTime(null);
    // Reset all statistics by calling onTypingProgress with initial values
    props.onTypingProgress(0, []);
  };

  const handleModeChange = (newMode: 'news' | 'code' | 'extra') => {
    setMode(newMode);
    // Reset all state when mode changes
    resetTyping();
  };

  const handleTextPaste = () => {
    if (pastedText()) {
      // Limit pasted text to 1000 characters
      const limitedText = pastedText().slice(0, 1000);
      setCurrentText(limitedText);
      setCurrentIndex(0);
      setErrors([]);
      setPastedText('');
    }
  };

  const handleGithubUrlSubmit = async () => {
    if (!githubUrl()) return;
    
    try {
      // Convert GitHub URL to raw content URL
      const rawUrl = githubUrl()
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/');
      
      const response = await fetch(rawUrl);
      if (!response.ok) throw new Error('Failed to fetch file');
      
      const content = await response.text();
      // Split into lines, take first 100, and join back
      const lines = content.split('\n').slice(0, 100).join('\n');
      setCurrentText(lines);
      setCurrentIndex(0);
      setErrors([]);
      setGithubUrl('');
    } catch (error) {
      console.error('Error fetching GitHub file:', error);
      alert('Failed to fetch the file. Please check the URL and try again.');
    }
  };

  const handleTypingProgress = (index: number, newErrors: number[]) => {
    setCurrentIndex(index);
    setErrors(newErrors);
    props.onTypingProgress(index, newErrors);
  };

  return (
    <div class="w-full max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-4">
        <div class="flex gap-2">
          <button
            class={`btn ${mode() === 'news' ? 'active' : ''}`}
            onClick={() => handleModeChange('news')}
          >
            News
          </button>
          <button
            class={`btn ${mode() === 'code' ? 'active' : ''}`}
            onClick={() => handleModeChange('code')}
          >
            Code
          </button>
          <button
            class={`btn ${mode() === 'extra' ? 'active' : ''}`}
            onClick={() => handleModeChange('extra')}
          >
            Extra
          </button>
        </div>
        <Show when={mode() !== 'extra'}>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <input
              type="text"
              style="width: 300px; padding: 0.5rem; border-radius: 0.25rem; background: #1a1b26; color: #a9b1d6; border: 1px solid #24283b;"
              placeholder={mode() === 'news' ? "Paste text here (max 1000 chars)" : "Paste GitHub URL here (first 100 lines)"}
              value={mode() === 'news' ? pastedText() : githubUrl()}
              onInput={(e) => {
                if (mode() === 'news') {
                  setPastedText(e.currentTarget.value.slice(0, 1000));
                } else {
                  setGithubUrl(e.currentTarget.value);
                }
              }}
            />
            <button
              class="btn"
              onClick={mode() === 'news' ? handleTextPaste : handleGithubUrlSubmit}
            >
              Import
            </button>
          </div>
        </Show>
      </div>

      <Show when={mode() === 'news'}>
        <NewsMode
          text={currentText()}
          onComplete={props.onComplete}
          onTypingProgress={handleTypingProgress}
        />
      </Show>
      <Show when={mode() === 'code'}>
        <CodeMode
          text={currentText()}
          onComplete={props.onComplete}
          onTypingProgress={handleTypingProgress}
        />
      </Show>
      <Show when={mode() === 'extra'}>
        <ExtraMode
          text={currentText()}
          onComplete={props.onComplete}
          onTypingProgress={handleTypingProgress}
          problematicKeys={problematicKeys()}
          onBack={() => handleModeChange('news')}
        />
      </Show>

      <Stats
        currentIndex={currentIndex()}
        errors={errors()}
        totalChars={currentText().length}
      />
    </div>
  );
} 