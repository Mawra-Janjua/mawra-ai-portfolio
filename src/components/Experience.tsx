"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Check } from "lucide-react";
import { experience } from "@/lib/data";
import { Reveal, Section } from "./ui";

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've been building." tone="white">
      <ol ref={ref} className="relative ml-3 max-w-3xl space-y-10 sm:ml-5">
        <span aria-hidden className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-rose-line" />
        <motion.span
          aria-hidden
          style={{ scaleY: lineScale }}
          className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-rose-deep"
        />
        {experience.map((item, i) => (
          <li key={item.title} className="relative pl-10 sm:pl-12">
            <span
              aria-hidden
              className="absolute -left-[13px] top-1 grid h-[26px] w-[26px] place-items-center rounded-full border border-rose-line bg-white"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${item.current ? "animate-pulse bg-rose-deep" : "bg-rose"}`} />
            </span>
            <Reveal delay={i * 0.1} className="card p-7 transition-shadow duration-300 hover:shadow-lift sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip !bg-rose-soft">{item.period}</span>
                {item.current && <span className="chip">Ongoing</span>}
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">{item.title}</h3>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-ink-muted">
                <Briefcase size={14} /> {item.place}
              </p>
              <ul className="mt-5 space-y-2.5">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-3 text-ink-muted">
                    <Check size={16} className="mt-1 shrink-0 text-rose-deep" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
