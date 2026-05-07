"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiFirebase,
  SiStripe,
  SiTypescript,
  SiDjango,
  SiPython,
  SiJavascript,
  SiHtml5,
} from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";
import { LuImageOff, LuX, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { JSX } from "react";
import type { Project } from "@/constants/constants";

/* ================= TYPES ================= */
interface ProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  project: Project | null;
}

/* ================= ICON MAP ================= */
const techIcons: Record<string, JSX.Element> = {
  React: <SiReact className="text-sky-400" />,
  Nextjs: <SiNextdotjs className="text-foreground" />,
  Tailwind: <SiTailwindcss className="text-cyan-400" />,
  MySQL: <SiMysql className="text-blue-400" />,
  Firebase: <SiFirebase className="text-yellow-400" />,
  ReactNative: <FaMobileAlt className="text-purple-400" />,
  Stripe: <SiStripe className="text-indigo-400" />,
  Typescript: <SiTypescript className="text-blue-400" />,
  Django: <SiDjango className="text-green-400" />,
  Python: <SiPython className="text-yellow-400" />,
  Javascript: <SiJavascript className="text-yellow-400" />,
  CSS: <SiTailwindcss className="text-cyan-400" />,
  HTML: <SiHtml5 className="text-orange-400" />,
};

/* ================= COMPONENT ================= */
export default function ProjectModal({ open, setOpen, project }: ProjectModalProps) {
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'features'>('problem');
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  if (!project) return null;

  const images = project.images.filter(img => img && img.trim() !== "");
  const hasImages = images.length > 0;

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setIndex(i => (i + 1) % images.length);

  // Keyboard navigation for fullscreen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!fullscreenOpen) return;
      if (e.key === "Escape") setFullscreenOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullscreenOpen, images.length]);

  // Swipe on mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > 50) prev();
    else if (diff < -50) next();
    setStartX(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl md:max-w-4xl bg-background border border-border p-6 max-h-[90vh] overflow-y-auto shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          </DialogHeader>

          <motion.div className="space-y-6">
            {hasImages ? (
              <div
                className="relative flex items-center justify-center border border-border rounded-xl h-[250px] md:h-[400px] bg-muted/30 overflow-hidden cursor-zoom-in"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => setFullscreenOpen(true)}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-foreground/80 text-3xl p-2 bg-background/50 hover:bg-background/80 backdrop-blur rounded-full z-10 transition-all border border-border shadow-sm"
                >
                  <LuChevronLeft />
                </button>

                <Image
                  src={`/${images[index]}`}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-contain md:object-scale-down rounded-lg select-none"
                />

                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-foreground/80 text-3xl p-2 bg-background/50 hover:bg-background/80 backdrop-blur rounded-full z-10 transition-all border border-border shadow-sm"
                >
                  <LuChevronRight />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[250px] border border-border rounded-xl bg-muted/50">
                <LuImageOff className="text-4xl mb-2 opacity-50" />
                <p className="text-muted-foreground">No preview available</p>
              </div>
            )}

            {hasImages && (
              <div className="flex justify-center gap-2 mt-2">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-primary w-4" : "bg-primary/20"}`}
                  />
                ))}
              </div>
            )}

            <p className="text-muted-foreground leading-relaxed">{project.description}</p>

            <div className="flex gap-2 mb-2 flex-wrap p-1 bg-muted/50 rounded-full w-fit border border-border">
              <button
                onClick={() => setActiveTab('problem')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'problem' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Problem
              </button>
              <button
                onClick={() => setActiveTab('solution')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'solution' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Solution
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'features' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Features
              </button>
            </div>

            <div className="bg-muted/30 border border-border rounded-xl p-5 text-sm text-muted-foreground leading-relaxed">
              {activeTab === 'problem' && <p>{project.problem}</p>}
              {activeTab === 'solution' && <p>{project.solution}</p>}
              {activeTab === 'features' && (
                <ul className="grid gap-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 py-2 px-4 bg-muted/50 rounded-lg border border-border w-fit">
                <span className="text-xs font-bold uppercase tracking-wider opacity-50">Role:</span>
                <span className="text-sm font-semibold">{project.role}</span>
              </div>
              
              {project.soldTo && (
                <div className="flex items-center gap-2 py-2 px-4 bg-primary/10 text-primary rounded-lg border border-primary/20 w-fit">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70">Sold to:</span>
                  <span className="text-sm font-semibold">{project.soldTo}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <div key={t} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-medium shadow-sm">
                  {techIcons[t]} {t}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
              {project.live && (
                <a href={project.live} target="_blank" className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all shadow-md">
                  Live Demo
                </a>
              )}
              <a href={project.github} target="_blank" className="px-6 py-2.5 bg-background border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-all shadow-sm">
                GitHub Repository
              </a>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {fullscreenOpen && hasImages && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setFullscreenOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-50 transition-colors"
            >
              <LuX />
            </button>

            <button
              onClick={prev}
              className="absolute left-6 text-white/50 hover:text-white text-5xl z-50 hidden md:block transition-all"
            >
              <LuChevronLeft />
            </button>

            <button
              onClick={next}
              className="absolute right-6 text-white/50 hover:text-white text-5xl z-50 hidden md:block transition-all"
            >
              <LuChevronRight />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[85vh] max-w-[90vw]"
              >
                <Image
                  src={`/${images[index]}`}
                  alt={`Full Image ${index + 1}`}
                  width={2000}
                  height={1200}
                  className="object-contain select-none rounded-lg shadow-2xl"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-10 text-white/40 text-xs tracking-widest uppercase md:hidden">
              Swipe to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
