import "server-only";
import type { ProjectSlug } from "./automation-projects";

// Server-side configuration for the live demos. Backend URLs and API keys are
// read from environment variables and never sent to the browser.
type Backend = {
  urlEnv: string;
  keyEnv: string;
  /** Backend path for the stateless demo call (never stores or sends anything). */
  analyzePath: string;
  /** Max request body accepted by the proxy. */
  maxBytes: number;
};

export const BACKENDS: Record<ProjectSlug, Backend> = {
  "ai-email-automation": { urlEnv: "EMAIL_AGENT_URL", keyEnv: "EMAIL_AGENT_API_KEY", analyzePath: "/api/analyze", maxBytes: 64 * 1024 },
  "ai-lead-generation": { urlEnv: "LEAD_AGENT_URL", keyEnv: "LEAD_AGENT_API_KEY", analyzePath: "/api/analyze", maxBytes: 64 * 1024 },
  // Vercel rejects request bodies over 4.5 MB, so the invoice demo stays below that.
  "ai-invoice-processing": { urlEnv: "INVOICE_API_URL", keyEnv: "INVOICE_API_KEY", analyzePath: "/api/analyze", maxBytes: 4 * 1024 * 1024 },
  "ai-meeting-assistant": { urlEnv: "MEETING_API_URL", keyEnv: "MEETING_API_KEY", analyzePath: "/api/analyze", maxBytes: 256 * 1024 },
};

export function backendFor(slug: string) {
  if (!(slug in BACKENDS)) return null;
  const b = BACKENDS[slug as ProjectSlug];
  const url = process.env[b.urlEnv]?.trim().replace(/\/+$/, "");
  const key = process.env[b.keyEnv]?.trim();
  return { ...b, url: url || null, key: key || null };
}

/** Simple fixed-window limiter per client IP (per server instance). */
const hits = new Map<string, { count: number; resetAt: number }>();
export function allowRequest(ip: string, limit = 8, windowMs = 60_000) {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    return true;
  }
  if (e.count >= limit) return false;
  e.count++;
  return true;
}
