"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type PersonaMode = "engineer" | "literature";

interface PersonaContextType {
  mode: PersonaMode;
  setMode: (mode: PersonaMode) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PersonaMode>("literature");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage for existing preference
    const saved = localStorage.getItem("personaMode") as PersonaMode;
    if (saved && (saved === "engineer" || saved === "literature")) {
      setMode(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("personaMode", mode);
    
    // Apply dynamic classes to document body/html to change the entire application feel
    const htmlRef = document.documentElement;
    htmlRef.classList.remove("theme-engineer", "theme-literature");
    htmlRef.classList.add("theme-" + mode);
  }, [mode, mounted]);

  return (
    <PersonaContext.Provider value={{ mode, setMode }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return context;
}
