"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface JournalModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  entry: { img: string; company: string; date: string; day: string; text: string } | null;
}

export default function JournalModal({ open, setOpen, entry }: JournalModalProps) {
  const [fullImageOpen, setFullImageOpen] = useState(false);

  if (!entry) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl bg-background border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl">{entry.day}</DialogTitle>
          </DialogHeader>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            {/* Journal Image */}
            <div
              className="cursor-pointer mb-4 w-full h-64 relative rounded-md overflow-hidden"
              onClick={() => setFullImageOpen(true)}
            >
              <img src={`/${entry.img}`} alt={entry.company} className="object-cover w-full h-full rounded-md" />
            </div>

            {/* Company & Date */}
            <p className="text-muted-foreground mb-2">
              <span className="font-medium">{entry.company}</span> — {entry.date}
            </p>

            {/* Text */}
            <p className="text-muted-foreground">{entry.text}</p>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Journal Image */}
      <ImageModal
        open={fullImageOpen}
        setOpen={setFullImageOpen}
        src={entry.img}
        alt={entry.company}
      />
    </>
  );
}
