"use client";

import Image from "next/image";
import { motion, AnimatePresence  } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProjectModal from "@/components/ui/ProjectModal";
import { projects, type Project, certificates, gallery, journal, education, scannedDocs} from "@/constants/constants";
import TechStackSlider from "@/components/ui/TechStackSlider";
import PortfolioLoader from "@/components/ui/PortfolioLoader";
import EducationTimeline from "@/components/ui/EducationalTimeline";
import LiveActivity from "@/components/ui/LiveActivity";
import Particles from "react-tsparticles";
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaDev } from "react-icons/fa";
import { cn } from "@/lib/utils";
import CertificateModal from "@/components/ui/certificatemodal";
import { useTheme } from "@/lib/hooks/use-theme";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
const [open, setOpen] = useState(false);
const [selected, setSelected] = useState<Project | null>(null);

const [loading, setLoading] = useState(true);
const [showSkip, setShowSkip] = useState(false);
const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
const [imageOpen, setImageOpen] = useState(false);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");

const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
const [certModalOpen, setCertModalOpen] = useState(false);

const [showAllProjects, setShowAllProjects] = useState(false);
const [showAllCertificates, setShowAllCertificates] = useState(false);
const [activeAboutTab, setActiveAboutTab] = useState<"about" | "education">("about");
const { isDark } = useTheme();

const aboutImages = [
  { src: "/profile.jpg", caption: "Focused on clean UI and real-world systems" },
  { src: "/profile2.jpg", caption: "Achieving excellence in every project" },
  { src: "/profile3.jpg", caption: "Exploring tech with creativity" },
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
const [isHovering, setIsHovering] = useState(false);

// Duplicate gallery for seamless loop
const infiniteGallery = [...gallery, ...gallery];

useEffect(() => {
  const el = galleryRef.current;
  if (!el) return;

  let animationFrame: number;

  const autoScroll = () => {
    if (!isHovering) {
      el.scrollLeft += 0.6; // speed (lower = slower)

      // Seamless reset
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
    }
    animationFrame = requestAnimationFrame(autoScroll);
  };

  animationFrame = requestAnimationFrame(autoScroll);

  return () => cancelAnimationFrame(animationFrame);
}, [isHovering]);
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
<main className="max-w-6xl mx-auto px-4 pt-16 scroll-smooth relative">
  {/* Background particles */}
  <Particles
    className="absolute inset-0 -z-10"
    options={{
      particles: {
        number: { value: 50 },
        size: { value: 3 },
        move: { speed: 0.5 },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" } },
      },
    }}
  />

<motion.section
  id="hero"
  className="min-h-screen flex flex-col md:flex-row justify-between gap-10 pt-50"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: false }}
>
  {/* Left side - Text */}
  <motion.div className="flex-1">
    <h1 className="text-5xl md:text-6xl font-bold mb-4">
      Alfred Mari Infiesto Cada
    </h1>
    <p className="text-lg text-muted-foreground mb-8 max-w-md">
      IT student focused on modern web development, clean UI,
      and real-world projects. Aspiring Full-Stack Developer.
    </p>

    {/* Buttons */}

    {/* Optional additional buttons */}
    <div className="flex gap-4 mt-4">
      <a
        href="#projects"
        className="px-6 py-3 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition"
      >
        View Projects
      </a>
      <a
        href="#contact"
        className="px-6 py-3 rounded-md border border-border hover:bg-muted transition"
      >
        Contact Me
      </a>
    </div>

    <LiveActivity />

    
  </motion.div>

  {/* Right side - Profile Image */}
  <motion.div
    className="flex-1 flex justify-center md:justify-end"
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="relative w-80 h-80 md:w-100 md:h-100 rounded-full overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(56,189,248,0.15)]">
      <Image
        src={isDark ? "/profile3.jpg" : "/profile2.jpg"}
        alt="Profile picture"
        fill
        className="object-cover"
        priority
      />
    </div>
  </motion.div>
