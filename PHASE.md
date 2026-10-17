# PHASE.md — Build Phase Tracker

Each phase ends with: lint + typecheck + build green → audits clean → one commit → push.
Commit format: `type(scope): short description`.

| Phase | Title | Scope | Status |
|---|---|---|---|
| 0 | Scaffold & docs | Next.js installer, docs (`AGENTS`/`DESIGN`/`PHASE`/`README`), env, git+GH repo, CI | ✅ done (audit-fixed) |
| 1 | Public site | Design system in code, all public routes, seed caps, WhatsApp ordering | ✅ done (audit-fixed) |
| 2 | Data layer | Drizzle/Neon schema, DB-backed catalog, R2 internals, ISR caching strategy | ✅ done |
| 3 | Admin portal | Env-based login, session cookie, upload + cap CRUD, cache invalidation | ✅ done |
| 4 | Polish & deploy | SEO/OG, favicon set, image optimization flip, Vercel deploy | ⬜ pending |

References: business/UX `docs/plans/PLAN.md` · stack update `docs/plans/001-foundation.md` ·
prototype `docs/reference/prototype.html` · visual spec `DESIGN.md`.

## Open decisions carried forward (from PLAN.md §10, resolved or assumed)

1. ~~Logos~~ — original files received, in `public/brand/` (logo.png, emblem.png). ✅
2. WhatsApp/Call number: `08109080076` (→ `wa.me/2348109080076`) — assumed from flier. ⚠ confirm.
3. Prices: hidden by default; cap cards show sizes, ordering says price on WhatsApp. ⚠ confirm (schema keeps optional `price`).
4. Categories: Tajia · Kaftan caps · Fancy · Custom weave. ✅ per prototype.
5. Images: **solved without public access.** Bucket `bn-laroosh` is private; photos are read
   with the S3 SDK (`src/lib/r2.ts`) and served from `/api/media/<key>` with immutable cache
   headers. `R2_PUBLIC_BASE_URL` is no longer needed. Next image optimisation is **on**
   (same-origin URLs, AVIF/WebP, per-breakpoint srcset), so no public bucket is required. ✅
6. Brand name is fixed ("Ibn Larosh"); no public meaning/wording needed beyond logo wordmark.

---

## Phase log (newest last)

| Date | Phase | Commit | Summary |
|---|---|---|---|
| 2026-10-17 | 0 | `dd63f47` | scaffold + docs + CI; DB probe `SELECT 99+1` OK against Neon |
| 2026-10-17 | 0 (audit fixes) | `35923c5` | OCR round-2 fixes: postcss Tailwind wiring, portable layout types, CI hardening, branded placeholder home, db:probe script, removed unused @tailwindcss/turbopack |
| 2026-10-17 | 1 | `7573662` | public site: brand tokens + Playfair/Inter, shadcn primitives, header/tab bar/FAB, all public routes, real 10-cap catalog from R2 via private `/api/media` proxy, WhatsApp ordering; audit fixes (image stretch, logo, heading weight, contrast, spacing, order-bar containing block); fallow clean |
| 2026-10-18 | 2 | `517e831` | Neon + Drizzle: `caps` table pushed, 10 caps seeded (`pnpm db:seed`), catalog reads DB via `src/lib/caps.ts` with seed fallback, static ISR 300s, `/caps?cat=` moved client-side |
| 2026-10-18 | 3 | (this commit) | admin portal: env login + HMAC session, `proxy.ts` guard, R2 uploads (magic-byte + 5 MB), cap CRUD, toggles, delete with confirm, `revalidatePath` invalidation, password toggle |
