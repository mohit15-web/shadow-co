# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

SHADOW CO. — a chapter-based streetwear brand site built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Frontend only: there is no backend, CMS, or payment integration. All content (chapters, products, prices, imagery) is mock/placeholder data living in `lib/`, and the cart is a client-side localStorage mock with no real checkout.

## Commands

```bash
npm run dev     # start dev server (Turbopack)
npm run build   # production build — run this after any non-trivial change
npm run lint    # eslint (flat config, eslint.config.mjs)
npm run start   # serve the production build
```

There is no test runner configured in this repo (no Jest/Vitest/Playwright). Don't assume one exists.

Package manager is npm (`package-lock.json`); do not introduce a pnpm/yarn lockfile.

## Architecture

### Data layer — the single source of truth

Everything editorial lives in `lib/`, not scattered across components:

- `lib/chapters.ts` — chapter records (slug, number, title, manifesto). Only `the-unheard` exists; adding a new chapter is adding one more entry here plus assets, not a template change.
- `lib/products.ts` — product records (code, price, sizes, copy, image paths) plus shared placeholder-content constants (`DETAILS_PENDING`, `SIZE_RUN_NOTE`) and the `formatPrice()` helper. `getProduct()` / `getProductsByChapter()` are the lookup helpers used everywhere.
- `lib/images.ts` — the atmosphere-photography set (`atmospherePhotos`, `photoUrl()`), used across the hero, philosophy section, and chapter pages.
- `lib/cart-context.tsx` — `CartProvider` + `useCart()`: a `useReducer`-based cart persisted to `localStorage` (key `shadow-co-cart`). No server round-trip.

Images are local files under `public/images/{products,atmosphere}/`, not remote-hosted — an earlier attempt to hotlink `picsum.photos` directly was replaced with locally downloaded copies because Next's image optimizer saw intermittent failures against it under rapid requests. Keep new imagery local rather than re-introducing a remote host.

### Routing

Standard App Router dynamic-route pattern used for both chapters and products: `app/chapters/[slug]/page.tsx` and `app/product/[slug]/page.tsx` both use `generateStaticParams()` (from the `lib/` arrays) and an async `generateMetadata()`. Everything is statically generated at build time — there's no runtime data fetching.

### Styling — Tailwind v4, CSS-first

Design tokens (colors, type scale) are defined as CSS custom properties in `app/globals.css` under `:root` and re-exposed to Tailwind via `@theme inline`, not in a `tailwind.config`. Color roles: `bg`, `surface`, `surface-2`, `ink`, `paper`, `paperink`, `muted`. Type scale: `text-display` / `text-head` / `text-lead` / `text-body` / `text-small` (fluid `clamp()` sizes).

**Cascade-layer gotcha:** Tailwind v4's utilities live inside `@layer utilities`. Per the CSS spec, *any* unlayered rule always wins over a layered one regardless of specificity. A plain `a { color: inherit }` added to `globals.css` outside an `@layer` block will silently beat every `text-*` utility applied to a link, anywhere on the site, with no warning — this caused a real invisible-button-text bug in this project. Only add bare (non-utility) selectors to `globals.css` for properties that are never meant to be overridden by a utility class on that same element; when in doubt, style via Tailwind classes in the component instead of adding another global selector.

### Motion

Framer Motion only — the project deliberately avoids mixing in GSAP. `components/Reveal.tsx` exports the three primitives used for standard scroll entrances: `Reveal` (single fade+rise), and `RevealGroup`/`RevealItem` (staggered children). Both respect `prefers-reduced-motion` via `useReducedMotion()`; a global CSS rule in `globals.css` also collapses animation/transition durations for reduced-motion as a blanket fallback.

`components/Hero.tsx` has a bespoke signature animation: the homepage hero cycles through three atmosphere photos via scroll-linked `clip-path: circle()` keyframes (an expanding/closing iris centered on the title), built with `useScroll` + `useTransform` against a tall (`260svh`) pinned wrapper. This is intentionally non-trivial — don't replace it with a generic crossfade without checking in; it was iterated on specifically because simpler approaches (opacity dissolve, slide+zoom) were tried and rejected.

### Design QA gate

`.agents/skills/design-taste-frontend/` is a vendored skill providing a researched "anti-slop" art direction and a real-browser inspector. This project's direction (`pinned-poster`) was dealt by its `draw.mjs` and is saved at `.taste-skill/direction.json`. After any visible UI change, re-run its gate against a production build:

```bash
npm run build && npm run start -- -p 4310 &
node .agents/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:4310/<path>
```

House rules it enforces (and that existing code already follows) include: no gradients, no hairline dividers outside real tables/forms (use a `bg-surface`/`bg-surface-2` tone step instead), no monospace text outside real `<code>` (product SKUs use `<code className="font-mono-label">`, nothing else does), headlines no more than two lines at any width, and no "eyebrow" labels sitting directly above a heading. Some rule exceptions are deliberately allowed per-page (chapter/drop numbering, the off-white `paper` tone, the pinned-title-over-photo hero) — see prior inspector runs for the `--allow` list used.

### Placeholder content

Prices (`lib/products.ts`), product photography (`public/images/products/`), and the legal pages (`app/{shipping,returns,privacy,terms}/page.tsx`) are explicitly illustrative placeholders, not approved final content — this is by design, not something to "fix" unprompted. The product photography is generic free-license stock (not real SHADOW CO. merchandise); garment silhouettes are drawn/photographed stand-ins.

### Note on AGENTS.md

`AGENTS.md` at the repo root is auto-generated and re-written by `next dev` itself (see `node_modules/next/dist/server/lib/generate-agent-files.js`) — it's not hand-authored project guidance, just Next's own version-drift warning.
