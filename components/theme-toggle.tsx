"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { THEME_KEY } from "@/lib/theme";


function apply(theme: "light" | "dark") {
  document.documentElement.classList.toggle("light", theme === "light");
}

/**
 * Light/dark switch. The new theme sweeps down the page like a curtain
 * (View Transitions API); browsers without it, or with reduced motion,
 * switch instantly.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage blocked */ }
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) { apply(next); return; }
    document.documentElement.dataset.themeAnim = "1";
    const vt = doc.startViewTransition(() => apply(next));
    const guard = setTimeout(() => apply(next), 1000);
    vt.finished.finally(() => { clearTimeout(guard); delete document.documentElement.dataset.themeAnim; });
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`rounded-lg p-2 text-mist transition hover:bg-white/5 hover:text-frost ${className}`}
    >
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}
