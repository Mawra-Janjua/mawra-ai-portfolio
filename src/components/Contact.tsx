"use client";

import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "./ui";

export default function Contact() {
  const channels = [
    { label: "LinkedIn", value: "in/mawra-janjua", href: profile.links.linkedin, Icon: Linkedin },
    { label: "GitHub", value: "Mawra-Janjua", href: profile.links.github, Icon: Github },
    ...(profile.email
      ? [{ label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail }]
      : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 animate-float-slow rounded-full bg-rose-soft blur-3xl" />
      <div className="container-x relative">
        <Reveal className="card relative overflow-hidden bg-linear-to-br from-white via-white to-rose-soft p-8 sm:p-14">
          <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose/40 blur-2xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                <span className="h-px w-8 bg-rose-deep" aria-hidden />
                Contact
              </p>
              <h2 id="contact-title" className="font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">
                Let&apos;s build something <span className="italic">meaningful</span> together.
              </h2>
              <p className="mt-5 max-w-lg text-lg text-ink-muted">
                I&apos;m open to junior AI and software engineering opportunities. The best way to reach me is on
                LinkedIn.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-muted">
                <MapPin size={15} className="text-rose-deep" /> {profile.location}
              </p>
            </div>
            <ul className="grid gap-3">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-rose-line bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-deep hover:shadow-soft"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose text-ink">
                      <Icon size={19} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</span>
                      <span className="block font-semibold text-ink">{value}</span>
                    </span>
                    <ArrowUpRight size={18} className="text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
