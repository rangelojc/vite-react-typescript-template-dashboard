import { useTheme } from "@/context/ThemeProvider";
import { useEffect } from "react";

const useThemeToggleShortcuts = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key.toLowerCase() === "/") {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [theme, setTheme]);
};

export default useThemeToggleShortcuts;
