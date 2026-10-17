# PHASE.md — Build Phase Tracker

Each phase ends with: lint + typecheck + build green → audits clean → one commit → push.
Commit format: `type(scope): short description`.

| Phase | Title | Scope | Status |
|---|---|---|---|
| 0 | Scaffold & docs | Next.js installer, docs (`AGENTS`/`DESIGN`/`PHASE`/`README`), env, git+GH repo, CI | ✅ done (audit-fixed) |
| 1 | Public site | Design system in code, all public routes, seed caps, WhatsApp ordering | ⬜ pending |
| 2 | Data layer | Drizzle/Neon schema, DB-backed catalog, R2 internals, ISR caching strategy | ⬜ pending |
| 3 | Admin portal | Env-based login, session cookie, upload + cap CRUD, cache invalidation | ⬜ pending |
| 4 | Polish & deploy | SEO/OG, favicon set, image optimization flip, Vercel deploy | ⬜ pending |

References: business/UX `docs/plans/PLAN.md` · stack update `docs/plans/001-foundation.md` ·
prototype `docs/reference/prototype.html` · visual spec `DESIGN.md`.

## Open decisions carried forward (from PLAN.md §10, resolved or assumed)

1. ~~Logos~~ — original files received, in `public/brand/` (logo.png, emblem.png). ✅
2. WhatsApp/Call number: `08109080076` (→ `wa.me/2348109080076`) — assumed from flier. ⚠ confirm.
3. Prices: hidden by default; cap cards show sizes, ordering says price on WhatsApp. ⚠ confirm (schema keeps optional `price`).
4. Categories: Tajia · Kaftan caps · Fancy · Custom weave. ✅ per prototype.
5. Custom domain: not yet. `R2_PUBLIC_BASE_URL` placeholder; Next `images.unoptimized=true` until image CDN host locked (see `next.config.ts`). ⚠ open.
6. Brand name is fixed ("Ibn Larosh"); no public meaning/wording needed beyond logo wordmark.

---

## Phase log (newest last)

| Date | Phase | Commit | Summary |
|---|---|---|---|
| 2026-10-17 | 0 | `dd63f47` | scaffold + docs + CI; DB probe `SELECT 99+1` OK against Neon |
| 2026-10-17 | 0 (audit fixes) | (this commit) | OCR round-2 fixes: postcss Tailwind wiring, portable layout types, CI hardening, branded placeholder home, db:probe script, removed unused @tailwindcss/turbopack |
