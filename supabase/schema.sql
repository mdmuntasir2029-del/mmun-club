-- MMUNC website database schema
-- Run this once in the Supabase project's SQL Editor (Dashboard -> SQL Editor -> New query).

-- 1. Delegate profiles ---------------------------------------------------
-- One row per registered user, created automatically on sign-up.
-- Committee / portfolio / payment_status are set by the secretariat
-- (via the Supabase Table Editor) once a delegate is allocated.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  student_id text,
  institution text not null,
  phone text,
  email text not null,
  committee text,
  country text,
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'verified', 'rejected')),
  study_guide_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Auto-create a profile row whenever someone signs up ----------------
-- Reads the extra fields passed in supabase.auth.signUp({ options: { data } })

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, student_id, institution, phone, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'student_id',
    coalesce(new.raw_user_meta_data ->> 'institution', ''),
    new.raw_user_meta_data ->> 'phone',
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Contact form submissions --------------------------------------------

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit the contact form"
  on public.contact_messages for insert
  with check (true);

-- No select policy is added, so submissions are only readable from the
-- Supabase Dashboard (service role), not from the public site.
