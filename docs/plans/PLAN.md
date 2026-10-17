# IBN Larosh Enterprises — Cap Catalog Website Plan

**Tagline:** Values You Trust, Quality You Deserve · **BN No.:** 9882187
**What it is:** A mobile-first, browsable catalog of quality Hausa caps (Tajia / Kaftan-matching caps, fancy and custom-woven). No cart or payment: every "Order" button opens WhatsApp with the cap details pre-filled.

---

## 1. Business facts (from the flier)

| Item | Value |
|---|---|
| Call & WhatsApp | 08109080076 → `wa.me/2348109080076` |
| Location | Beside Tipper Garage, Okolowo Area, Ilorin, Kwara State |
| Available in | Bama · Maiduguri · Bangwal |
| Delivery | **Ilorin only** (stock also available in Bama, Maiduguri, Bangwal) |
| Services | Quality caps, affordable, custom sizes, bulk orders, weaving of any cap design |
| Sizes seen on photos | 21.5, 22, 23 (tag on each cap) |

---

## 2. Stack

```
┌───────────────────────── Browser ─────────────────────────┐
│ React + TS + Vite · Tailwind · shadcn/ui · Lucide         │
│ React Router · TanStack Query                              │
└───────────────┬───────────────────────────┬───────────────┘
                │ GET /api/caps             │ <img src=R2 public URL>
                ▼                           ▼
        ┌──────────────┐            ┌──────────────┐
        │ CF Worker    │──metadata─▶│ D1 (SQLite)  │
        │ (Hono API)   │            └──────────────┘
        │              │──images───▶┌──────────────┐
        └──────┬───────┘            │ R2 bucket    │
               │ POST /api/admin/*  │ caps/<id>.jpg│
               ▼                    └──────────────┘
        Admin only (Cloudflare Access or password + JWT)
```

- **Hosting:** Cloudflare Pages (frontend) + Worker (API). All on one account.
- **Images:** R2. Browser never holds R2 keys. Admin requests a **presigned PUT URL** from the Worker, uploads straight to R2, then saves the metadata row to D1.
- **Public reads:** enable the bucket's public access (custom domain such as `img.yourdomain.com`, or the `r2.dev` URL for testing). That is the "link" you can paste into HTML; it only exists after public access is on.
- **Alternative if D1 feels heavy:** a single `caps.json` in R2. Fine for under ~200 caps, but D1 gives filtering and no write conflicts.

---

## 3. Pages & routes

```
/                Home (auto-cycling hero slider)
/caps            Catalog (search + type + size filters)
/caps/:id        Cap detail + sticky Order bar
/custom          Custom order form -> WhatsApp message
/sizes           Size guide (inches -> cm chart)
/delivery        Delivery (Ilorin only) + shop pickup
/faq             FAQ accordion
/about           About + logo
/contact         WhatsApp, call, map link, other locations
/more            Mobile menu of the info pages
/admin           Login -> upload / edit / hide caps
*                404
```

**Mobile-first layout:** compact 58px header (logo + wordmark, search, WhatsApp), bottom tab bar (Home, Caps, Chat, Custom, More), 2-column card grid, horizontal scrolling filter chips, 44-48px tap targets. At 900px+ the tab bar becomes a top nav and the grid goes to 4 columns.

### Home
1. Sticky header: logo, nav (Caps, About, Contact), WhatsApp button
2. Hero: "Quality Caps", tagline, **Browse Caps** + **Order**, auto-cycling photo slider
3. Category tiles: Tajia · Kaftan caps · Fancy · Custom weave
4. Featured/new arrivals grid (6 caps)
5. Why us strip: Quality · Affordable · Custom sizes · Bulk orders
6. Where we are: Ilorin shop, Bama, Maiduguri, Bangwal + "Delivery in Ilorin" badge
7. Custom order CTA ("Weaving of any cap design of your choice")
8. Footer: address, number, BN No., social

### Catalog (`/caps`) — the core of the app
- Filters (left sheet on mobile): Category, Size (chips), Colour, Availability
- Search by name or design tag
- Sort: Newest, Size ascending
- Grid: 2 columns mobile, 3 tablet, 4 desktop. Card = photo, name, size chips, "Order" icon button
- Infinite scroll or "Load more" (24 per page)

### Cap detail
- Image gallery (swipe on mobile), zoom on tap
- Name, category, available sizes, colours, design tags, description
- Size selector → **Order on WhatsApp** (pre-filled)
- "Custom size / bulk?" link, "Similar caps" row

### Admin (`/admin`)
- Login (see §7)
- Upload form: drag-drop images (multi), name, category, sizes, colours, tags, price (optional), available toggle
- Client-side compress to ~1600px WebP before upload
- Table of caps: edit, hide, delete

---

## 4. Data model

```ts
type Category = "tajia" | "kaftan" | "fancy" | "custom";

interface Cap {
  id: string;            // nanoid
  name: string;          // "Navy Floral Tajia"
  category: Category;
  sizes: number[];       // [21.5, 22, 23]
  colors: string[];      // ["navy", "gold"]
  tags: string[];        // ["floral", "diamond"]
  images: string[];      // R2 object keys: caps/<id>/1.webp
  price?: number;        // NGN, optional → "Ask on WhatsApp"
  description?: string;
  available: boolean;
  featured: boolean;
  createdAt: string;
}
```

