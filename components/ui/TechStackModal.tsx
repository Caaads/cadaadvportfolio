"use client";

import { techStack } from "@/constants/techStack";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TechStackModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function TechStackModal({ open, setOpen }: TechStackModalProps) {
  const categories = {
    Frontend: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Javascript", "Shadcn UI", "Vanilla JS"],
    Backend: ["Node.js", "PHP", "Python", "Django", "Java"],
    Database: ["MySQL", "Firebase", "Supabase"],
    Tools: ["GitHub", "Vercel", "Android Studio", "Xampp", "API"],
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto border-white/10 bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Complete Tech Stack</DialogTitle>
        </DialogHeader>
        <div className="grid gap-8">
          {Object.entries(categories).map(([category, names]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2 opacity-80">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {techStack
                  .filter((tech) => names.includes(tech.name))
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                      <tech.icon className="text-3xl mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-medium text-center opacity-70 group-hover:opacity-100">{tech.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
