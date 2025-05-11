import type { Component } from 'solid-js';

interface ModeSelectorProps {
  mode: 'news' | 'code' | 'extra';
  onModeChange: (mode: 'news' | 'code' | 'extra') => void;
}

const ModeSelector: Component<ModeSelectorProps> = (props) => {
  return (
    <div class="flex gap-2 mb-4">
    </div>
  );
};

export default ModeSelector; 