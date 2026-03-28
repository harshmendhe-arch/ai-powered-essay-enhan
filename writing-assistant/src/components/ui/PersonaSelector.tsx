"use client";

import React from "react";
import { usePersona } from "../layout/PersonaProvider";

export function PersonaSelector() {
  const { mode, setMode } = usePersona();

  return (
    <div className="flex items-center space-x-2 rounded-full border border-[var(--border-color)] p-1 bg-[var(--bg-secondary)] shadow-sm backdrop-blur">
      <button
        onClick={() => setMode("literature")}
        className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
          mode === "literature"
            ? "bg-[var(--accent-color)] text-[var(--accent-fg)] shadow-md"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        }`}
      >
        Literature Mode
      </button>
      <button
        onClick={() => setMode("engineer")}
        className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
          mode === "engineer"
            ? "bg-[var(--accent-color)] text-[var(--accent-fg)] shadow-md"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        }`}
      >
        Engineer Mode
      </button>
    </div>
  );
}
