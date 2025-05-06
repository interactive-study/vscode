import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

type Theme = 'consciousness' | 'subconsciousness';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
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

  const toggleTheme = () => {
    if (changing.current) {
      return;
    }
    changing.current = true;
    setTheme((prevTheme) =>
      prevTheme === 'subconsciousness' ? 'consciousness' : 'subconsciousness'
    );
    setTimeout(() => {
      changing.current = false;
    }, 1000);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
