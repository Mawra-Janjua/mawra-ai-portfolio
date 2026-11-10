import { ArrowUp, Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/data";

// cacheComponents is enabled in next.config.ts, so the current year must be
// computed inside a cached scope rather than directly during prerender.
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="border-t border-rose-line bg-blush">
      <div className="container-x flex flex-col items-center justify-between gap-5 py-10 sm:flex-row">
        <p className="text-sm text-ink-muted">
          © <CopyrightYear />{" "}<span className="font-semibold text-ink">{profile.name}</span> · {profile.role}
        </p>
        <div className="flex items-center gap-2">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-full border border-rose-line bg-white text-ink transition hover:bg-rose-soft"
          >
            <Linkedin size={17} />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-full border border-rose-line bg-white text-ink transition hover:bg-rose-soft"
          >
            <Github size={17} />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-full bg-rose text-ink transition hover:-translate-y-0.5 hover:bg-rose-deep"
          >
            <ArrowUp size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
