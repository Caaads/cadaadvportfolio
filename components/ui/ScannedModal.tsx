import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuX, LuZoomIn, LuZoomOut, LuRotateCcw, LuDownload } from "react-icons/lu";

type ScannedModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  scan: {
    src: string;
    alt: string;
  };
};

export default function ScannedModal({ open, setOpen, scan }: ScannedModalProps) {
  const [zoom, setZoom] = useState(1);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          {/* Close button top right of screen */}
          <button 
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl transition-colors"
          >
            <LuX />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background rounded-2xl w-full max-w-5xl max-h-[90vh] p-6 flex flex-col shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ===== Controls ===== */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold">{scan.alt}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Scanned Document</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-all border border-border"
                  title="Zoom In"
                >
                  <LuZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-all border border-border"
                  title="Zoom Out"
                >
                  <LuZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-all border border-border"
                  title="Reset Zoom"
                >
                  <LuRotateCcw className="w-5 h-5" />
                </button>
                <a
                  href={`/${scan.src}`}
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-md hover:opacity-90 transition-all"
                >
                  <LuDownload className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>

            {/* ===== Image Container ===== */}
            <div className="flex-1 overflow-hidden flex items-center justify-center border border-border rounded-xl bg-muted/20 relative cursor-grab active:cursor-grabbing">
              <motion.div
                drag
                dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                style={{ scale: zoom }}
                className="relative w-full h-full"
              >
                <Image
                  src={`/${scan.src}`}
                  alt={scan.alt}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </motion.div>
              
              {/* Drag instruction overlay (only shows when zoomed) */}
              {zoom > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-background/80 backdrop-blur border border-border rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground pointer-events-none">
                  Drag to pan
                </div>
              )}
            </div>

            {/* ===== Footer ===== */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setOpen(false)}
                className="px-8 py-2.5 rounded-full bg-foreground text-background text-sm font-bold hover:opacity-90 transition-all"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
