-- MMUNC website database schema
-- Run this once in the Supabase project's SQL Editor (Dashboard -> SQL Editor -> New query).
-- If you already ran an older version of this file, use the migration
-- scripts in this folder instead (run them in filename order).

-- 1. Delegate profiles ---------------------------------------------------
-- One row per registered user, created automatically on sign-up.
-- Committee / portfolio / payment_status are set by the admin
-- (via the /dashboard/admin panel) once a delegate is allocated.
--
-- student_id is a 9-digit code: the first 4 digits are the year the
-- student joined the school, the last 5 are a serial number.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  student_id text not null unique check (student_id ~ '^[0-9]{9}$'),
  grade text not null check (grade in ('6', '7', '8', '9', '10', 'AS', 'A2')),
  institution text,
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

-- Admin (auraboy161@gmail.com) can view and edit every delegate's profile.
-- To add more admins, change this to `in ('email-one@x.com', 'email-two@x.com')`.

create policy "Admin can view all profiles"
  on public.profiles for select
  using ((auth.jwt() ->> 'email') = 'auraboy161@gmail.com');

create policy "Admin can update all profiles"
  on public.profiles for update
  using ((auth.jwt() ->> 'email') = 'auraboy161@gmail.com');

-- 2. Auto-create a profile row whenever someone signs up ----------------
-- Reads the extra fields passed in supabase.auth.signUp({ options: { data } })

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, student_id, phone, email, grade)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'student_id',
    new.raw_user_meta_data ->> 'phone',
    new.email,
    new.raw_user_meta_data ->> 'grade'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Public "is this code taken?" check, used by the sign-up form so it can
-- show a friendly error before attempting to create the account.

create or replace function public.student_code_exists(code text)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where student_id = code);
$$;

grant execute on function public.student_code_exists(text) to anon, authenticated;

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
