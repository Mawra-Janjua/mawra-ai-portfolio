import { ArrowDown, ArrowRight, Bot, Database, Inbox, Send, UserCheck, Workflow } from "lucide-react";
import type { AutomationProjectDetail } from "@/lib/automation-projects";

type Props = { title: string; architecture: AutomationProjectDetail["architecture"] };

function Column({ icon: Icon, label, items, tone = "white" }: { icon: typeof Inbox; label: string; items: string[]; tone?: "white" | "rose" | "blush" }) {
  const bg = tone === "rose" ? "bg-rose-soft" : tone === "blush" ? "bg-blush" : "bg-white";
  return (
    <div className={`min-w-0 flex-1 rounded-2xl border border-rose-line ${bg} p-4`}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
        <Icon size={15} className="shrink-0 text-ink" aria-hidden /> {label}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="rounded-xl border border-rose-line bg-white px-3 py-2 text-sm leading-snug text-ink">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex shrink-0 items-center justify-center text-rose-deep" aria-hidden>
      <ArrowDown size={20} className="lg:hidden" />
      <ArrowRight size={20} className="hidden lg:block" />
    </div>
  );
}

/** Left-to-right component diagram on desktop, top-to-bottom on phones. */
export function ArchitectureDiagram({ title, architecture: a }: Props) {
  return (
    <figure className="rounded-3xl border border-rose-line bg-blush p-4 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <Column icon={Inbox} label="Inputs" items={a.inputs} />
        <Arrow />
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <Column icon={Workflow} label="Orchestration" items={["n8n workflow"]} tone="rose" />
          <Column icon={Database} label="Backend API" items={["Node.js + TypeScript", "Validation · SQLite"]} tone="rose" />
        </div>
        <Arrow />
        <Column icon={Bot} label="AI & services" items={a.services} />
        <Arrow />
        <Column icon={UserCheck} label="Human control" items={[a.review]} tone="rose" />
        <Arrow />
        <Column icon={Send} label="Outputs" items={a.outputs} />
      </div>
      <figcaption className="mt-4 text-sm text-ink-muted">
        {title}: data enters from the inputs, n8n passes it to the backend API, the backend calls Claude and other services, and results reach the
        outputs only after the human-control step.
      </figcaption>
    </figure>
  );
}
