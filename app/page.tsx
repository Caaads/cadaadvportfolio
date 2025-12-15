"use client";

import Image from "next/image";
import { motion, AnimatePresence  } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProjectModal from "@/components/ui/ProjectModal";
import ImageModal from "@/components/ui/ImageModal";
import JournalModal from "@/components/ui/JournalModal";
import { projects, certificates, gallery, journal, education} from "@/constants/constants";
import TechStackSlider from "@/components/ui/TechStackSlider";
import PortfolioLoader from "@/components/ui/PortfolioLoader";
import EducationTimeline from "@/components/ui/EducationalTimeline";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const [journalOpen, setJournalOpen] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<typeof journal[0] | null>(null);

  const [loading, setLoading] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
const aboutImages = [
  { src: "/profile.jpg", caption: "Focused on clean UI and real-world systems" },
  { src: "/profile2.jpg", caption: "Achieving excellence in every project" },
  { src: "/profile3.jpg", caption: "Exploring tech with creativity" },
  { src: "/profile4.jpg", caption: "Fitness, discipline, and consistency" },
];

const [aboutIndex, setAboutIndex] = useState(0);
const [aboutInView, setAboutInView] = useState(false);

const nextAbout = () =>
  setAboutIndex((prev) => (prev + 1) % aboutImages.length);

const prevAbout = () =>
  setAboutIndex((prev) =>
    prev === 0 ? aboutImages.length - 1 : prev - 1
  );

useEffect(() => {
  // Minimum delay before content loads (like your 1.5s or until image loads)
  const minTimer = setTimeout(() => setLoading(false), 1500);

  // Show skip button after 5s if still loading
  const skipTimer = setTimeout(() => {
    if (loading) setShowSkip(true);
  }, 5000);

  // Force hide preloader after 10s
  const maxTimer = setTimeout(() => setLoading(false), 10000);

  return () => {
    clearTimeout(minTimer);
    clearTimeout(skipTimer);
    clearTimeout(maxTimer);
  };
}, [loading]);

const galleryRef = useRef<HTMLDivElement>(null);
const [galleryWidth, setGalleryWidth] = useState(0);

useEffect(() => {
  if (galleryRef.current) {
    setGalleryWidth(galleryRef.current.scrollWidth - galleryRef.current.offsetWidth);
  }
}, [galleryRef.current, gallery.length]);

const scrollGallery = (direction: number) => {
  if (!galleryRef.current) return;
  const scrollAmount = 400; // adjust for card width
  galleryRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
};


  return (
        <>
      {/* ================= PRELOADER ================= */}
<AnimatePresence>
  {loading && (
    <div className="relative">
      <PortfolioLoader />
      <button
        onClick={() => setLoading(false)}
        className="absolute top-4 right-4 px-4 py-2 bg-white text-black rounded-md"
      >
        Skip
      </button>
    </div>
  )}
</AnimatePresence>

      {/* ================= MAIN SITE ================= */}
      {!loading && (
    <main className="max-w-6xl mx-auto px-4 pt-16 scroll-smooth">

      {/* ================= HERO SECTION ================= */}
      <motion.section
        id="hero"
        className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
      >
        <motion.div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Alfred Mari Infiesto Cada
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

        <motion.div
          className="flex-1 flex justify-center md:justify-end"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(56,189,248,0.15)]">
<Image
  src="/profile1.jpg"
  alt="Profile picture"
  fill
  className="object-cover"
  onLoad={() => setLoading(false)} // only hides loader after image loads
  priority
/>

          </div>
        </motion.div>
      </motion.section>
      
      <TechStackSlider />

      {/* ================= PROJECTS SECTION ================= */}
      <motion.section
        id="projects"
        className="min-h-screen py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
      >
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
              <p className="text-muted-foreground text-sm">Click to view details</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {selected && <ProjectModal open={open} setOpen={setOpen} project={selected} />}

      {/* ================= ABOUT SECTION ================= */}
      <motion.section
        id="about"
        className="min-h-screen py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
<motion.div
  className="flex-1 relative w-full h-80 md:h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-lg group"
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: false, amount: 0.5 }}
  onViewportEnter={() => setAboutInView(true)}
  onViewportLeave={() => setAboutInView(false)}
