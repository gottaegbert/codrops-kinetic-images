# Repository Guidelines

## Project Structure & Module Organization
- Monorepo with workspaces: `frontend/` (Next.js app) and `studio/` (Sanity Studio).
- Frontend key paths: `src/app/` (App Router pages), `src/components/` (UI, layouts, webgl), `src/webgl/` (GLSL/shaders), `public/` (static assets).
- CMS: `studio/` (Sanity config, plugins) and `frontend/src/sanity/` (client, queries, schemas used in app).
- Build output: `frontend/.next/` during build, static export to `frontend/out/`.

## Build, Test, and Development Commands
- `npm run dev` — run frontend and studio together.
- `npm run dev:frontend` — Next.js dev server (default http://localhost:3000).
- `npm run dev:studio` — Sanity Studio (http://localhost:3333). `/studio` routes redirect to Studio in dev.
- `npm run build` — build frontend (static export enabled).
- `npm run start` — start production server from build.
- `npm run lint` — ESLint (frontend).
- `npm run format` / `format:check` — Prettier write/check across the repo.

## Coding Style & Naming Conventions
- Prettier: 4-space indent, 100 char width, semicolons, single quotes.
- ESLint: Next.js core-web-vitals rules.
- Components: PascalCase folders with colocated styles, e.g. `components/ui/modules/Header/Header.jsx` + `Header.module.scss`.
- Styles: SCSS modules `*.module.scss`; prefer CSS modules over globals.
- WebGL: shaders `*.glsl|*.vert|*.frag` (loaded via glslify loaders).

## Testing Guidelines
- No test runner is configured yet. If adding tests:
  - Use Playwright for e2e or Jest/RTL for unit tests in `frontend/`.
  - Name tests `*.spec.(js|jsx|ts|tsx)` near source or under `__tests__/`.
  - Add a root `npm test` script when introducing tests.

## Commit & Pull Request Guidelines
- Prefer Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`. Example: `feat(frontend): add ExhibitionCard hover effect`.
- PRs: clear description, linked issues, screenshots/GIFs for UI changes, and note any schema/content migrations.
- Keep PRs focused and update related docs (`README.md`, `EXHIBITION_GUIDE.md`, `I18N_SETUP.md`).

## Security & Configuration Tips
- Env vars (frontend): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN`.
- Store secrets in `.env.local` (do not commit). Use `NEXT_PUBLIC_*` only for non-sensitive values.
