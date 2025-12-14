"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "@/components/ui/ProjectModal";
import ImageModal from "@/components/ui/ImageModal";
import JournalModal from "@/components/ui/JournalModal";
import { projects, certificates, gallery, journal } from "@/constants/constants";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const [journalOpen, setJournalOpen] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<typeof journal[0] | null>(null);

  return (
    <main className="max-w-6xl mx-auto px-4 pt-16 scroll-smooth">

      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* LEFT: TEXT */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Hi, I’m Alfred Mari Infiesto Cada
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            IT student focused on modern web development, clean UI,
            and real-world projects. Aspiring Full-Stack Developer.
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-md bg-white text-black font-medium hover:opacity-90 transition"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-md border border-white/20 hover:bg-white/10 transition"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* RIGHT: FLOATING IMAGE */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end"
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(56,189,248,0.15)]">
            <Image
              src="/profile.jpg"
              alt="Profile picture"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="min-h-screen py-20">
        <h2 className="text-3xl font-semibold mb-10">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => { setSelected(project); setOpen(true); }}
              className="cursor-pointer rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm">
                Click to view details
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECT MODAL */}
      {selected && <ProjectModal open={open} setOpen={setOpen} project={selected} />}

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="min-h-screen py-20">
        <h2 className="text-3xl font-semibold mb-4">About Me</h2>
        <p className="text-muted-foreground max-w-2xl">
          I’m an IT student passionate about building modern web applications
          with clean design, smooth animations, and real-world functionality.
        </p>
      </section>

      {/* ================= CERTIFICATES SECTION ================= */}
      <section id="certificates" className="min-h-screen py-20">
        <h2 className="text-3xl font-semibold mb-8">Certificates</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              onClick={() => { setSelectedImage(cert); setImageOpen(true); }}
              className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur p-2 cursor-pointer hover:scale-105 transition"
            >
              <Image
                src={`/${cert.src}`}
                alt={cert.alt}
                width={300}
                height={200}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section id="gallery" className="min-h-screen py-20">
        <h2 className="text-3xl font-semibold mb-8">Gallery</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {gallery.map((img, index) => (
            <div
              key={index}
              onClick={() => { setSelectedImage(img); setImageOpen(true); }}
              className="rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition"
            >
              <Image
                src={`/${img.src}`}
                alt={img.alt}
                width={300}
                height={200}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= IMAGE MODAL ================= */}
      {selectedImage && (
        <ImageModal
          open={imageOpen}
          setOpen={setImageOpen}
          src={selectedImage.src}
          alt={selectedImage.alt}
        />
      )}

      {/* ================= JOURNAL SECTION ================= */}
      <section id="journal" className="min-h-screen py-20">
        <h2 className="text-3xl font-semibold mb-8">Journal</h2>
        <div className="space-y-6 max-w-3xl">
          {journal.map((entry, index) => (
            <div
              key={index}
              onClick={() => { setSelectedJournal(entry); setJournalOpen(true); }}
              className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur flex flex-col md:flex-row gap-4 cursor-pointer hover:scale-105 transition"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-full md:w-48 h-32 relative rounded-md overflow-hidden">
                <Image
                  src={`/${entry.img}`}
                  alt={entry.company}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{entry.day}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">{entry.company}</span> — {entry.date}
                </p>
                <p className="text-muted-foreground">{entry.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= JOURNAL MODAL ================= */}
      {selectedJournal && (
        <JournalModal
          open={journalOpen}
          setOpen={setJournalOpen}
          entry={selectedJournal}
        />
      )}

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="min-h-screen py-20">
        <h2 className="text-3xl font-semibold mb-8">Contact</h2>
        <form className="max-w-md space-y-4">
          <input
            className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2"
            placeholder="Your name"
          />
          <input
            className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2"
            placeholder="Your email"
          />
          <textarea
            className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2"
            placeholder="Message"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-white text-black font-medium hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
