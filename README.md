# Menu Builder (Beta)

A platform that lets business owners create a public menu page hosted at
`ourdomain.com/<slug>`. Owners manage their page from a web dashboard (Next.js)
and a native mobile app (Flutter). Both share one Supabase backend.

> Read `CLAUDE.md` for architecture rules and `PLAN.md` for the build plan.

## Status
**Web core: complete.** Backend is stable — Flutter build (Phase 5) can begin.

## Tech stack
- **Web:** Next.js 16 (App Router, TypeScript), Tailwind CSS — deployed on Vercel
- **Mobile:** Flutter (Dart) using `supabase_flutter` — Phase 5
- **Backend:** Supabase (auth + Postgres + Storage)

## Tiers (beta)
- **Free** — our templates/branding, add products only
- **$3/mo (t2)** — customize (bg, logo, hero, template, card style); route on our domain
- **$7/mo (t3)** — custom domain (coming soon) + ecommerce when it launches

Tier gating is built; actual billing/payments are parked for later.

---

## Running locally (web)

### Prerequisites
- Node.js 18+ (22 LTS recommended)
- A Supabase project (free tier is fine)

### Setup
```bash
npm install
```

Copy `.env.local.example` to `.env.local` and fill in your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```
Find these in Supabase dashboard → **Project Settings → API**.

```bash
npm run dev
# Open http://localhost:3000
```

### Database setup
Migrations live in `supabase/migrations/`. Apply them via the Supabase SQL editor
or with the Supabase CLI:
```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Next.js — no build config changes needed.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**.
6. After deploy, go to **Project Settings → Domains** to connect your custom domain
   so public pages live at `ourdomain.com/<slug>`.

> The `[slug]` route is server-rendered on demand — it always reflects the latest
> published state without redeploying.

---

## Project structure
```
app/
  [slug]/         ← public menu page (server-rendered)
  dashboard/      ← owner dashboard (auth-guarded)
    site/         ← site settings, publish toggle
    products/     ← product manager
  (auth)/login/   ← login + signup
  api/health/     ← Supabase connection check
components/
  dashboard/      ← Nav, TierBadge, ImageUpload
lib/
  supabase/       ← browser + server clients
  types.ts        ← shared data contract (Site, Product, TemplateData)
  business.ts     ← slug validation, publish rules, tier gating
templates/
  registry.tsx    ← template_id → component map (add new templates here only)
  template1/      ← Light theme
  template2/      ← Dark theme
  cards/          ← CardA (grid), CardB (list)
supabase/
  migrations/     ← DB schema (sites + products tables, RLS policies)
```

## Key conventions
- Site data is stored as structured rows in Supabase, **not as HTML**.
- Templates render the data at view time — changing a template requires no DB change.
- Business logic (slug rules, publish rules, tier gating) lives in `lib/business.ts` only.
  Both the web dashboard and the Flutter app must use the same rules.
- Commit after each completed task in `PLAN.md`.

---

## Flutter app (Phase 5 — after web core is stable)
- Will use the same Supabase project and the same data contract as the web app.
- Setup instructions will be added when Phase 5 begins.
