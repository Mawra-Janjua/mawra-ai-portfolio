// Public base URL of the site, used for canonical links, Open Graph and the sitemap.
// Set NEXT_PUBLIC_SITE_URL once a custom domain exists; on Vercel the production
// domain is provided automatically.
export function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
