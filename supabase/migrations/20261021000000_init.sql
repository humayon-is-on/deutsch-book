-- Deutsch Book: initial schema.
-- Apply with the Supabase CLI (`supabase db push`) or paste into the SQL editor.

-- One row per learner holding their whole progress document.
-- The app is local-first and syncs this row; newest `data.updatedAt` wins.
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Learners read their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Learners insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Learners update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Premium entitlement. Written only by the server (store webhooks / admin),
-- never by the app, so there is no insert/update policy for learners.
create table if not exists public.entitlements (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  expires_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.entitlements enable row level security;

create policy "Learners read their own entitlement"
  on public.entitlements for select
  using (auth.uid() = user_id);

-- Learning content managed from the Supabase dashboard (the CMS).
-- `data` holds one item in the shape of src/content/types.ts.
-- The app ships with bundled content; rows here are for adding and
-- correcting material without an app release.
create table if not exists public.content_items (
  id text primary key,
  level text not null check (level in ('A1', 'A2', 'B1')),
  module text not null check (module in ('grammar', 'vocabulary', 'mcq', 'qa', 'emails', 'dialogues')),
  data jsonb not null,
  published boolean not null default false,
  reviewed_by text,
  updated_at timestamptz not null default now()
);

alter table public.content_items enable row level security;

create policy "Anyone can read published content"
  on public.content_items for select
  using (published);

-- Lets a signed-in learner delete their own account and all their data.
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
