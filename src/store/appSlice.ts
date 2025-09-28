import config from "@/app.json";
import { Theme } from "@/context/ThemeProvider";
import { persist } from "zustand/middleware";

export interface AppSlice {
  appError: string | null;
  setAppError: (error: string | null) => void;

  language: string;
  setLanguage: (lang: string) => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  sidebarExpanded: boolean;
  toggleSidebar: () => void;

  displayName?: string;
  setDisplayName: (displayName: string) => void;
}

export const createAppSlice = persist<AppSlice>(
  (set, get) => ({
    appError: null,
    setAppError: (error) => set({ appError: error }),

    language: config["default-lang"],
    setLanguage: (lang) => set({ language: lang }),

    theme: config["default-theme"] as Theme,
    setTheme: (theme) => set({ theme }),

    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

    sidebarExpanded: false,
    toggleSidebar: () => set({ sidebarExpanded: !get().sidebarExpanded }),

    displayName: undefined,
    setDisplayName: (displayName) => set({ displayName }),
  }),
  {
    name: config["zustand-app-store"],
    partialize: (state) =>
      ({
        language: state.language,
        theme: state.theme,
        isLoggedIn: state.isLoggedIn,
        sidebarExpanded: state.sidebarExpanded,
      } as AppSlice),
  }
);
