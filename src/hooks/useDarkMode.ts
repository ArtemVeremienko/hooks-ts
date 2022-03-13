import useLocalStorage from './useLocalStorage';
import useMediaQuery from './useMediaQuery';
import useUpdateEffect from './useUpdateEffect';

const COLOR_CHEME_QUERY = '(prefers-color-scheme: dark)';

interface UseDarkModeOutput {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_CHEME_QUERY);

  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    'usehooks-ts-dark-mode',
    defaultValue ??isDarkOS ?? false
  );

  useUpdateEffect(() => {
    setIsDarkMode(isDarkOS);
  }, [isDarkOS]);

  return {
    isDarkMode,
    toggle: () => setIsDarkMode((prev) => !prev),
    enable: () => setIsDarkMode(true),
    disable: () => setIsDarkMode(false),
  };
}

export default useDarkMode;
