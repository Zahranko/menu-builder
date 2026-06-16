# PLAN.md — Build Plan (Menu Builder Beta: Web + Flutter)

> Re-read CLAUDE.md before working. Check off each task and commit after finishing it.
> Build order: WEB CORE first, then FLUTTER. If you stop mid-task, update CURRENT STATE.

## CURRENT STATE
- Nothing built yet. Next step: Phase 0, Task 1.

---

## Phase 0 — Project setup (web)
- [x] 1. Create Next.js app (App Router, TypeScript, Tailwind). Init git, first commit.
- [x] 2. Create Supabase project. Add env vars (.env.local): URL + anon key. Note in README.
- [x] 3. Wire Supabase client into Next.js. Verify connection.
- [x] 4. Project structure: /app, /components, /lib, /templates.

## Phase 1 — Data model, auth, shared contract
- [ ] 5. DB tables (Supabase migrations):
        - `sites` (id, owner_id, slug UNIQUE, business_name, template_id,
          card_style, bg_color, bg_image_url, logo_url, hero_title, hero_subtitle,
          tier ['free','t2','t3'] default 'free', published bool, created_at)
        - `products` (id, site_id, name, description, price, image_url, sort_order)
- [ ] 6. Define the SHARED DATA CONTRACT (TypeScript types + matching Dart later):
        document the exact shape of a Site and Product. Both clients use this.
- [ ] 7. Supabase email/password auth: login + signup (web).
- [ ] 8. Row Level Security: owners read/write only their own site & products.
- [ ] 9. Central logic module (/lib): slug validation (lowercase, no spaces,
        reserved words: login/api/admin/etc), publish rules, tier-gating helper
        (e.g. canCustomize(tier), canUseCustomDomain(tier)). Both clients rely on these rules.

## Phase 2 — Public page rendering (the core value)
- [ ] 10. TEMPLATE REGISTRY: central map `template_id -> component` + the data contract
         every template receives. Adding a template later = add one entry, nothing else.
- [ ] 11. Public route `/[slug]`: load site by slug. If unpublished/not found -> clean 404.
- [ ] 12. Template #1 (renders name, logo, hero, bg, product list via card style).
- [ ] 13. Template #2 (different layout, same data contract).
- [ ] 14. Product Card style A and style B (templates pick a card style).
- [ ] 15. Mobile-friendly + fast (server-rendered).

## Phase 3 — Web dashboard (form-based editor)
- [ ] 16. Dashboard home: list owner's site, "edit" + "view live" links.
- [ ] 17. Site settings form: business name, slug (uniqueness check), template picker,
         card-style picker, bg color, hero title/subtitle. GATE customize by tier.
- [ ] 18. Logo + background image upload to Supabase Storage; save URLs.
- [ ] 19. Product manager: add / edit / delete products.
- [ ] 20. Reorder products (sort_order; up/down or drag).
- [ ] 21. Publish / unpublish toggle.
- [ ] 22. Tier display + feature gating in UI (free can only add products;
         t2 unlocks customize; t3 shows custom-domain placeholder "coming soon").

## Phase 4 — Web PWA-ish polish & ship web core
- [ ] 23. Slug validation everywhere; empty/loading/error states.
- [ ] 24. Mobile-friendly layout pass on web dashboard.
- [ ] 25. Deploy to Vercel, connect domain, confirm `ourdomain.com/<slug>` live.
- [ ] 26. Smoke test: signup -> build menu -> publish -> view public page on phone.
- [ ] 27. README (run + deploy). >>> WEB CORE DONE. Backend now stable for Flutter. <<<

## Phase 5 — Flutter app (built against the stable backend)
- [ ] 28. Create Flutter project. Add `supabase_flutter`. Configure same Supabase project.
- [ ] 29. Port the DATA CONTRACT to Dart models (must match Phase 1 Task 6 exactly).
- [ ] 30. Auth screens (login/signup) using Supabase.
- [ ] 31. Dashboard home: owner's site, edit + "view live" (opens public URL).
- [ ] 32. Site settings form (same fields/gating as web). Reuse the shared rules logic
         conceptually — mirror it, don't invent different behavior.
- [ ] 33. Logo + bg image upload (image_picker -> Supabase Storage).
- [ ] 34. Product manager: add / edit / delete / reorder.
- [ ] 35. Publish / unpublish toggle + tier gating in UI.
- [ ] 36. Test full flow on a real device/emulator: matches web behavior 1:1.

## Phase 6 — Ship beta
- [ ] 37. Cross-check: a site edited on Flutter looks/behaves identically when edited on web.
- [ ] 38. Build Flutter release (Android first; iOS if accounts ready).
- [ ] 39. Final smoke test across web + app + public page.

---

## PARKED FOR LATER (do NOT build during beta)
- Templates 3+, product cards 3+
- Payments / Stripe / actual billing (tier FIELD exists now; charging does not)
- Ecommerce vertical (cart, checkout) — unlocked for Tier 3 later
- Custom domains (Tier 3 feature) — show "coming soon" for now
- "Pro" vertical
- Additional pricing tiers beyond free/$3/$7
- Owner analytics

## Pricing notes (revisit before charging)
- Free / $3 (t2) / $7 (t3). $3 has high relative payment-fee load (~12%);
  it works as a low entry tier because $7+ and future tiers carry margin.
- When billing is added, prefer annual billing to cut fee load and churn.
