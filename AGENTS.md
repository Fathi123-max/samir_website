<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# samir_website

Personal portfolio for a broadcast/OB engineer. Single-page site (`app/page.tsx`) plus statically generated case-study pages at `app/events/[slug]/page.tsx`. Stack: Next.js 16.3.1 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, canvas-confetti, lucide-react.

## Commands

- `npm run dev` — dev server (port 3000)
- `npm run lint` — ESLint
- `npm run build` — production build; this is the only typecheck (`next build` runs it). No standalone typecheck script and **no test framework** is configured.
- `npm run build:cms` — `tinacms build && next build`: regenerates the Tina generated client/admin, then builds. Use this for the production/Pages deploy (fetches live content from TinaCloud at build time).

## Architecture

- **All homepage content comes from a single TinaCMS document at build time.** `lib/cms.ts` is the server-only data layer: it runs the generated `client.queries.*` (from `tina/__generated__/client.ts`) and returns the real `{data, query, variables}` tuple plus a flattened typed `homepageValue` (typed in `lib/types.ts`). The homepage is a singleton document `content/pages/home.json` (collection `homepage`, `ui.allowedActions {create:false, delete:false}` + `match {include:"home"}`) that holds **every** section as editable fields: `identity`, `hero`, `navigation`, `servicesSection`, `eventsSection`, `showreelSection`, `testimonialSection`, `faqSection`, `footerSection`. `getCmsData()` feeds the homepage; `getEventSlugs()`/`getEvents()`/`getEventBySlug()` feed `generateStaticParams`/`generateMetadata` in `app/events/[slug]/page.tsx` + `app/sitemap.ts`. Add a case study by adding a file in `content/events/*.json` (collection `event`) — it is picked up automatically.
- **Featured case studies on the homepage** are a plain `string` list of event file paths (`featuredEvents`, e.g. `content/events/<slug>.json`) — **not** a Tina `reference` field. A `reference` field with `list:true` inside a document object breaks Tina's GraphQL codegen (fragment-spread error), so refs are stored as paths and resolved to `CaseStudy[]` at build time in `lib/cms.ts` (`flattenHomepage(raw, events)` matches each path against the full event list; `getCmsData()`/`getEventBySlug()` pass that list in).
- **Client re-hydration for visual editing:** `app/home-client.tsx` (homepage) and `components/EventDetail.tsx` (event detail) are `"use client"` components that pass the real tuples into `useTina` from `tinacms/dist/react`. `lib/cms.ts` and the tuples must be imported as types only (`import type`) into client components. Form selection uses `experimental___selectFormByFormId`: homepage → `"content/pages/home.json"`; event detail → the event's `_sys.path`. On the homepage, `featuredEvents` in the raw `useTina` data is just a string list, so the client merge preserves the server-resolved `CaseStudy[]` (`base.eventsSection.featuredEvents`) instead of re-mapping.
- **Media placeholders:** every media slot renders a styled placeholder when its path/URL is an empty string. Setting these in TinaCMS makes them go live: `identity.portrait` (hero), `identity.showreelUrl` (hero CTA + showreel link-out), `showreelSection.videos[].thumb/videoUrl` (homepage video gallery, click-to-play), case-study `heroImage`/`gallery[]`/`videoUrl`. Case-study pages render 4 labeled photo slots + 1 video slot even when data is empty.
- **Build-time remote schema sync gotcha:** `tinacms build` (and thus `build:cms`) checks the TinaCloud remote schema against the local `tina/config.ts` and fails if they differ (e.g. `Type 'HomepageIdentitySocials' was added`). Pushing to GitHub triggers Tina's re-index so the remote schema catches up — then CI's `build:cms` passes. After any `tina/config.ts` change, push first, or locally use `npx tinacms build --skip-cloud-checks --content=local` to verify the client/types regenerate before pushing. Revert the machine-specific `cacheDir` churn in `tina/__generated__/client.ts` before committing (CI regenerates it with its own path).
- **Server/client boundary:** every component in `components/` is a client component (`"use client"`). Only the `app/` pages are server components. Don't add server-only logic (fs, direct DB, etc.) to `components/`.
- Path alias `@/*` → repo root.
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) and `formatTimecode()`.

## Design conventions (keep consistent)

- Editorial Light theme: white canvas (`#ffffff`), warm paper bands (`#faf9f7`), ink text (`#18181b`), hairline borders (`#e4e4e7`), single signal-orange accent (`#ea580c`). Colors are Tailwind v4 theme tokens defined in `app/globals.css` under `@theme`: use `bg-canvas`, `bg-paper`, `text-ink`, `text-muted`, `border-hairline`, `bg-signal`, `bg-signal-tint`.
- Reuse helper classes from `app/globals.css`: `fluid-h1/h2/h3`, `fluid-body`, `font-display`, `eyebrow` (mono micro-labels above section headings), `card-lift` (hairline card with hover elevation). Add new global effects there (Tailwind v4 `@theme`, CSS-first — no `tailwind.config`).
- Section numbering in eyebrows: 01 The Engineer (`#story`), 02 Capabilities, 03 Case Studies, 04 Showreel, 05 Tech Stack, 06 Endorsements, 07 Contact.
- Google Fonts loaded via `next/font/google` in `app/layout.tsx`: Fraunces (display serif; use `font-semibold` + `italic` accents, not extrabold), Inter (body), JetBrains Mono (micro-labels only).
- Media: photo/video slots go through `components/MediaFrame.tsx` — renders `next/image` when a `/public` path is set in CMS data (`identity.portrait`, `CaseStudy.heroImage/gallery/videoUrl`, `showreelSection.videos[].thumb`), otherwise an elegant dotted placeholder. Empty string = placeholder.
- Mobile-first + thumb reach: fixed bottom quick-action bar on <lg via `components/MobileActionBar.tsx` (rendered in `app/page.tsx`; Footer compensates with bottom padding). Author styles base-first, enhance with `sm:`/`lg:` prefixes.
- Section anchor IDs are tracked by `components/Header.tsx` (scroll-spy list): `hero, story, services, events, showreel, rack, contact`. New sections must be added to that list and nav.

## SEO / domain gotcha

Production domain `samirelgammal.com` is hardcoded in **four** places that must stay in sync: `app/layout.tsx` (metadata/OG), `app/page.tsx` (JSON-LD Person schema), `app/robots.ts`, `app/sitemap.ts`.

## Next.js 16 quirks

- Dynamic route `params` is a **Promise** — must be awaited (see `app/events/[slug]/page.tsx`).
- `next/font` Google fonts fetch at build time; builds need network access.
- `.next/` and `tsconfig.tsbuildinfo` are gitignored build artifacts — don't commit.
