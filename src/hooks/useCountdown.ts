import useBoolean from './useBoolean';
import useCounter from './useCoutner';
import useInterval from './useInterval';

interface UseCountdownType {
  seconds: number;
  interval: number;
  isIncrement?: boolean;
}

interface CountdownHelpers {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

function useCountdown({
  seconds,
  interval,
  isIncrement,
}: UseCountdownType): [number, CountdownHelpers] {
  const {
    count,
    increment,
    decrement,
    reset: resetCoutner,
  } = useCounter(seconds);

  const { value: running, setTrue: start, setFalse: stop } = useBoolean(false);

  const reset = () => {
    stop()
    resetCoutner()
  }

  useInterval(isIncrement ? increment : decrement, running ? interval : null)

  return [count, {start, stop, reset}]
}

export default useCountdown;
