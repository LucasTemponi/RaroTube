import { AnyARecord } from 'dns';
import React, { createContext, ReactNode, useState } from 'react';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('current-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

type ThemeProps = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
type Props = {
  children?: ReactNode;
  initialTheme: string;
};

export const ThemeContext = createContext<ThemeProps>({
  theme: '',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<Props> = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const checkTheme = (existing: string) => {
    const root = window.document.documentElement;
    const isDark = existing === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(existing);

    localStorage.setItem('current-theme', existing);
  };

  if (initialTheme) {
    checkTheme(initialTheme);
  }

  React.useEffect(() => {
    checkTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
