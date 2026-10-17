# Phase 2 — Data layer (Neon + Drizzle)

Status: in progress

## Checklist

- [x] Drizzle schema `src/lib/db/schema.ts` — single `caps` table exactly as PLAN §4:
      id · name · category · sizes/colors/tags/images (jsonb) · price · description ·
      available · featured · createdAt
- [x] Lazy Neon HTTP client `src/lib/db/index.ts` — missing `DATABASE_URL` never throws at import
- [x] Catalog data layer `src/lib/caps.ts` — rows → public `Cap` (keys → `/api/media/<key>`),
      React `cache()` per-request dedupe, seed fallback when no DB / empty table / read error
- [x] Public pages async + `revalidate = 300` (home, catalog, detail) and `getCaps()` everywhere
- [x] `sitemap.ts` reads the same data layer
- [x] `pnpm db:push` creates the table on Neon
- [x] `pnpm db:seed` loads the 10 real caps (idempotent upsert)
- [x] Verified the site reads Neon: a temporary DB rename appeared in a clean build and in dev,
      then was reverted
- [x] Quality gate: lint + typecheck + build green

## Decisions

- **Seed fallback stays.** CI builds without `DATABASE_URL` must stay green. If the DB is
  unreachable at runtime, the site serves seed data and logs the error rather than 500ing.
- **JSONB arrays** for sizes/colors/tags/images (matches PLAN §4); price is `numeric` and
  converted to a number at the boundary.
- **Image keys, not URLs, in Postgres.** `/api/media/<key>` is built in the data layer, so
  moving to a public CDN later only changes one function.
- **ISR revalidate = 300** for reads; Phase 3 mutations will call
  `revalidatePath('/', 'layout')` so new content is visible immediately.
- **`/caps?cat=` stays client-side.** Reading `searchParams` server-side would make the
  catalog route dynamic; `useSearchParams` inside a Suspense boundary keeps `/caps` static
  (verified: `Revalidate 5m` in the build report).
- **Build-time caveat:** `next build` reuses prerendered pages from `.next/cache`. A DB value
  changed between two local builds can keep the old prerender until revalidation — production
  behaves the same for up to 5 minutes, which is why Phase 3 mutations must revalidate.
- **Next 16 `unstable_cache` is deprecated** in favour of Cache Components (`use cache`).
  We use static ISR + React `cache()` instead; revisit Cache Components in Phase 4.
