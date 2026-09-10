import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type ThemeMode = "light" | "dark";

interface IThemeContextValue {
  /** The user-selected mode ("light" | "dark"). */
  theme: ThemeMode;
  /** The mode actually applied (same as `theme` for now — extend for "system" here). */
  resolvedTheme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const defaultContext: IThemeContextValue = {
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
};

const ThemeContext = createContext<IThemeContextValue>(defaultContext);

interface IThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: IThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const resolvedTheme = theme;

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo<IThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): IThemeContextValue {
  return useContext(ThemeContext);
}