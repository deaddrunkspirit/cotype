import type { Component } from 'solid-js';

interface ModeSelectorProps {
  mode: 'news' | 'code' | 'extra';
  onModeChange: (mode: 'news' | 'code' | 'extra') => void;
}

const ModeSelector: Component<ModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div class="flex gap-2 mb-4">
      <button
        class={`btn ${mode === 'news' ? 'active' : ''}`}
        onClick={() => onModeChange('news')}
      >
        News
      </button>
      <button
        class={`btn ${mode === 'code' ? 'active' : ''}`}
        onClick={() => onModeChange('code')}
      >
        Code
      </button>
      <button
        class={`btn ${mode === 'extra' ? 'active' : ''}`}
        onClick={() => onModeChange('extra')}
      >
        Extra
      </button>
    </div>
  );
};

export default ModeSelector; 