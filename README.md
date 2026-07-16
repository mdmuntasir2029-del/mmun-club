# MMUNC — Manarat Dhaka MUN Club Website

Official website for the Manarat Dhaka International School and College
Model United Nations Club. Built with Next.js (App Router), Tailwind CSS,
and Supabase (auth + database).

## 1. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase Dashboard, go to **SQL Editor → New query**.
   - **New project, never ran the schema before:** paste the contents of
     [`supabase/schema.sql`](supabase/schema.sql) and run it.
   - **Already ran an older version of this project's schema:** run the
     migration scripts in `supabase/` **in filename order** instead —
     currently
     [`migration-2026-07-16-student-code-admin.sql`](supabase/migration-2026-07-16-student-code-admin.sql)
     then
     [`migration-2026-07-16-grade-and-unique-code.sql`](supabase/migration-2026-07-16-grade-and-unique-code.sql).
     Each one updates the existing tables in place without touching
     existing rows (the second one defaults any existing delegate's grade
     to "9" — fix that manually in the admin panel afterwards for anyone
     it doesn't apply to).
3. Go to **Authentication → Sign In / Providers → Email** and turn
   **off "Confirm email"**. Sign-up now logs delegates in immediately
   instead of emailing a confirmation link — the confirmation email flow
   was pointing at `localhost` and never worked in production. (Password
   reset still uses email and still works — that's a separate flow.)
4. Go to **Project Settings → API Keys** and copy:
   - The **Project URL**
   - The **Publishable key** (`sb_publishable_...`) — safe to expose publicly
   - The **Secret key** (`sb_secret_...`) — **never expose this one**. It
     grants full admin access to your database and auth users, bypassing
     every security rule. It's only used server-side, by the admin panel,
     to reset passwords and ban/unban accounts.

## 2. Configure environment variables

Copy the example file and fill in the values from step 1.4:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-secret-key
```

`SUPABASE_SERVICE_ROLE_KEY` must **not** have the `NEXT_PUBLIC_` prefix —
that prefix is what tells Next.js "bundle this into the browser," which
would leak full admin access to every visitor. Without the prefix, it's
only readable on the server.

## 3. Run the dev server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 4. Allocate delegates (admin panel)

Sign in with **auraboy161@gmail.com** and go to `/dashboard/admin` (an
"Admin" tab appears next to "Overview" and "Events" once signed in with
that account). From there you can see every delegate's sign-up info,
assign their committee, country/portfolio, and payment status, force-set
a new password for their account, and ban/unban them — no need to touch
the Supabase dashboard for day-to-day management.

Note: nobody — not you, not Supabase — can ever *see* a member's actual
password. Passwords are one-way hashed, which is what makes them secure.
"Reset" sets a brand-new password you choose; it doesn't reveal the old
one.

To add more admins later, edit `ADMIN_EMAIL` in
[`src/lib/admin.ts`](src/lib/admin.ts) and the two `auraboy161@gmail.com`
policies in the SQL files under `supabase/`.

**Student codes** are 9 digits: the first 4 are the year the student
joined the school, the last 5 are a serial number (e.g. `202600001` =
joined 2026, serial 1). Codes must be unique — sign-up checks this and
shows a friendly error if a code is already taken. The admin panel shows
the decoded joining year next to each code.

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
- `supabase/migration-*.sql` — schema updates for a project that already
  ran an older schema version; run in filename order

## Deploying

The easiest option is [Vercel](https://vercel.com/new) — connect this
repo and add all three environment variables (`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) in the
project settings. Redeploy after adding them.
