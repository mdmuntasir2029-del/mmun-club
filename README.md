# MMUNC — Manarat Dhaka MUN Club Website

Official website for the Manarat Dhaka International School and College
Model United Nations Club. Built with Next.js (App Router), Tailwind CSS,
and Supabase (auth + database).

## 1. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase Dashboard, go to **SQL Editor → New query**, paste the
   contents of [`supabase/schema.sql`](supabase/schema.sql), and run it.
   This creates the `profiles` and `contact_messages` tables, sets up
   row-level security, and adds a trigger that creates a profile row
   automatically whenever someone signs up.
3. Go to **Authentication → Emails** and confirm the "Confirm signup" and
   "Reset password" templates redirect through `/auth/confirm` (the app's
   confirmation route). The default Supabase templates already work with
   this project's code.
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

## 4. Allocate delegates (secretariat workflow)

There's no admin panel yet — once a delegate signs up, allocate their
committee, country/portfolio, and payment status directly from the
Supabase Dashboard: **Table Editor → profiles**, edit their row's
`committee`, `country`, and `payment_status` columns. Their dashboard at
`/dashboard` updates automatically.

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

- `src/app` — pages (App Router)
- `src/components` — shared UI (header, footer, auth forms)
- `src/lib/supabase` — Supabase client/server helpers
- `src/proxy.ts` — refreshes the auth session and protects `/dashboard`
- `supabase/schema.sql` — database schema to run in Supabase

## Deploying

The easiest option is [Vercel](https://vercel.com/new) — connect this
repo and add the two `NEXT_PUBLIC_SUPABASE_*` environment variables in
the project settings.
