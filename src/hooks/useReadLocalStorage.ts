import { useCallback, useState, useEffect } from 'react';
import { useEventListener } from 'usehooks-ts';
type Value<T> = T | null;

function useReadLocalStorage<T>(key: string): Value<T> {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      console.warn(`Error reading localStorage key "${key}"`);
      return null;
    }
  }, [key]);

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const handleStorageChange = useCallback(() => {
    setStoredValue(readValue());
  }, [readValue]);

  useEventListener('storage', handleStorageChange);

  useEventListener('local-storage', handleStorageChange);

  return storedValue;
}

export default useReadLocalStorage;
