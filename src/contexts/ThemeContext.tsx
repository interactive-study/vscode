import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

type Theme = 'consciousness' | 'subconsciousness';
type ThemeEvent = Theme | 'toggle';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  addEventListener: (event: ThemeEvent, callback: () => void) => void;
  removeEventListener: (event: ThemeEvent, callback: () => void) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      '[ThemeContext] useThemeContext는 ThemeProvider 내부에서만 사용'
    );
  }

  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('consciousness');
  const changing = useRef(false);
  const eventListeners = useRef<{
    [key in ThemeEvent]: Set<(event: string) => void>;
  }>({
    consciousness: new Set(),
    subconsciousness: new Set(),
    toggle: new Set(),
  });

  const addEventListener = (event: ThemeEvent, callback: (event: string) => void) => {
    eventListeners.current[event].add(callback);
  };

  const removeEventListener = (event: ThemeEvent, callback: (event: string) => void) => {
    eventListeners.current[event].delete(callback);
  };

  const toggleTheme = () => {
    if (changing.current) {
      return;
    }
    changing.current = true;
    setTheme((prevTheme) => {
      const newTheme =
        prevTheme === 'consciousness' ? 'subconsciousness' : 'consciousness';
      eventListeners.current[newTheme].forEach((callback) =>
        callback(newTheme)
      );
      eventListeners.current.toggle.forEach((callback) => callback(newTheme));
      return newTheme;
    });
    setTimeout(() => {
      changing.current = false;
    }, 500);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, addEventListener, removeEventListener }}>
      {children}
    </ThemeContext.Provider>
  );
};
