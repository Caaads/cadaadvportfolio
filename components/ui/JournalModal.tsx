"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import ImageModal from "./ImageModal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LuZoomIn } from "react-icons/lu";
import Image from "next/image";

interface JournalEntry {
  images: string[];
  company: string;
  date: string;
  day: string;
  text: string;
}

interface JournalModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  entry: JournalEntry | null;
}

export default function JournalModal({ open, setOpen, entry }: JournalModalProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [fullImageOpen, setFullImageOpen] = useState(false);

  if (!entry) return null;

  const nextImage = () =>
    setImageIndex((prev) => (prev + 1) % entry.images.length);

  const prevImage = () =>
    setImageIndex((prev) =>
      prev === 0 ? entry.images.length - 1 : prev - 1
    );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl bg-background border border-border shadow-2xl rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{entry.day}</DialogTitle>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* IMAGE VIEW */}
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border border-border bg-muted/30 group">
              <Image
                src={`/${entry.images[imageIndex]}`}
                alt={entry.company}
                fill
                onClick={() => setFullImageOpen(true)}
                className="object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 pointer-events-none bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <LuZoomIn className="text-white opacity-0 group-hover:opacity-100 text-3xl transition-opacity" />
              </div>

              {/* Navigation Arrows */}
              {entry.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/90 text-foreground p-2 rounded-full transition-all border border-border backdrop-blur-sm shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/90 text-foreground p-2 rounded-full transition-all border border-border backdrop-blur-sm shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/60 backdrop-blur-md border border-border rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground/70">
                {imageIndex + 1} / {entry.images.length}
              </div>
            </div>

            {/* META */}
            <div className="flex flex-col gap-1 border-l-4 border-primary/40 pl-4 py-1">
              <span className="text-sm font-bold text-foreground">{entry.company}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{entry.date}</span>
            </div>

            {/* BODY */}
            <div className="bg-muted/30 p-4 rounded-xl border border-border">
              <p className="text-muted-foreground leading-relaxed text-sm">{entry.text}</p>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* FULL IMAGE MODAL */}
      {fullImageOpen && (
        <ImageModal
          open={fullImageOpen}
          setOpen={setFullImageOpen}
          src={entry.images[imageIndex]}
          alt={entry.company}
        />
      )}
    </>
  );
}
