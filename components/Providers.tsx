"use client";

import { BgAnimationProvider } from "@/lib/context/bg-animation-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BgAnimationProvider>
      {children}
    </BgAnimationProvider>
  );
}
