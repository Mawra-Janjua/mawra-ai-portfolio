"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Database, Wrench } from "lucide-react";
import { skillGroups } from "@/lib/data";
import { Section, fadeUp, stagger } from "./ui";

const icons = [Code2, Brain, Database, Wrench];

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I work with."
      intro="A foundation across programming, machine learning, data and web development."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((g, gi) => {
          const Icon = icons[gi % icons.length];
          return (
            <motion.div
              key={g.title}
              className="card group p-7 transition-shadow duration-300 hover:shadow-lift"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-soft text-ink transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon size={20} />
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink">{g.title}</h3>
              </motion.div>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {g.items.map((s) => (
                  <motion.li
                    key={s}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    className="rounded-full border border-rose-line bg-blush px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-rose-deep hover:bg-rose-soft"
                  >
                    {s}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
