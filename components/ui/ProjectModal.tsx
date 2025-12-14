"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
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
  SiCss3,
  SiHtml5,

} from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";
import { JSX } from "react";

/* ================= TYPES ================= */

interface Project {
  title: string;
  description: string;
  live: string;
  github: string;
  tech: string[];
}

interface ProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  project: Project | null;
}

/* ================= ICON MAP ================= */

const techIcons: Record<string, JSX.Element> = {
  React: <SiReact className="text-sky-400" />,
  Nextjs: <SiNextdotjs className="text-white" />,
  Tailwind: <SiTailwindcss className="text-cyan-400" />,
  MySQL: <SiMysql className="text-blue-400" />,
  Firebase: <SiFirebase className="text-yellow-400" />,
  ReactNative: <FaMobileAlt className="text-purple-400" />,
  Stripe: <SiStripe className="text-indigo-400" />,
  Typescript: <SiTypescript className="text-blue-400" />,
  Django: <SiDjango className="text-green-400" />,
  Python: <SiPython className="text-yellow-400" />,
  Javascript: <SiJavascript className="text-yellow-400" />,
  CSS: <SiCss3 className="text-blue-400" />,
  HTML: <SiHtml5 className="text-orange-400" />,
};

/* ================= COMPONENT ================= */

export default function ProjectModal({
  open,
  setOpen,
  project,
}: ProjectModalProps) {
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
          className="space-y-5"
        >
          {/* Description */}
          <p className="text-muted-foreground">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div>
            <p className="text-sm font-medium mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 px-3 py-1 rounded-full
                             bg-white/5 border border-white/10 text-sm"
                >
                  <span className="text-lg">
                    {techIcons[tech]}
                  </span>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
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
