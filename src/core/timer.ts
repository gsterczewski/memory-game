import { ref } from "vue";
interface Timer {
  start(): void;
  stop(): void;
  getTime(): number;
  reset(): void;
  hasStarted(): boolean;
}

export default function timer(): Timer {
  let time = ref(0);
  let interval = 0;
  let hasStarted = false;
  const incrementTime = () => {
    time.value++;
  };
  const start = () => {
    interval = setInterval(incrementTime, 1000);
    hasStarted = true;
  };
  const stop = () => {
    clearInterval(interval);
  };
  const reset = () => {
    time.value = 0;
    hasStarted = false;
    clearInterval(interval);
  };
  const getTime = () => time.value;
  return {
    getTime,
    start,
    stop,
    reset,
    hasStarted: () => hasStarted,
  };
}
