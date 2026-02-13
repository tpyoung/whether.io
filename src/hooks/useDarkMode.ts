import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("whether-dark-mode");
    return stored ? stored === "true" : true; // default to dark
  });

  useEffect(() => {
    localStorage.setItem("whether-dark-mode", String(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
}