>
  {/* IMAGE */}
  <motion.img
    key={aboutIndex}
    src={aboutImages[aboutIndex].src}
    alt="About carousel"
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    onDragEnd={(_, info) => {
      if (info.offset.x < -50) nextAbout();
      if (info.offset.x > 50) prevAbout();
    }}
  />

  {/* CAPTION */}
  <motion.div
    key={`caption-${aboutIndex}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur px-4 py-2 rounded-md text-sm"
  >
    {aboutImages[aboutIndex].caption}
  </motion.div>

  {/* LEFT ARROW */}
  <button
    onClick={prevAbout}
    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
  >
    ‹
  </button>

  {/* RIGHT ARROW */}
  <button
    onClick={nextAbout}
    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
  >
    ›
  </button>

  {/* DOTS */}
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
    {aboutImages.map((_, i) => (
      <button
        key={i}
        onClick={() => setAboutIndex(i)}
        className={`h-2 w-2 rounded-full transition ${
          i === aboutIndex ? "bg-white" : "bg-white/40"
        }`}
      />
    ))}
  </div>
</motion.div>
          <div className="flex-1 space-y-6">
            <motion.h2
              className="text-3xl font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: false }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: false }}
            >
              I’m an IT student passionate about building modern web applications with clean design, smooth animations, and real-world functionality. Can work under pressure (barely).
            </motion.p>

            {/* Strengths, Journey, Interests */}
            {["Strengths", "Journey", "Interests"].map((title, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                viewport={{ once: false }}
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">
                  {title === "Strengths" &&
                    "Full-stack web development, Clean UI/UX design, Problem-solving, Tall Mestiza, Assurance, Lambing"}
                  {title === "Journey" &&
                    "Initially, I considered leaving college for DJ, bartender, barista careers, or exploring forensic science, engineering, or medical programs. Ultimately, I chose IT to blend creativity with technology."}
                  {title === "Interests" &&
                    "Passionate about web technologies, fitness, creative problem-solving, and exploring new tools to make applications interactive and user-friendly."}
                </p>
              </motion.div>
            ))}
            <EducationTimeline />
          </div>
        </div>
      </motion.section>

      {/* ================= CERTIFICATES SECTION ================= */}
      <motion.section
        id="certificates"
        className="min-h-screen py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
      >
        <h2 className="text-3xl font-semibold mb-8">Certificates</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              onClick={() => { setSelectedImage(cert); setImageOpen(true); }}
              className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur p-2 cursor-pointer hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={`/${cert.src}`}
                alt={cert.alt}
                width={300}
                height={200}
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

{/* ================= GALLERY SECTION ================= */}
<motion.section
  id="gallery"
  className="min-h-screen py-20"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: false }}
>
  <h2 className="text-3xl font-semibold mb-8">Gallery</h2>

  <div className="relative">
    <motion.div
      className="flex gap-4 overflow-hidden"
      ref={galleryRef}
      drag="x"
      dragConstraints={{ left: -galleryWidth, right: 0 }}
    >
      {gallery.map((img, index) => (
        <motion.div
          key={index}
          onClick={() => { setSelectedImage(img); setImageOpen(true); }}
          className="flex-shrink-0 w-64 h-40 md:w-72 md:h-48 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={`/${img.src}`}
            alt={img.alt}
            width={300}
            height={200}
            className="object-cover w-full h-full"
          />
        </motion.div>
      ))}

      {/* Duplicate items for infinite scroll effect */}
      {gallery.map((img, index) => (
        <motion.div
          key={`dup-${index}`}
          className="flex-shrink-0 w-64 h-40 md:w-72 md:h-48 rounded-xl overflow-hidden cursor-pointer opacity-0"
        />
      ))}
    </motion.div>

    {/* Left arrow */}
    <button
      onClick={() => scrollGallery(-1)}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/70 transition z-10"
    >
      ‹
    </button>

    {/* Right arrow */}
    <button
      onClick={() => scrollGallery(1)}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/70 transition z-10"
    >
      ›
    </button>
  </div>
</motion.section>
      {selectedImage && (
        <ImageModal
          open={imageOpen}
          setOpen={setImageOpen}
          src={selectedImage.src}
          alt={selectedImage.alt}
        />
      )}

      {/* ================= JOURNAL SECTION ================= */}
      <motion.section
        id="journal"
        className="min-h-screen py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
      >
        <h2 className="text-3xl font-semibold mb-8">
            Journal
        </h2>
        <div className="space-y-6 max-w-3xl">
          {journal.map((entry, index) => (
            <motion.div
              key={index}
              onClick={() => { setSelectedJournal(entry); setJournalOpen(true); }}
              className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur flex flex-col md:flex-row gap-4 cursor-pointer hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex-shrink-0 w-full md:w-48 h-32 relative rounded-md overflow-hidden">
                <Image
                  src={`/${entry.images[0]}`}
                  alt={entry.company}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{entry.day}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">{entry.company}</span> — {entry.date}
                </p>
                <p className="text-muted-foreground">{entry.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {selectedJournal && (
        <JournalModal
          open={journalOpen}
          setOpen={setJournalOpen}
          entry={selectedJournal}
        />
      )}

      {/* ================= CONTACT SECTION ================= */}
      <motion.section
        id="contact"
        className="min-h-screen py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
      >
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
      </motion.section>
    </main>
      )}
    </>
  );
}