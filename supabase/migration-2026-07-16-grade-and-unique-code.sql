-- Run this ONCE in the Supabase SQL Editor after the previous migration.
-- Adds: a required "current grade" field, a uniqueness guarantee on
-- student codes, and a public RPC the sign-up form uses to check if a
-- code is already taken before creating the account.

-- 1. Current grade (2026-2027 session).
alter table public.profiles add column if not exists grade text;
alter table public.profiles add constraint profiles_grade_valid
  check (grade in ('6', '7', '8', '9', '10', 'AS', 'A2'));

-- Existing rows (signed up before this field existed) get a placeholder;
-- update these manually in the admin panel or Table Editor if needed.
update public.profiles set grade = '9' where grade is null;
alter table public.profiles alter column grade set not null;

-- 2. Student codes must be unique.
-- If this fails with a duplicate-key error, two delegates already share a
-- code — fix the older row's student_id manually first, then re-run this.
alter table public.profiles add constraint profiles_student_id_unique unique (student_id);

-- 3. Public "is this code taken?" check, used by the sign-up form so it can
-- show a friendly error before attempting to create the account, rather
-- than surfacing a raw database error.
create or replace function public.student_code_exists(code text)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where student_id = code);
$$;

grant execute on function public.student_code_exists(text) to anon, authenticated;

-- 4. New sign-ups now also submit a grade.
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
