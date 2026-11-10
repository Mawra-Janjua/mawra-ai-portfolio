"use client";

import { Bot, GraduationCap, Heart } from "lucide-react";
import { aiTools, education, profile } from "@/lib/data";
import { Reveal, Section } from "./ui";

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title="Curious, practical and people-focused." tone="white">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="card p-8 sm:p-10">
          <Heart size={22} className="text-rose-deep" />
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            <p>
              I&apos;m <span className="font-semibold text-ink">{profile.name}</span>, a {profile.role.toLowerCase()} based
              in {profile.location}. I enjoy turning ideas into working software — especially where AI can make
              something more accessible or save people time.
            </p>
            <p>
              As a freelance developer, I built AI-powered and mobile software, connected apps to Firebase and REST
              APIs, and took care of testing and documentation. My academic work focused on computer vision, NLP and
              machine learning, including a Pakistani Sign Language recognition system that placed 3rd in a university
              competition.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal className="card p-7" delay={0.1}>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-soft text-ink">
                <GraduationCap size={20} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">{education.degree}</h3>
                <p className="mt-1 text-sm text-ink-muted">{education.school}</p>
                <p className="chip mt-3">CGPA {education.cgpa}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="card p-7" delay={0.2}>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-soft text-ink">
                <Bot size={20} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">Current focus</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  About two months of hands-on practice using AI assistants for real-world tasks and AI-assisted
                  workflows.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {aiTools.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
