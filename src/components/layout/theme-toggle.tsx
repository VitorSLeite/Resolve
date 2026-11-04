"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const THEME_STORAGE_KEY = "resolve-theme";

/** Inline script run before paint to avoid a light/dark flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema claro/escuro">
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </Button>
  );
}
