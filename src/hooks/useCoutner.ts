import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
}

function useCounter(initialValue = 0): ReturnType {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((x) => x + 1);
  const decrement = () => setCount((x) => x - 1);
  const reset = () => setCount(initialValue);

  return { count, setCount, increment, decrement, reset };
}

export default useCounter;
