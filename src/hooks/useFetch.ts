interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: 'pending' }
  | { type: 'fulfilled'; payload: T }
  | { type: 'rejected'; payload: Error };

function useFetch<T = unknown> (url?: string, options?: RequestInit): State<T> {

}

export default useFetch
