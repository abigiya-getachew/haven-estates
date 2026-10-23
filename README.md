# HAVEN Estates Addis

Website for HAVEN Estates Addis, a residential property agency in Addis Ababa.
Built with Next.js (App Router), React, TypeScript, and Tailwind CSS, with
Supabase providing PostgreSQL, authentication, and image storage.

The product and technical specifications live in [`docs/`](./docs):

| Document                                             | Purpose                                                 |
| ---------------------------------------------------- | ------------------------------------------------------- |
| [`docs/PRD.md`](./docs/PRD.md)                       | Product scope, users, journeys, functional requirements |
| [`docs/DESIGN.md`](./docs/DESIGN.md)                 | Visual design, components, interaction, accessibility   |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)     | Stack, structure, data flow, security boundaries        |
| [`docs/DATABASE.md`](./docs/DATABASE.md)             | Schema, constraints, indexes, access policies           |
| [`docs/API.md`](./docs/API.md)                       | Endpoint contracts, validation, error conventions       |
| [`docs/AGENTS.md`](./docs/AGENTS.md)                 | Coding rules and working agreements                     |
| [`docs/IMPLEMENTATION.md`](./docs/IMPLEMENTATION.md) | Phased delivery plan                                    |

## Requirements

- Node.js 20.9 or newer (developed against Node 24)
- npm 10 or newer
- A Supabase project (database URL and publishable key)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the Supabase values
npm run env:check             # verifies the configuration
npm run dev                   # http://localhost:3000
```

`.env.local` is git ignored. Never commit real credentials.

## Development scripts

| Script                 | Purpose                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `npm run dev`          | Start the development server                                                |
| `npm run build`        | Create a production build                                                   |
| `npm run start`        | Serve the production build                                                  |
| `npm run lint`         | Run ESLint                                                                  |
| `npm run lint:fix`     | Run ESLint with automatic fixes                                             |
| `npm run format`       | Format the repository with Prettier                                         |
| `npm run format:check` | Verify formatting without writing changes                                   |
| `npm run typecheck`    | Generate route types and run the TypeScript compiler without emitting files |
| `npm run test`         | Run the unit and component test suites                                      |
| `npm run test:watch`   | Run the test suites in watch mode                                           |
| `npm run env:check`    | Validate environment configuration                                          |
| `npm run check`        | Lint, type check, and test in one command                                   |

`npm run check` mirrors the quality gates in `ARCHITECTURE.md` 18.6 and is the
command to run before every commit.

## Environment variables

Only the variables for services that are actually used should be defined
(`ARCHITECTURE.md` 13.2, `API.md` 14).

| Variable                        | Required                                   | Purpose                                                      | Exposure                                   |
| ------------------------------- | ------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`          | Yes                                        | Canonical site URL for metadata, sitemap, and absolute links | Public                                     |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes                                        | Supabase project URL                                         | Public                                     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes                                        | Supabase publishable/anonymous key                           | Public                                     |
| `SUPABASE_SERVICE_ROLE_KEY`     | Only for privileged server operations      | Trusted server-side database and storage access              | Server only                                |
| `RESEND_API_KEY`                | Only if Resend is selected                 | Transactional email authentication                           | Server only                                |
| `CONTACT_EMAIL_TO`              | Only if email notifications are enabled    | Agency notification destination                              | Server only                                |
| `ADMIN_EMAIL_ALLOWLIST`         | If that authorisation approach is selected | Approved administrator identities                            | Server only                                |
| `WHATSAPP_BUSINESS_NUMBER`      | If configured server-side                  | Agency WhatsApp number                                       | Server-side configuration, safe to publish |

Configuration is parsed and validated in `src/lib/env.ts`. Values are never
read at import time, so a missing variable produces a clear error at the point
of use instead of an unrelated crash. `npm run env:check` reports every
missing or invalid variable at once.

## Project structure

```text
haven-estates-addis/
├── docs/                     # Product and technical specifications
├── public/                   # Static assets, including self-hosted fonts
├── scripts/                  # Repository maintenance scripts
├── src/
│   ├── app/                  # Routes, layouts, metadata, route handlers
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── properties/       # Property listings and property detail route
│   │   ├── error.tsx         # Route level error boundary
│   │   ├── globals.css       # Design tokens and base styles
│   │   ├── layout.tsx        # Root layout, fonts, and metadata defaults
│   │   ├── not-found.tsx     # Not found page
│   │   ├── page.tsx          # Homepage
│   │   ├── robots.ts         # Indexing rules
│   │   └── sitemap.ts        # Sitemap
│   ├── components/
│   │   ├── layout/           # Header, footer, and navigation
│   │   └── ui/               # Generic reusable interface elements
│   ├── lib/                  # Infrastructure clients and shared utilities
│   │   └── supabase/         # Browser and server Supabase clients
│   └── types/                # Shared application and database types
├── tests/
│   ├── component/            # Component tests
│   ├── setup/                # Test setup
│   └── unit/                 # Unit tests
├── .env.example              # Documented variables with placeholder values
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.cjs
├── prettier.config.mjs
├── tsconfig.json
└── vitest.config.mts
```

Application code lives under `src/`, matching the structure in
`ARCHITECTURE.md` 17. Configuration files, `public/`, and environment files
stay in the repository root.

## Design system

`src/app/globals.css` holds the single authoritative set of design tokens
derived from `DESIGN.md`: colours, the type scale, spacing, container widths,
breakpoints, radii, elevation, and motion. Shared components in
`src/components/ui/` consume those tokens, so visual changes are made in one
place rather than per page.

Typography uses DM Serif Display for editorial headings and Inter for
interface and body text. Both families are self-hosted from `public/fonts`
through `next/font/local`, so a build never depends on an external font
service and the page still renders with system fallbacks if a font file is
missing.

## Deployment

The application targets Vercel with Supabase for PostgreSQL, authentication,
and image storage (`ARCHITECTURE.md` 19.1). Production environment variables
are configured in the hosting provider, never in the repository. The canonical
production URL must be set as `NEXT_PUBLIC_SITE_URL`.

Database migrations are version controlled under `supabase/migrations/` and are
applied through a controlled process rather than by editing the live database.

## Known environment issue

**The repository path must not contain the `#` character.**

Tailwind CSS v4, Next.js, and Vite resolve modules and stylesheets through
URL-like paths, where `#` starts a fragment. When the project lives under a
path such as `…/chazonlabs#projects/…`, the resolved path is truncated and the
build fails while Tailwind compiles the stylesheet:

```text
The argument 'path' must be a string, Uint8Array, or URL without null bytes
```

This is a property of the toolchain, not of the project configuration: the
same checkout builds, tests, and runs correctly from a path without `#`.

`npm run dev`, `npm run build`, and `npm test` check the project path before
starting and stop with the exact command needed to move the repository:

```bash
mv "/path/with/#/haven-estates-addis" "/path/without/haven-estates-addis"
```

Move the repository, reopen it at the new location, and continue. Git history
moves with the directory.

### Why the PostCSS config is CommonJS

`postcss.config.cjs` is loaded by Next.js with `require()`, while `.mjs`
configurations are loaded through `import()`, and an import path is parsed as a
URL. Keeping the configuration in CommonJS makes the project independent of
where it is checked out.
