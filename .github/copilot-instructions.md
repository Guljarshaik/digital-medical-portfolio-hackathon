# Copilot instructions for Project Bolt

Purpose: Give AI contributors the concise, project-specific knowledge needed to make safe, correct changes quickly.

- **Quick start (dev/build/test)**
  - Dev server: `npm run dev` (uses Vite)
  - Build: `npm run build`
  - Preview build: `npm run preview`
  - Lint: `npm run lint`
  - Typecheck: `npm run typecheck` (runs `tsc -p tsconfig.app.json`)

- **Environment**
  - This app requires two env vars for Supabase: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (used in [src/lib/supabase.ts](src/lib/supabase.ts)). Place them in a `.env` or your local environment when running.

- **High-level architecture**
  - Frontend: React + TypeScript app bootstrapped with Vite (`vite.config.ts`). UI uses Tailwind (`tailwind.config.js`) and component files under `src/components/`.
  - Auth + backend: Supabase is used for auth and Postgres (see `src/lib/supabase.ts` and `supabase/migrations/`).
  - App entry: `src/main.tsx` wraps the app with `AuthProvider` from `src/contexts/AuthContext.tsx`. `src/App.tsx` renders either `Login` or `Dashboard` based on `useAuth()`.

- **Domain types and DB mapping**
  - Canonical TypeScript domain types live in [src/types/index.ts](src/types/index.ts). These mirror DB tables (e.g., `Doctor`, `Patient`, `Appointment`). When adding fields, update both DB migration and these types.
  - The `doctors` table uses the Supabase user `id` as primary key. See `AuthContext` sign-up flow where a `doctors` profile row is inserted with `id: authData.user.id`.

- **Key patterns / conventions**
  - Auth flow: Use `supabase.auth.*` methods. `AuthProvider` calls `supabase.auth.getSession()` and subscribes to `onAuthStateChange` to keep the `user` + `doctor` state in sync.
  - Data fetching: Components typically use `supabase.from('<table>').select(...).eq('doctor_id', doctor.id)` and accept `maybeSingle()` when retrieving single records.
  - UI: Prefer Tailwind utility classes (see `src/index.css` + components). Avoid adding global CSS unless necessary.
  - Types-first: Update `src/types/index.ts` alongside DB changes so TypeScript helps catch mismatches.

- **Integration & build quirks**
  - `lucide-react` is excluded from `optimizeDeps` in `vite.config.ts` — keep that in mind when adding or upgrading icon libs.
  - Vite + TypeScript: `npm run typecheck` uses `tsconfig.app.json` (project-level type checks). Fix any `tsc` errors before merging large changes.

-
If anything above is ambiguous or you'd like the file to cover additional areas (testing, CI, release notes), tell me which sections to expand. I'll iterate quickly.
