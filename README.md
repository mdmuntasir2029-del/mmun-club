# MMUNC — Manarat Dhaka MUN Club Website

Official website for the Manarat Dhaka International School and College
Model United Nations Club. Built with Next.js (App Router), Tailwind CSS,
and Supabase (auth + database).

## 1. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase Dashboard, go to **SQL Editor → New query**.
   - **New project, never ran the schema before:** paste the contents of
     [`supabase/schema.sql`](supabase/schema.sql) and run it.
   - **Already ran the old `schema.sql` on this project:** paste and run
     [`supabase/migration-2026-07-16-student-code-admin.sql`](supabase/migration-2026-07-16-student-code-admin.sql)
     instead. It updates the existing tables in place (drops the required
     institution field, requires a 9-digit student code, and adds the
     admin panel's database access) without touching existing rows.
3. Go to **Authentication → Sign In / Providers → Email** and turn
   **off "Confirm email"**. Sign-up now logs delegates in immediately
   instead of emailing a confirmation link — the confirmation email flow
   was pointing at `localhost` and never worked in production. (Password
   reset still uses email and still works — that's a separate flow.)
4. Go to **Project Settings → API** and copy the **Project URL** and
   **anon public key**.

## 2. Configure environment variables

Copy the example file and fill in the values from step 1.4:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

## 3. Run the dev server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 4. Allocate delegates (admin panel)

Sign in with **auraboy161@gmail.com** and go to `/dashboard/admin` (an
"Admin" tab appears next to "Overview" and "Events" once signed in with
that account). From there you can see every delegate's sign-up info and
assign their committee, country/portfolio, and payment status — no need
to touch the Supabase dashboard for day-to-day allocation.

To add more admins later, edit `ADMIN_EMAIL` in
[`src/lib/admin.ts`](src/lib/admin.ts) and the two `auraboy161@gmail.com`
policies in the SQL files under `supabase/`.

## 5. Replace placeholder content

- **Study guides**: `public/study-guides/*.pdf` are placeholder PDFs.
  Replace them with the real ones (keep the same filenames, or update the
  paths in `src/lib/committees.ts`).
- **Committees**: edit `src/lib/committees.ts` to match this year's
  lineup and agendas.
- **About page**: `src/app/about/page.tsx` has placeholder advisor and
  secretariat names — update with real people.
- **School address**: `src/components/site-footer.tsx` has a placeholder
  address — update with the real one.

## Project structure

- `src/app` — pages (App Router). `src/app/dashboard/` holds the
  member-only Overview, Events, and Admin (`/dashboard/admin`) pages,
  sharing a tab bar via `src/app/dashboard/layout.tsx`.
- `src/components` — shared UI (header, footer, auth forms)
- `src/lib/supabase` — Supabase client/server helpers
- `src/lib/admin.ts` — the hardcoded admin email used to gate `/dashboard/admin`
- `src/proxy.ts` — refreshes the auth session and protects `/dashboard`
- `supabase/schema.sql` — database schema for a fresh Supabase project
- `supabase/migration-2026-07-16-student-code-admin.sql` — schema update
  for a project that already ran the old `schema.sql`

## Deploying

The easiest option is [Vercel](https://vercel.com/new) — connect this
repo and add the two `NEXT_PUBLIC_SUPABASE_*` environment variables in
the project settings.
