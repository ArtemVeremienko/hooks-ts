import { useEffect, useReducer, useRef } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: 'pending' }
  | { type: 'fulfilled'; payload: T }
  | { type: 'rejected'; payload: Error };

function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const cache = useRef<Cache<T>>({});

  const initialState: State<T> = {
    data: undefined,
    error: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'pending':
        return { ...initialState };
      case 'fulfilled':
        return { ...initialState, data: action.payload };
      case 'rejected':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;
    let abortController: AbortController;

    const fetchData = async () => {
      abortController = new AbortController();
      dispatch({ type: 'pending' });

      if (cache.current[url]) {
        dispatch({ type: 'fulfilled', payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (abortController.signal.aborted) return;

        dispatch({ type: 'fulfilled', payload: data });
      } catch (error) {
        if (abortController.signal.aborted) return;

        dispatch({ type: 'rejected', payload: error as Error });
      }
    };

    void fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return state;
}

export default useFetch;
