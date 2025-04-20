'use client';
import React, { useEffect, useState, createContext, useContext } from 'react';

type Theme = {
  colors: {
    primary: string;
    secondary: string;
  };
  toggleTheme: () => void;
};

const lightTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#f8f9fa',
  },
};

const darkTheme = {
  colors: {
    primary: '#333',
    secondary: '#121212',
  },
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(lightTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === lightTheme ? darkTheme : lightTheme;
      localStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  if (!mounted) return null; 

  return (
    <ThemeContext.Provider value={{ colors: theme.colors, toggleTheme }}>
      <div
        style={{
          backgroundColor: theme.colors.secondary,
          color: theme.colors.primary === '#007bff' ? '#000' : '#fff',
          minHeight: '100vh',
          transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out',
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
