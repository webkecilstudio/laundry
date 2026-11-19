import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";
    root.dataset.theme = theme;
    root.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("bb-theme", theme);
    } catch {
      void 0;
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#0B0B0F" : "#FAFAFA");
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((current) => (current === "dark" ? "light" : "dark")),
  };
}
