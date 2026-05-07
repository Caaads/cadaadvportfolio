"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface BgAnimationContextType {
  isBgAnimActive: boolean;
  toggleBgAnim: () => void;
}

const BgAnimationContext = createContext<BgAnimationContextType | undefined>(undefined);

export function BgAnimationProvider({ children }: { children: React.ReactNode }) {
  const [isBgAnimActive, setIsBgAnimActive] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("bg-animation-active");
    if (saved !== null) {
      setIsBgAnimActive(saved === "true");
    }
  }, []);

  const toggleBgAnim = () => {
    setIsBgAnimActive((prev) => {
      const newVal = !prev;
      localStorage.setItem("bg-animation-active", String(newVal));
      return newVal;
    });
  };

  return (
    <BgAnimationContext.Provider value={{ isBgAnimActive, toggleBgAnim }}>
      {children}
    </BgAnimationContext.Provider>
  );
}

export function useBgAnimation() {
  const context = useContext(BgAnimationContext);
  if (context === undefined) {
    throw new Error("useBgAnimation must be used within a BgAnimationProvider");
  }
  return context;
}
