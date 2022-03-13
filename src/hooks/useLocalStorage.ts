import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import useEventListener from './useEventListener'

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

enum EventName {
  Storage = 'storage',
  LocalStorage = 'local-storage'
}

type SetValue<T> = Dispatch<SetStateAction<T>>

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readValue = useCallback(
    (): T => {
      if (typeof window === 'undefined') {
        return initialValue
      }

      try {
        const item = window.localStorage.getItem(key)
        return item ? (parseJSON(item) as T) : initialValue
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return initialValue
      }
    },
    [key, initialValue]
  )

  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's that persist the new value to localStorage
  const setValue: SetValue<T> = useCallback((value) => {
    if (typeof window === 'undefined') {
      console.warn(`Tried setting localStorage key "${key}" even though environment is not a client`)
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      window.localStorage.setItem(key, JSON.stringify(newValue))
      setStoredValue(newValue)
      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event(EventName.LocalStorage))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}"`, error);

    }
  },[key, storedValue])



  const handleStorageChange = useCallback(() => {
    setStoredValue(readValue())
  }, [readValue])

  useEffect(() => {
    handleStorageChange()
  }, [])

  useEventListener(EventName.Storage, handleStorageChange)

  useEventListener(EventName.LocalStorage, handleStorageChange)

  return [storedValue, setValue]
}

function parseJSON<T>(value = ''): T | undefined {
  try {
    return JSON.parse(value)
  } catch (error) {
    console.warn(`parsing error on`, {value});
    return undefined
  }
}

export default useLocalStorage
