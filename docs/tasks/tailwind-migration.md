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

## Stage 2 — layout per route (next)

Order (lowest risk first): `/custom` → `/sizes` → `/delivery` → `/faq` → `/about` → `/contact`
→ `/more` → `/caps` → `/caps/[id]` → `/` → admin.

Selectors to migrate: `.page`, `.sec`, `.ttl`, `.fbar`, `.search`, `.meta`, `.empty`, `.hscroll`,
`.cap-grid`, `.card`, `.ph`, `.cb`, `.crow`, `.tag`, `.hcard`, `.banner`, `.loc`, `.locr`,
`.fact`, `.facts`, `.sizes`, `.dgrid`, `.big`, `.dinfo`, `.blk*`, `.menu`, `.obar`, `.perks`,
`.cat`, `.hero`, `.slider`, `.site-header`, `.tabbar`, `.site-footer`, `.fab`, `.note`,
`.site-form`, `.admin-*`, table styles.

## Stays in CSS

- `@theme` brand tokens + shadcn variable mapping
- `@keyframes` / page fade
- Hero radial gradients
- `prefers-reduced-motion` kill switch
- Storefront-chrome hiding (`body:has(.admin)`)
- `::selection`, focus ring base, scrollbar-free horizontal scrollers
