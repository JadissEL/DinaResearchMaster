"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const order: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  const label =
    theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Auto";

  return (
    <button
      type="button"
      onClick={cycle}
      className="chip-ref"
      aria-label={`Theme: ${label}. Click to change.`}
    >
      Theme: {label}
    </button>
  );
}
