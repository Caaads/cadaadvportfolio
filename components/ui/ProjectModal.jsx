"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function ProjectModal({ open, setOpen, project }) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl bg-background border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground mb-4">
            {project.description}
          </p>

          <div className="flex gap-3">
            <a
              href={project.live}
              target="_blank"
              className="px-4 py-2 bg-white text-black rounded-md text-sm"
            >
              Live Demo
            </a>

            <a
              href={project.github}
              target="_blank"
              className="px-4 py-2 border border-white/20 rounded-md text-sm"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
