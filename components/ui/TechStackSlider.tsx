"use client";

import { useState } from "react";
import { techStack } from "@/constants/techStack";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import TechStackModal from "./TechStackModal";

export default function TechStackSlider() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="techstack" className="py-20 bg-background/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold">Tech Stack</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all font-medium text-xs md:text-sm"
          >
            View All
          </button>
        </div>

        <InfiniteSlider speed={50} gap={40}>
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:scale-110 transition-transform"
            >
              <tech.icon className="text-5xl mb-2" />
              <span className="text-sm font-medium text-muted-foreground">
                {tech.name}
              </span>
            </div>
          ))}
        </InfiniteSlider>
      </div>

      <TechStackModal open={modalOpen} setOpen={setModalOpen} />
    </section>
  );
}