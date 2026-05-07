"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { certificates } from "@/constants/constants";
import { LuX, LuChevronLeft, LuChevronRight, LuZoomIn } from "react-icons/lu";

interface Certificate {
  src: string;
  alt: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

interface CertificateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  certificate: Certificate;
}

export default function CertificateModal({ open, setOpen, certificate }: CertificateModalProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const idx = certificates.findIndex((c) => c.src === certificate.src);
    if (idx !== -1) setCurrentIndex(idx);
  }, [certificate]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % certificates.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 50) prev();
    else if (info.offset.x < -50) next();
  };

  const currentCert = certificates[currentIndex] || certificate;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full rounded-2xl p-6 bg-background border border-border shadow-2xl overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{currentCert.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Issued by <span className="font-semibold text-foreground">{currentCert.issuer}</span> on {currentCert.date}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <motion.div
              key={currentCert.src}
              className="w-full h-80 md:h-96 relative group cursor-zoom-in rounded-xl overflow-hidden border border-border bg-muted/30"
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setFullscreen(true);
                setOpen(false);
              }}
            >
              <Image
                src={`/${currentCert.src}`}
                alt={currentCert.alt}
                fill
                className="object-contain p-2"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <LuZoomIn className="text-white opacity-0 group-hover:opacity-100 text-3xl transition-opacity" />
              </div>
            </motion.div>
          </div>

          {currentCert.description && (
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-4">
              &quot;{currentCert.description}&quot;
            </p>
          )}

          <div className="mt-8 flex justify-end">
            <button
              className="px-6 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-all border border-border"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setFullscreen(false)} />

            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-50 transition-colors"
            >
              <LuX />
            </button>

            <button
              className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <LuChevronLeft className="text-2xl" />
            </button>
            <button
              className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <LuChevronRight className="text-2xl" />
            </button>

            <motion.div
              className="relative w-auto max-w-[90vw] max-h-[85vh] select-none"
              key={certificates[currentIndex].src}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src={`/${certificates[currentIndex].src}`}
                alt={certificates[currentIndex].alt}
                width={1200}
                height={800}
                className="object-contain rounded-lg shadow-2xl"
                priority
              />
            </motion.div>

            <div className="absolute bottom-10 text-white/50 text-xs tracking-widest uppercase">
              {isMobile ? "Swipe to navigate" : "Use arrows or swipe to navigate"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
