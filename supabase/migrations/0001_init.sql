create table public.sites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  template_slug text not null default 'evergreen',
  config jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sites enable row level security;

create policy "select own site" on public.sites for select using (auth.uid() = user_id);
create policy "insert own site" on public.sites for insert with check (auth.uid() = user_id);
create policy "update own site" on public.sites for update using (auth.uid() = user_id);
