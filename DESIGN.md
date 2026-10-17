# DESIGN.md — Visual & UX System

Derived from `docs/reference/prototype.html` (the approved prototype) — treat it as the
canonical implementation. This file is the spec; match the prototype's look exactly.

## Brand

**IBN Larosh Enterprises** — quality Hausa caps (Tajia / Kaftan-matching / Fancy / Custom).
Tagline: *Values You Trust, Quality You Deserve* · BN No. 9882187 · Ilorin, Kwara State.
Feel: warm, trustworthy, a little heritage — like the flier: deep green, cream, gold,
woven patterns. Assets: `public/brand/logo.png` (header mark), `public/brand/emblem.png`.

## Design tokens

| Token | Value | Use |
|---|---|---|
| `--g9` green-900 | `#0A3B22` | Header, footer, primary buttons, active pill |
| `--g7` green-700 | `#12683A` | Hover, accents, links |
| `--gold` | `#C9962F` | Buttons (gold), icons, step numbers |
| `--gold-l` | `#E8C877` | On-green highlights, hero `em`, wordmark small |
| `--cream` | `#FAF4E1` | Page background |
| `--paper` | `#FFFDF6` | Cards, tab bar |
| `--ink` | `#14231B` | Body text |
| `--mut` | `#667066` | Muted text |
| `--line` | `#E8DFC0` | Hairlines/borders |
| `--wa` | `#25D366` | WhatsApp accent ONLY (glow, highlights) |
| `--wa-solid` | `#07864A` | WhatsApp button/tab/FAB surface — white glyph needs 4.65:1 |

Tailwind v4: define these in `@theme` inside `src/app/globals.css`
(`--color-g9`, `--color-gold`, `--color-cream` … software decides names; tokens above are the values).

## Typography

- Headings: **Playfair Display** 600/700, serif — matches the flier's "QUALITY CAPS" look.
- Body/UI: **Inter** 400/500/600, 15px base, line-height 1.55.
- Load via `next/font/google` (self-hosted by Next; no @import links).
- Wordmark: "IBN LAROSH" bold serif, letterspaced; "ENTERPRISES" tiny (`8.5px`, `.38em` tracking, gold-light).

## Shape, elevation, structure

- Radius: cards 18px (`--r`), buttons/chips 999px, icon bubbles 12px.
- Card shadow: `0 8px 24px rgba(10,59,34,.10)` — soft, warm, green-tinted.
- Sticky header: 58px tall, green-900, gold hairline under (`.35` alpha), logo bubble 40px cream.
- Max content width 1100px, side padding 14px.
- Mobile bottom tab bar: fixed, ≈62px + `safe-area-inset-bottom`, paper bg blur, 5 tabs
  (Home / Caps / **Chat** / Custom / More); active tab = green pill w/ white icon; Chat pill = WhatsApp green.
- Desktop ≥900px: tab bar hidden, top `nav` (pills on hover/active), grid 4 cols.

## Components (prototype classes → next equivalents)

| Prototype | Next.js | Notes |
|---|---|---|
| `.btn` (+ `.gold`, `.wa`, `.block`, `.ghost`) | `components/ui/button` | min-h 48px, active scale `.97` |
| `.card` / `CapCard` | `components/cap-card` | photo → name → sizes → View + WhatsApp order |
| `.cat` / `.chips` | filter chips | horizontal scroll, snap |
| `.tabs` | `components/tab-bar` | client component (active route) |
| `.toast` | simple portal or `sonner` | 2.2s |
| `.sh` (section head) | `components/section-head` | h2 + optional "See all →" |
| `.perks` strip, `.locr`, `.fact` | content sections | gold icon + label |

Icons: **lucide-react**, 20px, stroke 2. WhatsApp glyph: local SVG (`fill`), not Lucide — see phone link.

## Key screens (per PLAN.md §3 — unchanged)

Routes: `/` `/caps` `/caps/[id]` `/custom` `/sizes` `/delivery` `/faq` `/about` `/contact` `/admin`.
Home = hero (auto-cycling 3-slide) + perks + category tiles + featured grid (6) +
"How to order" steps + green banner CTA + locations + footer.
Catalog = sticky filter bar (chips), 2-col mobile → 4-col desktop, 24/page, "Load more".
Detail = gallery, name/category/sizes/colours/tags/description, size chips → sticky **Order on WhatsApp** bar.
Colors/adjectives align with `CATS` copy from prototype (Tajia/Kaftan caps/Fancy/Custom weave).

## WhatsApp ordering (the core interaction)

Pre-filled message, per prototype: greeting → cap name → size (if chosen) → ref id.
Deep link `wa.me/2348109080076` via `src/lib/whatsapp.ts`; message ends with
`Delivery: Ilorin` (same content as prototype.html). Floating WhatsApp button on all pages.
No cart, no payment, no backend order store. **Never** build one without owner sign-off.

## Motion & accessibility

- Transitions 150–200ms; hero fade; image zoom `1.04` on hover; respect `prefers-reduced-motion`.
- All tap targets ≥44px (buttons 48px, tab pills 48×28 w/ padding).
- Alt text = cap name; `aspect-ratio 4/3` + fixed heights → no CLS; lazy-load below fold.
- Works on low-end Android + slow 3G: skeletons, WebP/thumbnails, minimal JS on content pages.
- Arabic greeting ("Assalamu alaikum") is pre-filled text; site copy in English.
