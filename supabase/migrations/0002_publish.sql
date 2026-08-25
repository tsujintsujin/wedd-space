alter table public.sites
  add column slug text unique,
  add column published boolean not null default false;

create policy "public can read published sites" on public.sites
  for select using (published = true);
