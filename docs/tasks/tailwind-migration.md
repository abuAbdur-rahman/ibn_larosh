# CSS → Tailwind migration (staged)

Status: stage 1 done · stage 2+ pending

The stylesheet started as a faithful port of `docs/reference/prototype.html` (~1,720 lines,
231 selectors). It is being replaced with Tailwind utilities in stages so every checkpoint
stays shippable and visually identical.

## Stage 1 — primitives (done)

| Primitive | File | Replaces |
|---|---|---|
| `Button`, `ButtonLink`, `ButtonAnchor` | `src/components/ui-kit/button.tsx` | `.btn` + `.gold/.green/.wa/.line/.block` |
| `Chip`, `ChipTag` | `src/components/ui-kit/chip.tsx` | `.chip`, `.chip.on`, `.sizes .chip` |
| `inputClass`, `textareaClass`, `fileInputClass`, `fieldRowClass` | `src/components/ui-kit/field.tsx` | `.input`, `textarea.input`, `.field-row` |
| `Panel` | `src/components/ui-kit/field.tsx` | `.panel`, `.panel p` |
| `SectionHead` | `src/components/section-head.tsx` | `.sh`, `.sh h2`, `.sh a` |
| `Steps` | `src/components/steps.tsx` | `.steps`, `.step`, `.step .n` |

Deleted from `globals.css`: ~180 lines (`.btn*`, `.chip*`, `.input*`, `.panel*`, `.sh*`,
`.steps*`, `.step*`, `.field-row`, `.admin-file`). File is now 1,542 lines.

Verified in the browser after migration: CTA height 48px · chip height 44px · panel radius 18px
+ 24px padding · input 48px/radius 14px · SectionHead link 44px with 16px icon · Steps 3 columns
at ≥900px. Colours unchanged (gold `#C9962F`, green `#0A3B22`, WhatsApp `#07864A`).

## Stage 2 — `/custom` + `/sizes` (done)

New layout primitives in `src/components/ui-kit/layout.tsx`:

| Primitive | Replaces |
|---|---|
| `Page` | `.page` (max-width, padding, fade animation) |
| `PageTitle` | `.ttl`, `.ttl h1`, `.ttl p` |
| `Section` | `.sec` |
| `Note` (tip / alert / status) | `.note` |
| `Banner` (with `--banner-glow`) | `.banner`, `.banner h2`, `.banner p` |

- `/custom` and `/sizes` fully rewritten on these primitives.
- The size chart table now uses utilities (`tabular-nums`, token borders); global
  `table` / `th` / `td` styles deleted.
- `.note` migrated everywhere it was used (custom form, admin forms, login, admin dashboard)
  and its CSS deleted. Note colours are now tokens: `--note-bg`, `--note-line`, `--note-ink`.
- Banner glow moved to the `--banner-glow` token so the component carries no raw gradient.
- Caught a real regression: `rounded-3xl` resolves to 22px in this shadcn radius scale, so the
  banner uses an explicit `rounded-[24px]` to match the approved 24px.

CSS is now 1,533 lines (from 1,542). `.page`, `.ttl`, `.sec`, `.banner` remain until their last
consumer is migrated (home / delivery / detail still use them).

## Stage 3 — info routes (done)

Migrated: `/delivery`, `/faq`, `/about`, `/contact`, `/more`.

- New `LocationCard` primitive (icon + title + detail, optional link) — shared by delivery and
  contact, ready for home in stage 5.
- FAQ `<details>/<summary>` converted to utilities: marker hidden, `group-open:rotate-180` on the
  chevron, 68ch answer measure.
- More menu and contact stack converted to utilities.
- About logo sizing/radius moved onto `next/image` (`w-[min(320px,80%)] rounded-[16px]`).
- Deleted: `.stack`, `.menu*`, `details`/`summary*`, `.logo-full`.
- Radius trap caught twice more: `rounded-2xl` = 18px and `rounded-3xl` = 22px here, not the
  intended 16/24px. Explicit values used (`rounded-[16px]`, `rounded-[24px]`).

CSS now 1,460 lines (from 1,533). `.loc`/`.locr` remain for home until stage 5.

## Stage 4 — catalog + detail (next)

`/caps` and `/caps/[id]`: `.fbar`, `.search`, `.meta`, `.empty`, `.hscroll`, `.cap-grid`,
`.card`, `.ph`, `.tag`, `.cb`, `.crow`, `.hcard`, `.dgrid`, `.big`, `.dinfo`, `.blk*`,
`.sizes`, `.facts`, `.obar`, `.back`.

## Stays in CSS

- `@theme` brand tokens + shadcn variable mapping
- `@keyframes` / page fade
- Hero radial gradients
- `prefers-reduced-motion` kill switch
- Storefront-chrome hiding (`body:has(.admin)`)
- `::selection`, focus ring base, scrollbar-free horizontal scrollers
