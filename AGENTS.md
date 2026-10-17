# AGENTS.md — Project Rules (IBN Larosh)

Project-level rules. They extend, and where sharper, override, personal global rules.
Business/UX spec: `docs/plans/PLAN.md` (source of truth). Stack decisions: `docs/plans/001-foundation.md`.
Visual spec: `DESIGN.md`. Phase tracker: `PHASE.md`.

---

## Persona & stack

Senior fullstack TypeScript dev. Stack is fixed:

- **Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · pnpm**
- **DB:** Neon Postgres via **Drizzle ORM** (`drizzle-orm/neon-http`)
- **Storage:** Cloudflare R2 via `@aws-sdk/client-s3` (S3-compatible)
- **Deploy target:** Vercel (repo: public `ibn_larosh` on GitHub)

**Package manager: pnpm only.** No npm/yarn commands.

## Commands

| Task | Command |
|---|---|
| Dev | `pnpm dev` (Turbopack) |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` (add if missing) |
| DB schema push | `pnpm db:push` (needs `DATABASE_URL` in `.env`) |
| DB UI | `pnpm db:studio` |
| DB connectivity probe | `pnpm db:probe` (no schema needed; prints OK/FAIL, never secrets) |

## File discipline

- Only edit files in the current task scope. Read widely, write narrowly.
- **Do not edit:** `docs/plans/PLAN.md`, `docs/reference/prototype.html`, `public/brand/*.png` (user-provided originals).
- Never commit: `.env`, `node_modules`, build output, secrets. `.env.example` IS committed.
- Search (`rg`) for existing code before writing new. No duplication.
- Folder structure: `src/app/**` (routes), `src/components/**`, `src/lib/**`, `docs/**`, `.github/workflows/**`. Keep it.

## Code standards

- `strict` TypeScript. No `any` — use `unknown` + narrowing or generics.
- Validate all external input (form fields, upload metadata) with Zod or hand-rolled guards.
- Distinguish env explicitly:
  - `src/lib/site.ts` = public constants (phone, address, BN No., categories) — versioned, not secrets.
  - `process.env.*` server-side secrets (admin creds, DB, R2) — never in `"use client"` files, never logged.
- Every `catch` logs, rethrows, or returns a typed error. Fail gracefully in UI (empty states).
- No `console.log` residue; no `eslint-disable` without a one-line reason comment.
- Server actions are the mutation layer (login, upload, cap CRUD). No separate Express layer.

## Admin auth model (fixed — do not "improve" without owner sign-off)

- Single admin; username/password live in `.env` (`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`).
- Verify with `crypto.timingSafeEqual`; set HttpOnly, signed (HMAC-SHA256), SameSite=Lax session cookie.
- Guard `/admin` server-side in the route group layout — never client-only.

## Caching & invalidation

Public catalog pages are ISR/cached for speed. Every admin mutation must invalidate
via `revalidatePath('/', 'layout')` (site-wide — simplest correct rule) plus any
affected dynamic path. Never mutate the DB without revalidating.

## Workflow per phase (PHASE.md is the log)

1. Read the phase's task list in `docs/tasks/phase-*.md`; check boxes as you complete items.
2. Implement; run `pnpm lint`, `pnpm typecheck`, `pnpm build` — all green.
3. **Audit gate:** run the *code-review-and-quality* and *impeccable* audits; fix every finding before committing.
4. Update `PHASE.md` log (one line: date, phase, what, notes).
5. Commit: `type(scope): short description` — one commit per phase, e.g. `feat(catalog): build catalog grid with filters`.
6. Push; keep `main` green — CI (`.github/workflows/ci.yml`) runs lint + typecheck + build.

## Windows shell notes

pwsh aliases shadow coreutils — use `ls.exe`, `cat.exe`/`bat`, `rg`, `cp.exe`, `rm.exe`.
Never assume `sed`/`awk`/`fd` exist.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
