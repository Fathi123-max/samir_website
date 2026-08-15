<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# samir_website

Personal portfolio for a broadcast/OB engineer. Single-page site (`app/page.tsx`) plus statically generated case-study pages at `app/events/[slug]/page.tsx`. Stack: Next.js 16.3.1 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, framer-motion, canvas-confetti, lucide-react.

## Commands

- `npm run dev` — dev server (port 3000)
- `npm run lint` — ESLint
- `npm run build` — production build; this is the only typecheck (`next build` runs it). No standalone typecheck script and **no test framework** is configured.

## Architecture

- **All content is data-driven.** `lib/data.ts` is the single source of truth: `PERSONAL_INFO`, `FLAGSHIP_EVENTS`, `SERVICES`, `EQUIPMENT_STACK`, `TIMELINE`, `TESTIMONIALS` (typed in `lib/types.ts`). Add a case study by appending to `FLAGSHIP_EVENTS` — `generateStaticParams` in `app/events/[slug]/page.tsx` and `app/sitemap.ts` pick it up automatically.
- **Server/client boundary:** every component in `components/` is a client component (`"use client"`). Only the `app/` pages are server components. Don't add server-only logic (fs, direct DB, etc.) to `components/`.
- Path alias `@/*` → repo root.
- `lib/sound.ts` = Web Audio synth; persisted via `localStorage` key `broadcast_sound_enabled`. Always guard `window` usage (already done; keep it that way).
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) and `formatTimecode()`.

## Design conventions (keep consistent)

- Dark broadcast/OB theme: base `#07090e`, amber accents, cyan/mono labels. Components use hardcoded hexes (e.g. `#0d1421`, `#1e2c44`), not only CSS vars — stay within this palette.
- Reuse helper classes from `app/globals.css`: `fluid-h1/h2/h3`, `font-display`, `bg-scanlines`, `bg-led-grid`, `bevel-panel`, `bevel-button`, `glow-live/amber/teal/green`. Add new global effects there (Tailwind v4 `@theme`, CSS-first — no `tailwind.config`).
- Google Fonts loaded via `next/font/google` in `app/layout.tsx`: Syne, Plus Jakarta Sans, JetBrains Mono.
- Section anchor IDs are tracked by `components/Header.tsx` (scroll-spy list): `hero, story, simulator, services, events, rack, calculator, contact`. New sections must be added to that list and nav.

## SEO / domain gotcha

Production domain `samirelgammal.com` is hardcoded in **four** places that must stay in sync: `app/layout.tsx` (metadata/OG), `app/page.tsx` (JSON-LD Person schema), `app/robots.ts`, `app/sitemap.ts`.

## Next.js 16 quirks

- Dynamic route `params` is a **Promise** — must be awaited (see `app/events/[slug]/page.tsx`).
- `next/font` Google fonts fetch at build time; builds need network access.
- `.next/` and `tsconfig.tsbuildinfo` are gitignored build artifacts — don't commit.