D1 table `caps` mirrors this (arrays stored as JSON text).

---

## 5. WhatsApp ordering

```ts
const PHONE = "2348109080076"; // 0810... → 234810...
export const orderLink = (cap: Cap, size?: number) => {
  const msg = [
    "Assalamu alaikum, I'd like to order this cap:",
    `Name: ${cap.name}`,
    size ? `Size: ${size}` : null,
    `Ref: ${cap.id}`,
    `Photo: ${imgUrl(cap.images[0])}`,
  ].filter(Boolean).join("\n");
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
};
```

Also: a general "Order / Custom design" button and a floating WhatsApp button on every page. The flier shows Bit.ly links but they're cut off, so the site uses the phone number directly.

---

## 6. Design system

**Direction:** warm, trustworthy, a little heritage. It should feel like the flier: deep green, cream and gold, with woven-pattern borders.

| Token | Value | Use |
|---|---|---|
| `--green-900` | `#0B3D24` | Header, footer, primary buttons |
| `--green-700` | `#14653B` | Hover, accents |
| `--gold-500` | `#B8862B` | Dividers, badges, highlights |
| `--cream-100` | `#FBF3DC` | Page background |
| `--cream-50` | `#FFFBF0` | Cards |
| `--ink` | `#1B1B18` | Body text |
| `--whatsapp` | `#25D366` | Order button only |

**Fonts (Google Fonts)**
- Headings: **Playfair Display** 600/700 (matches the serif "QUALITY CAPS" look)
- Body/UI: **Inter** 400/500/600
- Optional Arabic greeting flourish: **Amiri**

**Shape & motion**
- Radius 14px on cards, 999px on chips and buttons
- Card shadow soft and warm: `0 6px 20px rgba(11,61,36,.10)`
- Gold hairline dividers with a small diamond ornament
- Woven border: a repeating diamond/zigzag SVG pattern (header underline, hero frame)
- Hover: image zoom 1.04, 200ms. Respect `prefers-reduced-motion`

**Icons:** `lucide-react` for UI icons. WhatsApp is not in Lucide, so use the official WhatsApp glyph from `simple-icons` (CC0) as a local SVG component.

**Icons (Lucide)**
`Search`, `SlidersHorizontal`, `X`, `MessageCircle` (WhatsApp stand-in), `Phone`, `MapPin`, `Truck`, `Scissors` (custom weave), `Ruler` (sizes), `BadgeCheck`, `Package`, `ChevronLeft/Right`, `Upload`, `ImagePlus`, `Trash2`, `Pencil`, `Eye/EyeOff`, `LogIn`, `Menu`, `Star`

**shadcn components**
`Button`, `Badge`, `Card`, `Input`, `Select`, `Sheet` (mobile filters), `Dialog`, `Tabs`, `Carousel`, `Toggle-group` (size chips), `Skeleton`, `Sonner` (toasts), `Table`, `Form`, `Checkbox`, `Switch`, `Textarea`

**Accessibility/UX:** 44px tap targets, alt text from cap name, lazy-loaded images with fixed aspect ratio (4:3) to avoid layout shift, works well on low-end phones and slow networks (WebP, thumbnails, skeletons).

---

## 7. Admin security

- **Simplest good option:** Cloudflare Access on `/admin*` and `/api/admin/*` (email one-time PIN, free for small teams).
- **Fallback:** one password in a Worker secret → signed JWT in an httpOnly cookie.
- Presigned URLs expire in 5 minutes. Validate type (jpeg/png/webp) and size (≤ 5 MB) in the Worker.

---

## 8. Folder structure

```
ibn-larosh/
├─ apps/web/                  # Vite React TS
│  ├─ src/
│  │  ├─ components/ui/       # shadcn
│  │  ├─ components/          # CapCard, CapGrid, Filters, OrderButton, Header...
│  │  ├─ pages/               # Home, Catalog, CapDetail, About, Contact, Admin
│  │  ├─ lib/                 # api.ts, whatsapp.ts, img.ts, utils.ts
│  │  ├─ hooks/               # useCaps, useFilters
│  │  └─ assets/              # logo.svg, logo-full.svg, woven-pattern.svg
│  └─ index.html
└─ apps/api/                  # Cloudflare Worker (Hono)
   ├─ src/routes/caps.ts, admin.ts, upload.ts
   ├─ schema.sql
   └─ wrangler.toml           # R2 + D1 bindings
```

---

## 9. Build phases

| Phase | Deliverable |
|---|---|
| 0 | Export logos to PNG/SVG, create R2 bucket + enable public access, collect 20+ cap photos |
| 1 | Static site with local `caps.json`, all pages, WhatsApp links |
| 2 | Worker + D1 + R2, replace JSON with API |
| 3 | Admin login + upload + edit |
| 4 | Polish: SEO tags, OG image, analytics (Cloudflare Web Analytics), PWA install |

---

## 10. Open items for you

1. **Logos:** the share links open, but the image download is blocked from here. The prototype uses a crop of the logo from the flier. Send the original files for a crisp header logo.
2. Is 08109080076 the WhatsApp number to use? (Flier says "Call and WhatsApp".)
3. Show prices, or "Ask on WhatsApp"?
4. Confirm categories: the flier says Tajia for your **Kaftan**, so I used Tajia / Kaftan-matching / Fancy / Custom.
5. Custom domain? Needed for clean R2 image URLs.
