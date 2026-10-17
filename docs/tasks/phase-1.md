# Phase 1 — Public site

Status: done

## Checklist

- [x] shadcn initialized (Radix `/ nova` preset, Lucide, `cn`) + primitives added:
      `button badge card input select sheet dialog tabs skeleton sonner textarea toggle-group
      label separator toggle`
- [x] Brand tokens in `src/app/globals.css`: cream/green/gold palette, Playfair Display + Inter
      via `next/font`, shadcn variables remapped to the brand
- [x] Prototype component styles ported: header, tab bar, hero, cards, chips, steps, banner,
      detail order bar, forms, footer, toast, FAB
- [x] Shell: sticky header + desktop nav (active route), mobile 5-tab bar, footer, floating
      WhatsApp button (hidden on cap detail, which has its own order bar)
- [x] Routes: `/` `/caps` `/caps/[id]` `/custom` `/sizes` `/delivery` `/faq` `/about`
      `/contact` `/more` + branded 404
- [x] Catalog: text search (name/colour/tags), type + size filters, newest/size sort,
      empty state, load more (24/page)
- [x] Detail: size selection updates the pre-filled WhatsApp message, colours, facts,
      more caps
- [x] WhatsApp ordering only — no cart, no payment, no order storage
- [x] Real catalog: the 10 caps already in R2 (`bn-laroosh`), names/colours/patterns derived
      from the photos; sizes are sensible defaults pending owner confirmation
- [x] Private-bucket media pipeline: `src/lib/r2.ts` (S3 SDK `GetObject`) +
      `/api/media/[key]` proxy with immutable cache headers; R2 credentials stay server-side
- [x] Metadata: title template, descriptions, canonical `metadataBase` from
      `NEXT_PUBLIC_SITE_URL`/Vercel URL, per-cap Open Graph image
- [x] Quality gate: `pnpm lint` + `pnpm typecheck` + `pnpm build` green

## Audit gate (pre-commit)

Design/a11y review (impeccable + frontend-design checklists) and DOM measurement caught:

1. **Stretched detail photo** — `.big` had no `position: relative`, so Next `fill` positioned
   the image against the viewport (rendered 1100×1072 over the page). Fixed.
2. **Squashed header logo** — the 1536×1024 full wordmark was squeezed into the 40px mark.
   Header now uses the square emblem; About uses the full wordmark at its natural ratio.
3. **Thin headings** — Tailwind v4 preflight resets `h1–h3` to `font-weight: inherit`, so
   Playfair rendered at 400. Explicit 700/600 weights added.
4. **Contrast failures** — white on gold 2.66:1 and white on WhatsApp green 1.98:1. Solid
   gold/WhatsApp surfaces now use deep green text/icons (4.75:1 and 6.37:1); focus rings
   inherit `currentColor` and are visible on every surface.
5. **Stale detail state** — navigating between caps kept the previously selected size; the
   detail and catalog components are now keyed by cap / initial category.
6. Hero caption overflow guarded with ellipsis; WhatsApp icon optically matched to button text.
7. **Cramped vertical rhythm** — section spacing raised from 22px to `clamp(40px, 5vw, 56px)`,
   larger headings, cards and detail blocks; caps page filter bar and meta row given room.
8. **A11y hardening** — skip link, carousel pause control (WCAG 2.2.2), 44px chips/card actions,
   `touch-action: manipulation`, theme colour, image optimisation enabled.

## Audit gate — round 2 (fallow + impeccable)

`fallow audit --base 35923c5` and the impeccable audit found and fixed:

1. **Fixed order bar containing block** — `.page` animated `transform`, which made it the
   containing block for the `position: fixed` order bar on `/caps/[id]`. Animation is now
   opacity-only; the bar anchors to the viewport (verified 709–782px above the tab bar).
2. **Dead code (24 → 0)** — removed unused exports (`env`, `requireEnv`, `getR2Client`,
   `R2_BUCKET`, `isValidMediaKey`, `SEED_CAPS`, `FACTS`, `customOrderLink`), deleted the unused
   `src/lib/utils.ts`; vendored shadcn primitives declared as fallow entry points.
3. **Complexity (5 → 0)** — validation extracted to `src/lib/custom-order.ts`, tab resolution +
   `Tab` component, R2 read split into `readObject`, catalog filters split into predicates.
4. **Duplication (2 → 0)** — shared `<Steps>` component + `src/lib/steps.ts` copy.
5. **Unused tap targets** — hero pause, sort select and section links raised to 44px.
6. **Colour chips** now selectable and sent to WhatsApp; "Price on request" line added.
7. **Heading outline** — detail `h4` labels became `h2`; catalog gained a visually hidden `h2`.
8. **Performance** — removed no-op `backdrop-filter` from tab bar and order bar; prose measure
   capped at 68ch; hero slides now use non-featured caps so the first screen doesn't repeat.
9. **Discovery** — `sitemap.ts`, `robots.ts`, `manifest.ts`, `themeColor`/`viewportFit`.
10. **Browser surfaces** — `::selection`, caret colour, underlined footer links, and
    `scroll-behavior: auto` under reduced motion.

## Notes / follow-ups

- Seed sizes and the tajia/fancy split need owner confirmation; `/caps?cat=kaftan` and
  `?cat=custom` are intentionally empty for now (empty state offers WhatsApp). The home
  "Custom weave" tile goes to the custom-order form.
- Cap photos now go through Next's image optimiser (AVIF/WebP from the same-origin proxy);
  no public bucket or remote pattern needed.
- `isValidMediaKey` accepts flat keys only (`IMG-….jpg`). Phase 3 uploads must either use flat
  keys or extend the pattern for prefixes.
- Form errors are summarised in one `role="alert"` block; per-field `aria-describedby` is a
  Phase 4 polish item.
- shadcn primitives are intentionally retained for the Phase 3 admin portal even though the
  storefront doesn't import them yet.
