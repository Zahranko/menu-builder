# Menu Builder (Beta)

A platform that lets business owners create a public menu page hosted at
`ourdomain.com/<slug>`. Owners manage their page from a web dashboard (Next.js)
and a native mobile app (Flutter). Both share one Supabase backend.

> Read `CLAUDE.md` for the full architecture rules and `PLAN.md` for the build plan.

## Status
Beta — "menu" vertical only. Ecommerce and "pro" verticals come later.

## Tech stack
- **Web:** Next.js (App Router, TypeScript), Tailwind CSS — deployed on Vercel
- **Mobile:** Flutter (Dart) using `supabase_flutter`
- **Backend:** Supabase (auth + Postgres + Storage)

## Tiers (beta)
- **Free** — our templates/branding, add products only
- **$3/mo** — customize (bg, logo, hero, template); route on our domain
- **$7/mo** — own custom domain + ecommerce access when it launches

(Tier gating is built now; actual billing/payments are parked for later.)

---

## Getting started (web)

### Prerequisites
- Node.js 18+ (use 22 LTS)
- A Supabase project (free tier is fine for building)

### Setup
1. Install dependencies:
   ```
   npm install
   ```
2. Create `.env.local` in the project root (this file is gitignored — never commit it):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   Find these in your Supabase dashboard under Project Settings -> API.
3. Run the dev server:
   ```
   npm run dev
   ```
   Open http://localhost:3000

### Deploy (later, Phase 5)
- Push to GitHub, import the repo in Vercel, add the same env vars in Vercel,
  connect your domain, confirm `ourdomain.com/<slug>` works live.

---

## Flutter app (Phase 5 — built after the web core is stable)
- Lives in its own folder (e.g. `/app`).
- Uses the SAME Supabase project and the SAME data contract as the web app.
- Setup instructions added when Phase 5 begins.

## Project conventions
- Site data is stored as structured rows in Supabase, NOT as HTML.
- Templates are added via a central template registry (`template_id -> component`).
- Commit after each completed task in PLAN.md.
