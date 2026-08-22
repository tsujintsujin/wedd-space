# Claude.md — wedd.space

## Project Overview

Draft landing page for **wedd.space**, a SaaS product for building wedding websites (RSVP, story, gallery, schedule, registry). Built with Next.js 16, React 19, Tailwind CSS 3 — mirrors the known-good config from `../Portfolio` (same Tailwind v3 setup, avoids the Tailwind v4 dev-mode bug documented there).

**Domain:** wedd.space (purchased, not yet pointed at a deployment)
**Local:** `npm run dev` at http://localhost:3030 (port 3030 to avoid clashing with Portfolio/Dashboard)
**Live demo referenced on the page:** https://cambial-wedding.vercel.app/ (repo at `../Free Projects/Clients/GalleryType`, incomplete)

## Current state (2026-08-21)

Marketing landing page only — Hero, Features, Showcase (links out to the Cambial demo), Pricing, CTA, Footer. No auth, no dashboard, no actual site-builder yet. The CTA email form is a static `<form>` with no submit handler wired up.

## Supabase

New project, same Supabase account as the Dashboard project (justin.masiga.94@gmail.com), separate project from Dashboard's — not a separate account. `lib/supabase/client.ts` and `lib/supabase/server.ts` are scaffolded using `@supabase/ssr` but **no schema exists yet** and `.env.local` is not filled in.

To connect:
1. In the Supabase dashboard, create a new project (e.g. "wedd-space").
2. Settings → API → copy the Project URL and anon public key.
3. Copy `.env.local.example` to `.env.local` and paste them in (plus the service-role key if server-side admin actions are needed later).
4. No migrations exist yet — schema (couples, events, RSVPs, registry links, etc.) needs designing before the actual product features are built.

## What's NOT built yet

- Auth / account creation for couples
- The actual site builder (this repo is the marketing page, not the product)
- RSVP form + database wiring
- Any Supabase schema/migrations
- Payment flow for the Premium tier
- Real analytics/email capture on the CTA form

## Design system

Palette and type pairing mirror Portfolio's warm-neutral system, shifted toward a dusty-rose/ivory bridal tone instead of terracotta:
- `bg` #FBF5EF, `ink` #2B2018, `accent` #B15B45 (dusty rose/terracotta), `secondary` #5C7A5E (sage), `gold` #B8934A
- Display font: Fraunces (serif, romantic-but-modern — deliberately not a script/invitation font)
- Body font: Figtree

## Notes for Claude

- Read this file first before starting work.
- Diagnose before acting — same discipline as Portfolio (check cache/server restart before assuming a package is broken).
- Test visually — run the dev server and actually look at the page, don't just read code.
- Ask before scaffolding auth, payments, or a database schema — none of that exists yet and it's a real product decision, not a style choice.
