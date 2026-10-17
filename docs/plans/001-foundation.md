# 001 — Foundation & Architecture (stack decisions)

Status: approved-for-v0 · Supersedes only the stack section (`§2`) of `docs/plans/PLAN.md`.
PLAN.md remains the source of truth for business facts, IA, copy, and the design system.

## Why not CF Worker + D1 (PLAN §2)?

PLAN.md drafted the site around Cloudflare Pages + Worker (Hono) + D1. Owner decision keeps the
**same UX/data ideas** but moves the platform to Next.js, already owned infrastructure,
and one-repo simplicity:

- **Next.js 16 App Router** gives routing, ISR caching, server actions, and image handling in one framework.
- **Neon Postgres + Drizzle** replaces D1: typed schema/migrations in TS, pooled HTTP driver (works on Vercel edge/Node).
- **Cloudflare R2 stays** for images — S3-compatible via `@aws-sdk/client-s3` server-side; keys never reach the browser.
- **Vercel deploy** replaces CF Pages. R2 remains on the CF side; only the bucket base URL connects them.

```
┌────────────────────────── Browser ──────────────────────────┐
│ React (RSC + small client islands) · Tailwind v4            │
│ Order buttons → wa.me deep links (no cart/payment)          │
└──────────────┬───────────────────────────┬──────────────────┘
               ▼ ISR read (cached)         ▼ <img src=R2 public URL>
        ┌───────────────┐            ┌──────────────┐
        │ Next server   │──Drizzle──▶│ Neon Postgres│
        │ (RSC/actions) │            │  caps        │
        │ POST /admin/* │            └──────────────┘
        │ server actions│──S3 SDK──▶ ┌──────────────┐
        └───────────────┘            │ R2 bucket    │
        Admin: env creds +           │ caps/<id>*.  │
        HMAC session cookie          └──────────────┘
```

## Routes (mirrors PLAN §3)

`/` `/caps` `/caps/[id]` `/custom` `/sizes` `/delivery` `/faq` `/about` `/contact` `/admin` —
hot-patched 404 via `not-found.tsx`. Prototype's `#/more` mobile menu folds into the tab bar's
"More" → simple sheet in v1 (list of info pages).

## Data model (PLAN §4, integers intact)

Table `caps` (Postgres, Drizzle): `id` (nanoid text PK) · `name` · `category`
(`tajia|kaftan|fancy|custom`) · `sizes` (jsonb `number[]`) · `colors` (jsonb `string[]`) ·
`tags` (jsonb `string[]`) · `images` (jsonb R2 keys `caps/<id>/1.<ext>`) · `price`
(numeric, nullable → "Ask on WhatsApp") · `description` · `available` bool ·
`featured` bool · `createdAt` timestamptz.

No carts/orders/audits tables — ordering is WhatsApp-only. If a second table
is ever proposed, stop and ask (PLAN.md never authorized it).

## Caching and invalidation

Catalog read paths are infrequently-updated (owner occasionally) and frequently-read
any visit): cache hard, invalidate on write.

- Public pages: ISR (`export const revalidate = 300`) reading via Drizzle/Neon HTTP.
- Mutation server actions ALWAYS call `revalidatePath('/', 'layout')` — nuclear but simple
  and exactly what the owner asked: new content visible on next request, no stale mixes.
- Cap photos are immutable on upload (content hash in key) → cache forever at R2/CDN.
- `images.unoptimized=true` for v0 (`next.config.ts`); revisit when a R2 custom domain exists.

## Admin & upload flow (PLAN §7 adapted to Vercel)

- Env-based single admin (`.env ADMIN_USERNAME/PASSWORD/SESSION_SECRET`), HMAC-signed
  HttpOnly session cookie; `timingSafeEqual` comparisons; 12h expiry.
- Upload: dashboard form (multi-image drag-drop, client-side canvas downscale
  ≈1600px/WebP) → server action validates MIME ≤5MB → S3 PutObject → DB row → revalidate.
  Keys never leave the server.
- Edit/hide/delete = server actions + revalidation; hidden caps stay in DB.
- No Cloudflare Access on Vercel — session cookie is the single gate.

## Build phases

See `PHASE.md` (0 docs/scaffold → 1 public UI → 2 data layer → 3 admin → 4 polish/deploy).
PLAN.md's own phases (§9) map 1:1 onto these; only the platform detail differs.