</motion.section>

      {/* ================= TECH STACK SLIDER ================= */}
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
  <div className="flex items-center justify-between mb-10">
    <h2 className="text-3xl font-semibold">Projects</h2>
    {projects.length > 3 && (
      <button
        onClick={() => setShowAllProjects(!showAllProjects)}
        className="px-6 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all font-medium text-xs md:text-sm"
      >
        {showAllProjects ? "Show Less" : "View All"}
      </button>
    )}
  </div>
  <div className="grid md:grid-cols-3 gap-6">
    <AnimatePresence mode="popLayout">
      {projects.slice(0, showAllProjects ? projects.length : 3).map((project, index) => (
        <motion.div
          key={project.title}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ y: -10 }}
          transition={{ 
            type: "spring", 
            stiffness: 200,
            layout: { duration: 0.3 }
          }}
          onClick={() => { setSelected(project); setOpen(true); }}
          className="cursor-pointer rounded-xl border border-black/10 dark:border-white/10 bg-white/5 backdrop-blur p-6"
        >
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm">Click to view details</p>
        </motion.div>
      ))}
    </AnimatePresence>
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
    className="absolute bottom-6 left-6 right-6 bg-background/70 backdrop-blur-md px-4 py-2 rounded-md text-sm border border-border"
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
            <div className="flex gap-4 mb-6 border-b border-white/10">
              <button
                onClick={() => setActiveAboutTab("about")}
                className={cn(
                  "pb-2 text-xl font-semibold transition-all relative",
                  activeAboutTab === "about" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                About Me
                {activeAboutTab === "about" && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveAboutTab("education")}
                className={cn(
                  "pb-2 text-xl font-semibold transition-all relative",
                  activeAboutTab === "education" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Education
                {activeAboutTab === "education" && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeAboutTab === "about" ? (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <motion.p
                    className="text-muted-foreground"
                  >
                    I’m an IT student passionate about building modern web applications with clean design, smooth animations, and real-world functionality. Can work under pressure (barely).
                  </motion.p>

                  {/* Strengths, Journey, Interests */}
                  {["Strengths", "Journey", "Interests"].map((title, i) => (
                    <div key={i}>
                      <h3 className="text-xl font-semibold mb-2">{title}</h3>
                      <p className="text-muted-foreground">
                        {title === "Strengths" &&
                          "Full-stack web development, Clean UI/UX design, Problem-solving, Tall Mestiza, Assurance, Lambing"}
                        {title === "Journey" &&
                          "Initially, I considered leaving college for DJ, bartender, barista careers, or exploring forensic science, engineering, or medical programs. Ultimately, I chose IT to blend creativity with technology."}
                        {title === "Interests" &&
                          "Passionate about web technologies, fitness, creative problem-solving, and exploring new tools to make applications interactive and user-friendly."}
                      </p>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EducationTimeline />
                </motion.div>
              )}
            </AnimatePresence>
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
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-semibold">Certificates</h2>
    {certificates.length > 3 && (
      <button
        onClick={() => setShowAllCertificates(!showAllCertificates)}
        className="px-6 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all font-medium text-xs md:text-sm"
      >
        {showAllCertificates ? "Show Less" : "View All"}
      </button>
    )}
  </div>
  <div className="grid md:grid-cols-3 gap-6">
    <AnimatePresence mode="popLayout">
      {certificates.slice(0, showAllCertificates ? certificates.length : 3).map((cert, index) => (
        <motion.div
          key={cert.src}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={() => { setSelectedCertificate(cert); setCertModalOpen(true); }}
          className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/5 backdrop-blur p-2 cursor-pointer hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
          transition={{ 
            layout: { duration: 0.3 }
          }}
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
    </AnimatePresence>
  </div>
</motion.section>

{selectedCertificate && (
  <CertificateModal
    open={certModalOpen}
    setOpen={setCertModalOpen}
    certificate={selectedCertificate}
  />
)}


      {/* ================= CONTACT SECTION ================= */}
<motion.section
  id="contact"
  className="min-h-screen py-24"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <div className="grid md:grid-cols-2 gap-16 items-start">
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-4">Let&apos;s Connect</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <FaLinkedin className="text-xl" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-50">LinkedIn</p>
            <a href="https://www.linkedin.com/in/alfred-cada-67b97a370/" target="_blank" rel="noreferrer" className="font-medium hover:text-primary transition-colors">Alfred Cada</a>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <FaGithub className="text-xl" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-50">GitHub</p>
            <a href="https://github.com/Caaads" target="_blank" rel="noreferrer" className="font-medium hover:text-primary transition-colors">Caaads</a>
          </div>
        </div>
      </div>

      <div className="pt-8 flex gap-4">
        {[
          { icon: FaFacebook, href: "https://www.facebook.com/alfredmari.cada.1" },
          { icon: FaInstagram, href: "https://www.instagram.com/cadskieeee/" },
          { icon: FaDev, href: "https://dev.to/caaads" }
        ].map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
          >
            <social.icon />
          </a>
        ))}
      </div>
    </div>

    <div className="p-8 rounded-3xl bg-muted/30 border border-border shadow-sm">
      <form
        className="space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, message }),
            });
            if (res.ok) {
              alert("Message sent!");
              setName("");
              setEmail("");
              setMessage("");
            } else {
              alert("Failed to send message");
            }
          } catch (err) {
            console.error(err);
            alert("Error sending message");
          }
        }}
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Your Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-background border border-border px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-background border border-border px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
            placeholder="john@example.com"
            type="email"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl bg-background border border-border px-4 py-3 min-h-[150px] focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
            placeholder="Tell me about your project..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</motion.section>
    <BackToTop />
    </main>
      )}
    </>
  );
}