# Phase 3 — Admin portal

Status: done

## Checklist

- [x] **Auth primitives** `src/lib/auth.ts` — `timingSafeEqual` credential check (both fields always
      compared, length-safe via SHA-256 digest), HMAC-SHA256 signed session token with 12h expiry
- [x] **Session** `src/lib/session.ts` — HttpOnly · SameSite=Lax · Secure in production · `path=/`;
      `requireSession()` guard used by every admin page and every mutation
- [x] **Login** `/admin/login` — server action, generic error copy, per-IP throttle (8 attempts / 10 min),
      redirects to `/admin` when already signed in; signed-in users skip the form
- [x] **Admin shell** `/admin` route group — session guard in the layout (server-side, never client-only),
      catalog table, stats, sign-out, storefront chrome hidden via `:has(.admin)`
- [x] **Create** `/admin/caps/new` — name, type, sizes, colours, tags, price, description,
      available/featured, photo; validates before writing
- [x] **Update** `/admin/caps/[id]/edit` — prefilled form, add another photo, tick-to-remove photos
- [x] **Toggle** available/featured from the table; **Delete** with confirmation
- [x] **Uploads** `src/lib/upload.ts` — magic-byte sniffing (JPEG/PNG/WebP), 5 MB cap,
      server-generated flat keys (`cap-<uuid>-<ts>.<ext>`), `PutObject` with immutable cache headers
- [x] **Validation** `src/lib/cap-input.ts` — sizes 18–26 in half-inch steps, price 0–10M, name ≤ 80,
      description ≤ 600, category allow-list
- [x] **Invalidation** — every mutation calls `revalidatePath("/", "layout")` plus the cap path
- [x] **`robots.ts`** disallows `/admin`; admin pages set `robots: noindex` and force dynamic rendering
- [x] **`src/proxy.ts`** guards every `/admin/*` route before render (Next 16 proxy, Node runtime);
      `/admin/login` is the only public admin path. The layout guard remains as defence in depth
- [x] **Password visibility toggle** on the login form (Eye/EyeOff, `aria-pressed`)
- [x] Icon back link (ChevronLeft) instead of the `←` glyph
- [x] **`serverActions.bodySizeLimit` = 6mb** (Next defaults to 1 MB, which would reject real photos)
- [x] Quality gate: lint + typecheck + build green; `fallow audit` clean; impeccable detector clean

## Verification (no secrets printed)

| Check | Result |
|---|---|
| Correct credentials accepted | ✅ |
| Wrong password / wrong username rejected | ✅ |
| Valid session token accepted | ✅ |
| Tampered signature rejected | ✅ |
| Expired token rejected | ✅ |
| Missing cookie rejected | ✅ |
| `/admin` with session → 200 + catalog | ✅ |
| `/admin` without session → 307 → `/admin/login` | ✅ |
| `/admin/caps/new` renders form | ✅ |
| `/admin/caps/c1/edit` prefilled | ✅ |
| R2 upload → `/api/media/<key>` 200 → delete → 404 | ✅ |

## Notes / follow-ups

- **Owner must test the login form personally** — the agent never reads `.env`, so the credential
  path was verified through the auth module and a session cookie, not by typing the password.
- The login throttle is per server instance; on Vercel each instance keeps its own counter. Good
  enough for a single-admin site; move to a shared store if that changes.
- Deletion only removes R2 keys that belonged to that cap (form values are intersected with the
  stored list), so a forged checkbox cannot delete other caps' photos.
- Tests + coverage reporting are still missing; `health.maxCrap` is documented in `.fallowrc.jsonc`
  as a Phase 4 item.
