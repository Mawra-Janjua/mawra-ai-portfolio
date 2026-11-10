"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, CircleDashed, FlaskConical, Github, Workflow } from "lucide-react";
import { automationProjects, type AutomationProject } from "@/lib/data";
import { Section } from "./ui";

function WorkflowNodes({ steps, planned }: { steps: string[]; planned: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center" aria-label={`${planned ? "Planned workflow" : "Workflow"}: ${steps.join(", then ")}`} role="img">
      {steps.map((s, i) => (
        <Fragment key={s}>
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i, type: "spring", stiffness: 260, damping: 18 }}
          >
            <motion.span
              className="grid h-9 w-9 place-items-center rounded-full border border-rose-deep bg-white text-xs font-bold text-ink"
              animate={reduce ? undefined : { boxShadow: ["0 0 0 0 rgba(231,154,182,0)", "0 0 0 6px rgba(231,154,182,0.25)", "0 0 0 0 rgba(231,154,182,0)"] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
            >
              {i + 1}
            </motion.span>
            <span className="text-[11px] font-medium text-ink-muted">{s}</span>
          </motion.div>
          {i < steps.length - 1 && <span aria-hidden className="flow-line mb-6 h-0.5 flex-1 animate-flow" />}
        </Fragment>
      ))}
    </div>
  );
}

const STATUS = {
  completed: { label: "Completed", icon: CheckCircle2, cls: "bg-rose" },
  built: { label: "Code complete · tests passing", icon: FlaskConical, cls: "bg-rose-soft border border-rose-line" },
  "in-progress": { label: "In progress", icon: CircleDashed, cls: "border border-dashed border-rose-deep bg-white" },
} as const;

function AutomationCard({ p, index }: { p: AutomationProject; index: number }) {
  const done = p.status !== "in-progress";
  const status = STATUS[p.status];
  const StatusIcon = status.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="card group relative flex flex-col p-7 transition-shadow duration-300 focus-within:shadow-lift hover:shadow-lift"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-soft text-ink">
          <Workflow size={20} />
        </span>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink ${status.cls}`}>
          <StatusIcon size={13} className={p.status === "in-progress" ? "animate-spin [animation-duration:4s]" : undefined} />
          {status.label}
        </span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
        {/* The stretched link makes the whole card clickable while keeping one accessible link. */}
        <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:rounded-3xl after:content-['']">
          {p.title}
        </Link>
      </h3>
      <p className="mt-2 leading-relaxed text-ink-muted">{p.description}</p>
      <div className="mt-auto pt-7">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          {done ? "Workflow" : "Planned workflow"}
        </p>
        <WorkflowNodes steps={p.steps} planned={!done} />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-rose-deep decoration-2 underline-offset-4 transition-colors group-hover:decoration-ink">
            View project, architecture &amp; demo <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </p>
          {/* Sits above the card's stretched link so it stays separately clickable. */}
          <a
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.title} source code on GitHub`}
            className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-rose-line bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-rose-deep hover:bg-rose-soft"
          >
            <Github size={14} /> GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Automation() {
  return (
    <Section
      id="automation"
      eyebrow="AI automation"
      title="AI automation projects."
      intro="Four working automation systems built with Claude, n8n and TypeScript. Each card opens the architecture, setup, test results and a live demo. Projects are marked completed only after they have been verified end-to-end with real services."
      tone="white"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {automationProjects.map((p, i) => (
          <AutomationCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
