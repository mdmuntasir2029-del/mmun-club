-- Run this ONCE in the Supabase SQL Editor after the previous migrations.
-- Adds a public "does this email have an account?" check, used by the
-- sign-in form to show "No account found, sign up" instead of a generic
-- error when someone tries to sign in with an unregistered email.
--
-- Note: this intentionally reveals whether an email is registered, which
-- is a minor trade-off against the friendlier error message.

create or replace function public.email_has_account(check_email text)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from auth.users where lower(email) = lower(check_email)
  );
$$;

grant execute on function public.email_has_account(text) to anon, authenticated;
