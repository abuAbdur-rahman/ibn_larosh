# IBN Larosh Enterprises — Cap Catalog Website

**Values You Trust, Quality You Deserve** · BN No. 9882187 · Beside Tipper Garage, Okolowo Area, Ilorin, Kwara State

Mobile-first catalog of quality Hausa caps — Tajia, Kaftan-matching, Fancy, and custom-woven.
No cart, no payment: every **Order** button opens WhatsApp (`wa.me/2348109080076`) with cap details pre-filled.

| | |
|---|---|
| Stack | Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · pnpm |
| Database | Neon Postgres + Drizzle ORM (`serverless HTTP driver`) |
| Storage | Cloudflare R2 (S3-compatible), public-read bucket for cap photos |
| Deploy | Vercel · repo `ibn_larosh` (GitHub, public) |
| CI | GitHub Actions — ESLint + tsc + next build (push to `main` + all PRs) |

## Quickstart

```bash
pnpm install
cp .env.example .env        # fill DATABASE_URL + admin creds + R2 keys (see .env.example)
pnpm dev                    # http://localhost:3000
pnpm build && pnpm start    # production check
```

Database schema: `pnpm db:push` (Drizzle Kit → Neon). Schema lives in `src/lib/db/schema.ts`
**— arrives in Phase 2; `db:generate/push/studio` are dormant until then.**

Scripts: `dev` · `build` · `start` · `lint` · `typecheck` · `db:generate` · `db:push` · `db:studio` · `db:probe`

## Site map

| Route | Purpose |
|---|---|
| `/` | Hero slider, category tiles, featured caps, how-to-order, locations |
| `/caps` | Catalog: search + type/size/colour filters, 2→4 col grid, load more |
| `/caps/[id]` | Cap detail, size chips, sticky *Order on WhatsApp* bar |
| `/custom` | Custom-order form → prefilled WhatsApp message |
| `/sizes` | Size guide chart (inches ↔ cm) |
| `/delivery` | Ilorin delivery + pickup info |
| `/faq` | Accordion FAQ |
| `/about` `· /contact` | Story + logo · WhatsApp/call/map |
| `/admin` | Owner portal (single admin from `.env`) — login, upload, edit/hide/delete caps |

## Caching model

Public catalog reads are cached (ISR) so repeat visitors don't re-hit Neon.
Every admin mutation executes `revalidatePath('/', 'layout')` — the moment the owner
adds/edits/hides a cap, every public page freshens on the next request. Details:
`docs/plans/001-foundation.md#caching-and-invalidation`.

## Documentation index

- `docs/plans/PLAN.md` — business + UX plan from the flier (source of truth)
- `docs/plans/001-foundation.md` — architecture, stack decisions, data model, caching, auth
- `docs/tasks/` — per-phase task checklists
- `DESIGN.md` — design system (tokens, type, components, motion, a11y)
- `PHASE.md` — phase tracker + commit log
- `AGENTS.md` — rules for AI agents working this repo
- `docs/reference/prototype.html` — approved static prototype (visual canon)
- `public/brand/` — logo + storefront emblem (originals)

## Env variables

See [`.env.example`](.env.example) — admin creds, Neon `DATABASE_URL`, CF account/R2 keys,
bucket name, public base URL. Secrets never leave git; `.env` is gitignored.
