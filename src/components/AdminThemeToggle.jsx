import React, { useState, useCallback } from "react";

/**
 * AdminThemeToggle — 28px glass circle, sun/moon icon.
 * Switches [data-theme] between "night" and "day" on <html>.
 * Extracted from public portal for reuse in admin dashboard.
 */
export default function AdminThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "night"
  );

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === "night" ? "day" : "night";
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="glass-full glass-interactive"
      style={{
        width: 28, height: 28, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: 14, lineHeight: 1,
        padding: 0,
      }}
    >
      {theme === "night" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
    </button>
  );
}
