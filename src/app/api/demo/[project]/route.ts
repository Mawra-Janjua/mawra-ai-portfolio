import { connection } from "next/server";
import { allowRequest, backendFor } from "@/lib/demo-backends";

// Server-side proxy for the live project demos. The browser never sees backend
// URLs or API keys. When a backend is not configured the response says so
// explicitly; no demo result is ever simulated.

type Ctx = { params: Promise<{ project: string }> };

// A meeting summary makes two sequential Claude calls; allow up to 5 minutes
// (the maximum on Vercel's Hobby plan with Fluid Compute).
export const maxDuration = 300;
const UPSTREAM_TIMEOUT_MS = 290_000;

const json = (status: number, body: unknown) => Response.json(body, { status, headers: { "cache-control": "no-store" } });

const notConnected = (envUrl: string, envKey: string) =>
  json(503, {
    connected: false,
    error: {
      code: "demo_not_connected",
      message: `The live demo is not connected yet. The site owner needs to deploy the backend and set ${envUrl} and ${envKey}.`,
    },
  });

/** Integration status: is the backend configured and reachable, and is Claude configured on it? */
export async function GET(_req: Request, { params }: Ctx) {
  await connection(); // evaluate env + backend health at request time, never at build time
  const b = backendFor((await params).project);
  if (!b) return json(404, { error: { code: "unknown_project", message: "Unknown project." } });
  if (!b.url || !b.key) return json(200, { connected: false, reason: "not_configured" });
  try {
    const res = await fetch(`${b.url}/health`, { signal: AbortSignal.timeout(5000), cache: "no-store" });
    if (!res.ok) return json(200, { connected: false, reason: "backend_unhealthy" });
    const health = (await res.json()) as { integrations?: Record<string, unknown> };
    const claude = health.integrations?.claude === true;
    return json(200, { connected: claude, reason: claude ? null : "claude_not_configured", integrations: health.integrations ?? {} });
  } catch {
    return json(200, { connected: false, reason: "backend_unreachable" });
  }
}

export async function POST(req: Request, { params }: Ctx) {
  const b = backendFor((await params).project);
  if (!b) return json(404, { error: { code: "unknown_project", message: "Unknown project." } });
  if (!b.url || !b.key) return notConnected(b.urlEnv, b.keyEnv);

  // On Vercel these headers are set by the platform, not by the visitor.
  const ip = req.headers.get("x-real-ip")?.trim() || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allowRequest(ip)) return json(429, { error: { code: "rate_limited", message: "Too many demo requests. Please wait a minute." } });

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > b.maxBytes) return json(413, { error: { code: "too_large", message: `Demo uploads are limited to ${Math.round(b.maxBytes / 1024)} KB.` } });
  const body = await req.arrayBuffer();
  if (body.byteLength > b.maxBytes) return json(413, { error: { code: "too_large", message: `Demo uploads are limited to ${Math.round(b.maxBytes / 1024)} KB.` } });

  const search = new URL(req.url).search;
  try {
    const upstream = await fetch(`${b.url}${b.analyzePath}${search}`, {
      method: "POST",
      headers: {
        "content-type": req.headers.get("content-type") ?? "application/json",
        "x-api-key": b.key,
        "x-forwarded-for": ip,
      },
      body,
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      cache: "no-store",
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "content-type": upstream.headers.get("content-type") ?? "application/json", "cache-control": "no-store" },
    });
  } catch (err) {
    const timeout = err instanceof Error && err.name === "TimeoutError";
    return json(timeout ? 504 : 502, {
      error: { code: timeout ? "backend_timeout" : "backend_unreachable", message: timeout ? "The backend took too long to respond." : "The demo backend could not be reached." },
    });
  }
}
