interface PasteAreaProps {
  mode: 'news' | 'code';
  value: string;
  onInput: (value: string) => void;
  onSubmit: () => void;
}

export default function PasteArea(props: PasteAreaProps) {
  return (
    <div class="paste-area" style="display: flex; gap: 0.5rem; align-items: center;">
      <input
        type="text"
        class="paste-input"
        placeholder={props.mode === 'news' ? "Paste text here" : "Paste GitHub URL here"}
        value={props.value}
        onInput={(e) => props.onInput(e.currentTarget.value)}
      />
      <button
        class="paste-btn"
        onClick={props.onSubmit}
      >
        Import
      </button>
    </div>
  );
} 