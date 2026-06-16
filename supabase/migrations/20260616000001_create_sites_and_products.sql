-- Sites: one per owner (one-to-one with auth.users for the beta)
create table public.sites (
  id              uuid primary key default gen_random_uuid(),
  owner_id        uuid not null references auth.users(id) on delete cascade,
  slug            text not null unique,
  business_name   text not null default '',
  template_id     text not null default 'template_1',
  card_style      text not null default 'card_a',
  bg_color        text not null default '#ffffff',
  bg_image_url    text,
  logo_url        text,
  hero_title      text not null default '',
  hero_subtitle   text not null default '',
  footer_text       text not null default '',
  footer_hours      text not null default '',
  footer_address    text not null default '',
  social_instagram  text not null default '',
  social_facebook   text not null default '',
  social_twitter    text not null default '',
  social_tiktok     text not null default '',
  tier            text not null default 'free' check (tier in ('free', 't2', 't3')),
  published       boolean not null default false,
  created_at      timestamptz not null default now()
);

-- Products: belong to a site
create table public.products (
  id            uuid primary key default gen_random_uuid(),
  site_id       uuid not null references public.sites(id) on delete cascade,
  name          text not null default '',
  description   text not null default '',
  price         numeric(10, 2),
  image_url     text,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

-- Indexes for the common read paths
create index sites_owner_id_idx  on public.sites(owner_id);
create index sites_slug_idx      on public.sites(slug);
create index products_site_id_idx on public.products(site_id);
create index products_sort_order_idx on public.products(site_id, sort_order);

-- Row Level Security
alter table public.sites    enable row level security;
alter table public.products enable row level security;

-- Sites: owners can do everything on their own rows
create policy "owners manage their site"
  on public.sites for all
  using  (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Sites: anyone can read a published site (for public page rendering)
create policy "public can read published sites"
  on public.sites for select
  using (published = true);

-- Products: owners can do everything on products that belong to their site
create policy "owners manage their products"
  on public.products for all
  using  (exists (select 1 from public.sites s where s.id = site_id and s.owner_id = auth.uid()))
  with check (exists (select 1 from public.sites s where s.id = site_id and s.owner_id = auth.uid()));

-- Products: anyone can read products on a published site
create policy "public can read products of published sites"
  on public.products for select
  using (exists (select 1 from public.sites s where s.id = site_id and s.published = true));
