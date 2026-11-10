"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Hand, FileSearch, LineChart, Trophy } from "lucide-react";
import { featuredProjects, profile, type Project } from "@/lib/data";
import { Section } from "./ui";

const icons = [Hand, FileSearch, LineChart];

function TiltCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });
  const Icon = icons[index % icons.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`card group relative flex flex-col overflow-hidden p-7 transition-shadow duration-300 hover:shadow-lift sm:p-8 ${
        index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
      }`}
    >
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-soft transition-transform duration-500 group-hover:scale-125"
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose text-ink">
          <Icon size={22} />
        </span>
        <span className="chip">{project.label}</span>
      </div>
      <h3 className="relative mt-6 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
        {project.title}
      </h3>
      {project.highlight && (
        <p className="relative mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-rose-soft px-3 py-1.5 text-sm font-semibold text-ink">
          <Trophy size={15} /> {project.highlight}
        </p>
      )}
      <p className="relative mt-4 leading-relaxed text-ink-muted">{project.description}</p>
      <ul className="relative mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li key={t} className="rounded-full border border-rose-line bg-blush px-3 py-1 text-xs font-medium text-ink">
            {t}
          </li>
        ))}
      </ul>
      <a
        href={profile.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-ink underline decoration-rose-deep decoration-2 underline-offset-4 transition-colors hover:decoration-ink"
      >
        View on GitHub <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured projects"
      title="Selected work."
      intro="Academic and personal projects in computer vision, NLP and machine learning."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <TiltCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
