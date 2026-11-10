"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { certifications } from "@/lib/data";
import { Section, fadeUp, stagger } from "./ui";

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Always learning.">
      <motion.ul
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        {certifications.map((c) => (
          <motion.li
            key={c.title}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="card group flex items-start gap-4 p-6 transition-shadow duration-300 hover:shadow-lift"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-soft text-ink transition-colors duration-300 group-hover:bg-rose">
              <BadgeCheck size={20} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">{c.issuer}</p>
              <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-ink">{c.title}</h3>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
