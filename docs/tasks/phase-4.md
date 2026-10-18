# Phase 4 — Polish & deploy

Status: polish done · deploy blocked on owner (Vercel auth)

## Checklist

- [x] **Icon set** generated from the supplied emblem (originals untouched):
      `src/app/icon.png` (256²), `src/app/apple-icon.png` (180²); default Next
      `favicon.ico` removed. Regenerate with `scripts/make-brand-images.ps1`.
- [x] **Open Graph card** `public/og.png` (1200×630) — cream canvas, gold hairline, brand logo.
- [x] **Metadata**: default OG image + Twitter `summary_large_image`; per-cap OG image and
      `alternates.canonical` on every public route.
- [x] **sitemap / robots / manifest** re-checked; manifest now points at the generated icons.
- [x] **Image optimisation** on (AVIF/WebP, 30-day TTL) — same-origin `/api/media` so no
      remote patterns needed.
- [x] **Route sweep**: 19 URLs (pages, sitemap, robots, manifest, icons, OG, media) all 200;
      22 internal links crawled, none broken; branded 404; `/admin` → 307 `/admin/login`.
- [x] **Interaction sweep** (production build, browser): catalog type filter (Fancy → 2 caps),
      search (purple → 1 cap), detail size/colour selection → order bar updates, custom-form
      validation (empty name, half-inch size rule), FAQ accordion, login error, password
      show/hide.
- [x] **Form a11y**: explicit `htmlFor`/`id` on every labelled control (login, custom order,
      cap form).
- [ ] **Vercel deploy** — requires the owner's Vercel login and env values (see below).

## Deploy steps (owner)

```bash
pnpm dlx vercel link          # choose the ibn_larosh project
# Set these in Vercel → Settings → Environment Variables (values from .env):
#   DATABASE_URL            Neon pooled connection string
#   ADMIN_USERNAME          admin login
#   ADMIN_PASSWORD          admin login
#   SESSION_SECRET          32+ byte hex, signs the session cookie
#   CLOUDFLARE_ACCOUNT_ID   R2
#   R2_ACCESS_KEY_ID        R2
#   R2_SECRET_ACCESS_KEY    R2
#   R2_BUCKET               bn-laroosh
#   NEXT_PUBLIC_SITE_URL    https://<domain>   (canonical URLs, sitemap, OG)
pnpm dlx vercel --prod
```

Notes:
- Set `DATABASE_URL` **before** the first build: `next build` prerenders the catalog and falls
  back to seed data if the variable is missing.
- The R2 bucket stays private; images are streamed through `/api/media/<key>`.
- After the first deploy, sign in at `/admin` and confirm an upload round-trip.
- Optional: point a custom domain at Vercel, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

## Environment parity

CI (`.github/workflows/ci.yml`) builds without secrets: `getCaps()` falls back to seed data, so
lint/typecheck/build stay green on a fresh clone.
