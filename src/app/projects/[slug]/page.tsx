import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Camera, CheckCircle2, FlaskConical, Github, ShieldCheck, Workflow } from "lucide-react";
import { automationDetails, getAutomationDetail } from "@/lib/automation-projects";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/ui";
import { ProjectDemo } from "@/components/projects/Demos";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return automationDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = getAutomationDetail((await params).slug);
  if (!p) return {};
  return { title: `${p.title} — ${profile.name}`, description: p.tagline };
}

function SectionCard({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section id={id} aria-labelledby={`${id}-title`} className="card p-6 sm:p-10">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          <span className="h-px w-8 bg-rose-deep" aria-hidden />
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="mb-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

function CodeLine({ children }: { children: string }) {
  return <code className="block overflow-x-auto whitespace-pre rounded-2xl border border-rose-line bg-blush px-4 py-3 font-mono text-xs text-ink sm:text-sm">{children}</code>;
}

/** Static shell shown instantly while the slug-specific content streams in. */
function ProjectSkeleton() {
  return (
    <main id="top" className="min-h-screen bg-blush" aria-busy="true">
      <div className="container-x space-y-6 pt-20">
        <div className="h-8 w-48 animate-pulse rounded-full bg-rose-soft" />
        <div className="h-14 w-full max-w-2xl animate-pulse rounded-3xl bg-rose-soft" />
        <div className="h-64 w-full animate-pulse rounded-3xl border border-rose-line bg-white" />
      </div>
    </main>
  );
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-rose-line bg-white/85 backdrop-blur-md">
        <nav className="container-x flex h-16 items-center justify-between" aria-label="Project">
          <Link href="/#automation" className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-ink-muted">
            <ArrowLeft size={16} /> All projects
          </Link>
          <Link href="/" className="font-display text-lg font-semibold text-ink">
            {profile.firstName} Janjua
          </Link>
        </nav>
      </header>
      <Suspense fallback={<ProjectSkeleton />}>
        <ProjectContent params={params} />
      </Suspense>
      <Footer />
    </>
  );
}

async function ProjectContent({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const p = getAutomationDetail((await params).slug);
  if (!p) notFound();

  return (
    <main id="top" className="bg-blush">
      <section className="relative overflow-hidden pb-12 pt-14 sm:pb-16 sm:pt-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-10 h-80 w-80 animate-float-slow rounded-full bg-rose-soft blur-3xl" />
        <div className="container-x relative">
          <Reveal>
            <p className="chip mb-5">
              <Workflow size={14} className="text-rose-deep" /> AI automation project
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">{p.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{p.tagline}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#demo" className="btn-primary">Try the demo</a>
              {p.repoPublished ? (
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Github size={16} /> Source on GitHub <ArrowUpRight size={15} />
                </a>
              ) : (
                <span className="chip">
                  <Github size={14} /> Repository publishing soon
                </span>
              )}
              <span className="chip">
                <CheckCircle2 size={14} /> {p.testing.total} automated tests passing
              </span>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-rose-line bg-white px-3 py-1 text-xs font-medium text-ink">{s}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="container-x space-y-8 pb-24">
        <SectionCard id="overview" eyebrow="Overview" title="What it does">
          <p className="max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">{p.overview}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-line bg-blush p-6">
              <h3 className="font-display text-2xl font-semibold text-ink">The problem</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{p.problem}</p>
            </div>
            <div className="rounded-2xl border border-rose-line bg-rose-soft p-6">
              <h3 className="font-display text-2xl font-semibold text-ink">The solution</h3>
              <p className="mt-2 leading-relaxed text-ink">{p.solution}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="features" eyebrow="Key features" title="Built for real workflows">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-rose-line bg-white p-5 transition-shadow duration-300 hover:shadow-soft">
                <h3 className="font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{f.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="architecture" eyebrow="Workflow architecture" title="How data flows">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {p.flow.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 rounded-2xl border border-rose-line bg-blush p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rose-deep bg-white text-sm font-bold text-ink">{i + 1}</span>
                <div>
                  <p className="font-semibold text-ink">{s.title}</p>
                  <p className="text-sm text-ink-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <h3 className="mt-8 flex items-center gap-2 font-semibold text-ink">
            <ShieldCheck size={18} /> Safeguards
          </h3>
          <ul className="mt-3 space-y-2">
            {p.safeguards.map((s) => (
              <li key={s} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-deep" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
          <h3 className="mt-8 font-semibold text-ink">n8n workflows (importable JSON)</h3>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {p.n8nWorkflows.map((w) => (
              <li key={w.file} className="rounded-2xl border border-rose-line bg-white p-4">
                <p className="font-mono text-xs font-semibold text-ink">n8n/{w.file}</p>
                <p className="mt-1 text-sm text-ink-muted">{w.detail}</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard id="screenshots" eyebrow="Screenshots" title="Workflow in action">
          {p.screenshots.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {p.screenshots.map((s) => (
                <figure key={s.src} className="overflow-hidden rounded-2xl border border-rose-line bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.alt} className="w-full" loading="lazy" />
                  <figcaption className="p-4 text-sm text-ink-muted">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="flex items-start gap-4 rounded-2xl border border-dashed border-rose-deep bg-blush p-6">
              <Camera size={22} className="mt-0.5 shrink-0 text-ink" />
              <p className="text-sm leading-relaxed text-ink-muted">
                No screenshots yet. Screenshots of the n8n workflow and the review interface will be added after the first live run with real credentials. This portfolio only shows real captures, never mock-ups.
              </p>
            </div>
          )}
        </SectionCard>

        <SectionCard id="demo" eyebrow="Interactive demo" title="Try it">
          <ProjectDemo slug={p.slug} />
        </SectionCard>

        <SectionCard id="setup" eyebrow="Setup" title="Run it yourself">
          <ol className="space-y-5">
            {p.setup.map((s, i) => (
              <li key={s.label} className="grid grid-cols-1 gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <p className="font-semibold text-ink">
                  <span className="mr-2 text-ink-muted">{i + 1}.</span>
                  {s.label}
                </p>
                <div className="min-w-0 space-y-1.5">
                  {s.command && <CodeLine>{s.command}</CodeLine>}
                  {s.note && <p className="text-sm text-ink-muted">{s.note}</p>}
                </div>
              </li>
            ))}
          </ol>
          <h3 className="mt-8 font-semibold text-ink">Integrations</h3>
          <ul className="mt-3 grid gap-3 md:grid-cols-3">
            {p.integrations.map((i) => (
              <li key={i.name} className="rounded-2xl border border-rose-line bg-white p-4">
                <p className="font-semibold text-ink">{i.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{i.required ? "Required" : "Optional"}</p>
                <p className="mt-1 text-sm text-ink-muted">{i.note}</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard id="testing" eyebrow="Testing" title={`${p.testing.total} automated tests`}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.4fr]">
            <div className="min-w-0 space-y-3">
              <p className="flex items-center gap-2 text-sm leading-relaxed text-ink-muted">
                <FlaskConical size={18} className="shrink-0 text-ink" /> TypeScript type-check plus Node&apos;s built-in test runner.
              </p>
              <CodeLine>{p.testing.command}</CodeLine>
              <p className="text-sm leading-relaxed text-ink-muted">
                In the test suite, Claude and third-party APIs are replaced by test doubles or a local mock server. A live run needs your own API keys.
              </p>
            </div>
            <ul className="space-y-2">
              {p.testing.areas.map((a) => (
                <li key={a} className="flex gap-2 text-sm leading-relaxed text-ink">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-rose-deep" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        <SectionCard id="repository" eyebrow="Source code" title="GitHub repository">
          <p className="text-ink-muted">Complete source, n8n workflows, tests, Docker Compose, environment examples and documentation.</p>
          <p className="mt-4 break-all font-mono text-sm text-ink">{p.repo}</p>
          {p.repoPublished ? (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">
              <Github size={16} /> Open repository <ArrowUpRight size={15} />
            </a>
          ) : (
            <p className="mt-3 text-sm text-ink-muted">This repository has not been published yet.</p>
          )}
        </SectionCard>
      </div>
    </main>
  );
}
