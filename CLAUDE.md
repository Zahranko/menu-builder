# CLAUDE.md — Standing Instructions (read this at the start of EVERY session)

## What we are building
A platform that lets a business owner create a public "menu" page hosted on our
domain at a path route: `ourdomain.com/<slug>`.

There are TWO owner-facing dashboards (both built in this beta):
1. A **web dashboard** (Next.js)
2. A **native mobile app** (Flutter)
Both let the owner log in and manage their menu page. They share ONE backend.

The public published pages are rendered ONLY by Next.js. Flutter never renders them.

This is the BETA. Only the "menu" vertical. Ecommerce and "pro" verticals come later.

## What the owner can do
- Pick a template (beta: 2 templates)
- Set background color or background image
- Upload a brand logo
- Edit the hero (title + subtitle)
- Add / edit / delete / reorder products (name, description, price, image)
- Publish / unpublish -> page live at `ourdomain.com/<slug>`

## Pricing tiers (beta)
- **Free**: our templates, our branding, can only add products. Funnel tier.
- **$3/mo (Tier 2)**: customize (bg, logo, hero, template choice); route on our domain.
- **$7/mo (Tier 3)**: own custom domain + access to ecommerce when it launches.
- More tiers will be added AFTER beta. Build tier logic so tiers are easy to extend.
- NOTE: billing/Stripe is PARKED for now — build the tier *field* and gating, not payments yet.

## Core architecture rules (do not change without asking)
- **Editor is FORM-BASED**, not drag-and-drop.
- **Site data is stored as structured JSON/rows in the DB, NOT as HTML.**
  A page = data + a chosen template. Templates render the data at view time.
- **Routing is PATH-BASED**: `ourdomain.com/<slug>`. (Custom domains = Tier 3, later.)
- **ONE shared backend**: both web and Flutter read/write the SAME Supabase data
  with the SAME data contract. Business logic (slug rules, publish rules, tier gating)
  must live in ONE place both clients call — never duplicated per client.
- **Template registry pattern**: a central map `template_id -> component` plus a fixed
  data contract every template consumes. Adding a template later must NOT require
  changing the data model, the editor, or the API. Keep this extensible.

## Build order (IMPORTANT)
1. Web core first: data model, auth, public pages, web dashboard. Get it fully working.
2. THEN build the Flutter app against that proven, stable backend.
Do not start Flutter until the web backend + data contract are stable.

## Tech stack (do not swap without asking)
- Web: Next.js (App Router, React, TypeScript), Tailwind CSS. Deploy: Vercel.
- Mobile: Flutter (Dart), using `supabase_flutter`.
- Backend: Supabase (auth + Postgres + Storage).

## Scope discipline
- Beta = **2 templates**, **2 product-card styles**. Do NOT build 10.
- Do NOT build: payments/Stripe, ecommerce cart/checkout, custom domains, "pro" vertical.
- Tier gating = yes (gate features by tier field). Charging money = later.
- If a task feels like scope creep, STOP and ask before building.

## Working rules
- After each task in PLAN.md: check it off AND commit to git with a clear message.
- Keep commits small and frequent.
- If you hit the usage limit mid-task, update the `## CURRENT STATE` block at the top
  of PLAN.md: what's done, what's the exact next step.
- Clean, typed, simple code. Don't add heavy dependencies without asking.
- Never delete user data or migrations without asking.

## How to resume after a break / limit reset
1. Re-read CLAUDE.md and PLAN.md.
2. Find the CURRENT STATE note or first unchecked task.
3. Continue from there. Commit after each task.
