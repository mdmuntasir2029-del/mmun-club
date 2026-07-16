-- Run this ONCE in the Supabase SQL Editor if you already ran the original
-- supabase/schema.sql on this project. It brings an existing database up to
-- date with the latest schema: institution is no longer required, student
-- code (9 digits) is now required, and the admin panel gets its RLS access.

-- 1. Institution is no longer collected at sign-up.
alter table public.profiles alter column institution drop not null;

-- 2. Backfill any existing rows with no student code, then require it.
update public.profiles set student_id = '000000000' where student_id is null;
alter table public.profiles alter column student_id set not null;
alter table public.profiles add constraint profiles_student_id_format
  check (student_id ~ '^[0-9]{9}$');

-- 3. Let the admin account view and edit every delegate's profile.
create policy "Admin can view all profiles"
  on public.profiles for select
  using ((auth.jwt() ->> 'email') = 'auraboy161@gmail.com');

create policy "Admin can update all profiles"
  on public.profiles for update
  using ((auth.jwt() ->> 'email') = 'auraboy161@gmail.com');

-- 4. New sign-ups no longer submit an institution value.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, student_id, phone, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'student_id',
    new.raw_user_meta_data ->> 'phone',
    new.email
  );
  return new;
end;
$$;
