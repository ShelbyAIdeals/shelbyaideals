-- ============================================================
-- Supabase Database Schema for ShelbyAIDeals
-- Run this in the Supabase SQL Editor after creating your project
-- ============================================================

-- Profiles table (extends auth.users with display info)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Reviews table (one review per user per tool)
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  tool_slug text not null,
  rating smallint not null check (rating >= 1 and rating <= 5),
  title text not null check (char_length(title) <= 200),
  body text check (char_length(body) <= 2000),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, tool_slug)
);

-- Review votes (helpful/not helpful, one vote per user per review)
create table if not exists public.review_votes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  review_id uuid references public.reviews(id) on delete cascade not null,
  helpful boolean not null,
  created_at timestamptz default now(),
  unique(user_id, review_id)
);

-- Indexes
create index if not exists idx_reviews_tool_slug on public.reviews(tool_slug);
create index if not exists idx_reviews_user_id on public.reviews(user_id);
create index if not exists idx_review_votes_review_id on public.review_votes(review_id);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

alter table public.profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.review_votes enable row level security;

-- Profiles: everyone can read, users can update own
create policy "Public profiles are viewable" on public.profiles
  for select using (true);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Reviews: everyone can read, authenticated can insert, own-row edit/delete
create policy "Reviews are viewable" on public.reviews
  for select using (true);

create policy "Authenticated users can create reviews" on public.reviews
  for insert with check (auth.uid() = user_id);

create policy "Users can update own reviews" on public.reviews
  for update using (auth.uid() = user_id);

create policy "Users can delete own reviews" on public.reviews
  for delete using (auth.uid() = user_id);

-- Review votes: everyone can read, authenticated can vote, own-row update
create policy "Votes are viewable" on public.review_votes
  for select using (true);

create policy "Authenticated users can vote" on public.review_votes
  for insert with check (auth.uid() = user_id);

create policy "Users can update own votes" on public.review_votes
  for update using (auth.uid() = user_id);

-- ============================================================
-- Auto-create profile on user signup (trigger)
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, first_name, last_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'given_name'),
    coalesce(new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'family_name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger: auto-create profile after auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
