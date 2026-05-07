"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";

interface ImageModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  src: string;
  alt: string;
}

export default function ImageModal({ open, setOpen, src, alt }: ImageModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl bg-background border border-border p-6 shadow-2xl rounded-2xl overflow-hidden">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">{alt}</DialogTitle>
            </DialogHeader>

            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted/30 border border-border"
            >
              <Image
                src={`/${src}`}
                alt={alt}
                fill
                className="object-contain p-2"
                priority
              />
            </motion.div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-all border border-border"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
