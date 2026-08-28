# samir_website — Project Knowledge

## What This Is

Personal portfolio site for a broadcast/OB engineer. Single-page homepage (`app/page.tsx`) with statically generated case-study pages (`app/events/[slug]/page.tsx`). Content managed via TinaCMS.

**Stack:** Next.js 16.3.1 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, canvas-confetti, lucide-react, TinaCMS 3.x.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server with TinaCMS visual editor (port 3000) |
| `npm run lint` | ESLint |
| `npm run build` | Production build + typecheck (no standalone typecheck script) |
| `npm run build:cms` | `tinacms build && next build` — regenerates Tina client, then builds. Use for Pages deploy. |

**No test framework** is configured. `npm run build` is the only typecheck.

## Architecture

### Data Flow

1. **TinaCMS** stores all editable content in `content/` as JSON files
2. `lib/cms.ts` is the **server-only data layer** — runs `client.queries.*` from `tina/__generated__/client.ts`
3. Returns `{data, query, variables}` tuples + flattened `homepageValue` (typed in `lib/types.ts`)
4. Homepage reads from `content/pages/home.json` (singleton, `ui.allowedActions {create:false, delete:false}`)
5. Case studies live in `content/events/*.json` — added automatically

### Client Re-hydration

- `app/home-client.tsx` (homepage) and `components/EventDetail.tsx` (event detail) are `"use client"` components
- They pass real tuples into `useTina` from `tinacms/dist/react`
- `lib/cms.ts` must be imported as `import type` only into client components
- Form selection: homepage → `"content/pages/home.json"`, event detail → event's `_sys.path`

### Featured Events

`featuredEvents` on homepage is a **plain string list of file paths** (e.g., `content/events/<slug>.json`), NOT a Tina reference field. Tina `reference` with `list:true` inside documents breaks GraphQL codegen (fragment-spread error). Paths are resolved to `CaseStudy[]` at build time in `lib/cms.ts`.

### Media Placeholders

Every media slot renders a styled placeholder when its path/URL is empty string. Set in TinaCMS to go live:
- `identity.portrait` (hero)
- `identity.showreelUrl` (hero CTA + showreel link-out)
- `showreelSection.videos[].thumb/videoUrl` (homepage video gallery)
- Case study `heroImage`/`gallery[]`/`videoUrl`

## File Structure

```
app/
  page.tsx          — Homepage (server component)
  home-client.tsx   — Homepage client wrapper (useTina)
  layout.tsx        — Root layout, fonts, metadata
  globals.css       — Tailwind v4 theme tokens + custom classes
  events/
    [slug]/page.tsx — Case study detail pages (static gen)
  robots.ts
  sitemap.ts
components/         — All client components ("use client")
  Header.tsx        — Scroll-spy nav
  Hero.tsx
  Services.tsx
  FlagshipEvents.tsx
  Showreel.tsx
  Faq.tsx
  TestimonialBanner.tsx
  EventDetail.tsx   — Case study detail
  MediaFrame.tsx    — Image/video wrapper with placeholders
  MobileActionBar.tsx
  Footer.tsx
  BackToTop.tsx
  Reveal.tsx
lib/
  cms.ts            — Server data layer (Tina queries + local fallback)
  types.ts          — TypeScript interfaces
  utils.ts          — cn() (clsx + tailwind-merge), formatTimecode(), toEmbedUrl()
tina/
  config.ts         — TinaCMS schema definition
  __generated__/    — Generated client, types, queries
content/
  pages/home.json   — Homepage singleton document
  events/*.json     — Case study documents
  equipment/*.json  — Equipment categories
  timeline/*.json   — Career timeline
```

## Design Conventions

### Theme (Tailwind v4 `@theme` in `app/globals.css`)

- **Canvas:** `bg-canvas` (#f3f7f6) — page background
- **Paper:** `bg-paper` (#ffffff) — cards/surfaces
- **Ink:** `text-ink` (#1a2b32) — body text
- **Muted:** `text-muted` (#55696f) — secondary text
- **Hairline:** `border-hairline` (#dbe6e3) — borders
- **Signal:** `bg-signal` (#239ba7) — primary teal accent
- **Signal Tint:** `bg-signal-tint` (#dff0f2)

### Global Helper Classes

- `fluid-h1`, `fluid-h2`, `fluid-h3`, `fluid-body` — responsive typography
- `font-display` — Fraunces serif
- `eyebrow` — mono micro-labels above section headings
- `card-lift` — hairline card with hover elevation
- `bg-dots` — subtle dot texture for media placeholders

### Fonts (via `next/font/google` in `layout.tsx`)

- **Fraunces** — display serif (use `font-semibold` + `italic`, not extrabold)
- **Inter** — body text
- **JetBrains Mono** — micro-labels only

### Section Eyebrow Numbering

01 The Engineer (`#story`), 02 Capabilities, 03 Case Studies, 04 Showreel, 05 Tech Stack, 06 Endorsements, 07 Contact.

### Section Anchor IDs

Tracked by `components/Header.tsx` scroll-spy: `hero, story, services, events, showreel, rack, contact`. New sections must be added there and in nav.

## Key Gotchas

1. **Next.js 16 — `params` is a Promise:** Dynamic route `params` must be `await`ed (see `app/events/[slug]/page.tsx`).

2. **Build-time TinaCloud schema sync:** `tinacms build` checks remote schema against local `tina/config.ts`. After schema changes, push to GitHub first to trigger Tina re-index, or use `npx tinacms build --skip-cloud-checks --content=local` locally.

3. **`cacheDir` churn:** Revert machine-specific `cacheDir` path changes in `tina/__generated__/client.ts` before committing (CI regenerates with its own path).

4. **SEO domain hardcoded in 4 places:** `app/layout.tsx` (metadata/OG), `app/page.tsx` (JSON-LD), `app/robots.ts`, `app/sitemap.ts` — all reference `samirelgammal.com`.

5. **Server/client boundary:** `components/` = client components only. `app/` pages = server components. No server-only logic in `components/`.

6. **Path alias:** `@/*` → repo root.

7. **Static export:** Production builds use `output: "export"` (GitHub Pages). Tina dev mode disables this.

8. **Build requires network:** `next/font` Google fonts fetch at build time.

## TinaCMS Collections

| Collection | Path | Notes |
|---|---|---|
| `homepage` | `content/pages/` | Singleton (`home.json`), UI create/delete disabled |
| `event` | `content/events/` | Case studies, auto-picked up |
| `equipment` | `content/equipment/` | Equipment categories |
| `timeline` | `content/timeline/` | Career timeline |

## Key Types (from `lib/types.ts`)

- `Homepage` — top-level document: identity, hero, navigation, servicesSection, eventsSection, showreelSection, testimonialSection, faqSection, footerSection
- `CaseStudy` — event/case-study with slug, title, category, specs, signal flow, challenges, etc.
- `Identity` — global contact/status info
- `ServiceTier`, `FaqItem`, `Testimonial`, `ShowcaseVideo` — section data types
