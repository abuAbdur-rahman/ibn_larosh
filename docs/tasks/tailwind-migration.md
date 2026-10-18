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

## Stage 3 — info routes (next)

`/delivery` → `/faq` → `/about` → `/contact` → `/more`, then catalog and detail.

Selectors to migrate: `.loc`, `.locr`, `.fact`, `.facts`, `.sizes`, `.details`/`summary`,
`.menu`, `.hscroll`, `.cap-grid`, `.card*`, `.hero`, `.slider`, `.perks`, `.cat`, `.dgrid`,
`.big`, `.dinfo`, `.blk*`, `.obar`, plus admin chrome.

## Stays in CSS

- `@theme` brand tokens + shadcn variable mapping
- `@keyframes` / page fade
- Hero radial gradients
- `prefers-reduced-motion` kill switch
- Storefront-chrome hiding (`body:has(.admin)`)
- `::selection`, focus ring base, scrollbar-free horizontal scrollers
