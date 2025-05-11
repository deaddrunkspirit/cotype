import { createSignal, createEffect } from 'solid-js';

interface StatsProps {
  currentIndex: number;
  errors: number[];
  totalChars: number;
}

export default function Stats(props: StatsProps) {
  const [elapsedTime, setElapsedTime] = createSignal(0);
  const [isActive, setIsActive] = createSignal(false);
  let timer: number | undefined;

  // Reset timer when currentIndex changes to 0 (mode change)
  createEffect(() => {
    if (props.currentIndex === 0) {
      setElapsedTime(0);
      setIsActive(false);
      if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
    } else if (!isActive()) {
      setIsActive(true);
      timer = window.setInterval(() => {
        if (isActive()) {
          setElapsedTime(prev => prev + 1);
        }
      }, 1000);
    }
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateWPM = () => {
    if (elapsedTime() === 0) return 0;
    const minutes = elapsedTime() / 60;
    // Standard WPM calculation: (characters typed / 5) / minutes
    // This is the standard formula used in typing tests
    const words = props.currentIndex / 5;
    return Math.round(words / minutes);
  };

  const calculateAccuracy = () => {
    if (props.currentIndex === 0) return 100;
    const errorRate = props.errors.length / props.currentIndex;
    return Math.round((1 - errorRate) * 100);
  };

  return (
    <div class="mt-4 grid grid-cols-3 gap-4 text-center">
      <div class="p-4 rounded bg-tokyo-bg-light">
        <div class="text-2xl font-bold text-tokyo-blue">{formatTime(elapsedTime())}</div>
        <div class="text-sm text-tokyo-comment">Time</div>
      </div>
      <div class="p-4 rounded bg-tokyo-bg-light">
        <div class="text-2xl font-bold text-tokyo-green">{calculateWPM()}</div>
        <div class="text-sm text-tokyo-comment">WPM</div>
      </div>
      <div class="p-4 rounded bg-tokyo-bg-light">
        <div class="text-2xl font-bold text-tokyo-red">{calculateAccuracy()}%</div>
        <div class="text-sm text-tokyo-comment">Accuracy</div>
      </div>
    </div>
  );
} 