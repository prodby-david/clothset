"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-warm-gray bg-surface/60 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`w-9 h-9 rounded-xl border border-warm-gray bg-surface text-charcoal hover:bg-cream transition-colors flex items-center justify-center cursor-pointer shadow-2xs ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-sage transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-forest transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
