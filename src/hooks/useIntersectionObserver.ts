import { RefObject, useState, useEffect } from 'react';

interface Args extends IntersectionObserver {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    thresholds = [0],
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Partial<Args>
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { thresholds, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, JSON.stringify(thresholds), root, rootMargin, frozen]);

  return entry;
}

export default useIntersectionObserver;
