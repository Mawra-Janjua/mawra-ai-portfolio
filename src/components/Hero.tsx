"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Award, GraduationCap, Github, Linkedin, MapPin, Sparkles } from "lucide-react";
import { education, profile } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.08, ease }}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-blush pb-20 pt-32 sm:pb-28 sm:pt-40">
      {/* Floating pink decorations */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 animate-float-slow rounded-full bg-rose/50 blur-3xl" />
        <div className="absolute -right-16 top-10 h-96 w-96 animate-float rounded-full bg-rose-soft blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 animate-float-slow rounded-full bg-rose/30 blur-3xl" />
        <div className="absolute left-[8%] top-[62%] hidden h-3 w-3 animate-float rounded-full bg-rose-deep sm:block" />
        <div className="absolute right-[12%] top-[28%] hidden h-2 w-2 animate-float-slow rounded-full bg-rose-deep sm:block" />
      </div>

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="chip mb-6"
          >
            <Sparkles size={14} className="text-rose-deep" />
            {profile.role}
          </motion.p>

          <h1 className="font-display text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
            <AnimatedWords text="Hi, I'm Mawra —" delay={0.1} />
            <br />
            <AnimatedWords text="building thoughtful" className="italic" delay={0.35} />{" "}
            <span className="relative inline-block">
              <AnimatedWords text="AI software." delay={0.55} />
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 -z-10 h-4 w-full origin-left rounded-full bg-rose/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1, ease }}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary">
              View projects <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
            <div className="ml-1 flex items-center gap-2">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="grid h-11 w-11 place-items-center rounded-full border border-rose-line bg-white text-ink transition hover:-translate-y-0.5 hover:bg-rose-soft"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="grid h-11 w-11 place-items-center rounded-full border border-rose-line bg-white text-ink transition hover:-translate-y-0.5 hover:bg-rose-soft"
              >
                <Github size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="card relative overflow-hidden p-8">
            <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose-soft" />
            <div className="relative grid h-24 w-24 place-items-center rounded-full bg-linear-to-br from-rose to-rose-soft font-display text-4xl font-bold text-ink ring-8 ring-blush">
              MJ
            </div>
            <h2 className="relative mt-6 font-display text-3xl font-semibold text-ink">{profile.name}</h2>
            <p className="relative mt-1 text-sm font-medium text-ink-muted">{profile.role}</p>
            <ul className="relative mt-6 space-y-3 text-sm text-ink">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-rose-deep" /> {profile.location}
              </li>
              <li className="flex items-center gap-3">
                <GraduationCap size={16} className="text-rose-deep" /> {education.degree}
              </li>
              <li className="flex items-center gap-3">
                <Award size={16} className="text-rose-deep" /> CGPA {education.cgpa}
              </li>
            </ul>
          </div>

          <motion.div
            className="card absolute -left-6 -top-5 px-4 py-2.5 text-xs font-semibold text-ink sm:-left-10"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            🏆 FYP · 3rd Position
          </motion.div>
          <motion.div
            className="card absolute -bottom-5 -right-3 px-4 py-2.5 text-xs font-semibold text-ink sm:-right-8"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            Python · TensorFlow · NLP
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink-muted sm:block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
