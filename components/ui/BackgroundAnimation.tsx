"use client";

import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "@/lib/hooks/use-theme";
import { useBgAnimation } from "@/lib/context/bg-animation-context";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundAnimation() {
  const { isDark } = useTheme();
  const { isBgAnimActive } = useBgAnimation();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!isBgAnimActive) return null;

  // Theme-specific colors
  const particleColor = isDark ? ["#ffffff", "#3b82f6", "#8b5cf6"] : ["#000000", "#1e40af", "#7c3aed"];
  const linkColor = isDark ? "#ffffff" : "#000000";

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              background: {
                color: { value: "transparent" },
              },
              fpsLimit: 120,
              particles: {
                color: { value: particleColor },
                links: {
                  color: linkColor,
                  distance: 180,
                  enable: true,
                  opacity: isDark ? 0.25 : 0.15, // Slightly lower opacity for black links to keep it clean
                  width: 1.5,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: false,
                  speed: 1.2,
                  straight: false,
                },
                number: {
                  density: { enable: true, area: 800 },
                  value: 80,
                },
                opacity: {
                  value: { min: 0.1, max: 0.5 },
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 4 },
                },
              },
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: "grab",
                  },
                },
                modes: {
                  grab: {
                    distance: 200,
                    links: { opacity: 0.5 },
                  },
                },
              },
              detectRetina: true,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
