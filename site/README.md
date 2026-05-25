# site/

The companion static site for [awesome-local-ai](../README.md). Renders the directory as a filterable, searchable, responsive web page.

Built with Next.js 16 (App Router, Turbopack), Tailwind CSS, and shadcn/ui. Designed to deploy on Vercel from this subdirectory.

## Local development

```bash
cd site
npm install
npm run dev
```

The site reads `src/data/projects.json`, which is **generated** from the root `README.md`. The `predev` and `prebuild` npm scripts run the parser automatically, so the data is always fresh.

If you want to regenerate the data manually:

```bash
npm run sync
```

## Architecture

```text
site/
├── scripts/
│   └── parse-readme.mjs       # Parses ../README.md → src/data/projects.json
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout, fonts, metadata
│   │   ├── page.tsx           # Home page composition
│   │   └── globals.css        # Tailwind + shadcn theme
│   ├── components/
│   │   ├── site-header.tsx    # Hero with counts + navigation links
│   │   ├── directory.tsx      # Client component: search + filter + grid
│   │   ├── project-card.tsx   # Single project tile
│   │   └── ui/                # shadcn primitives (button, card, etc.)
│   ├── data/
│   │   └── projects.json      # GENERATED — do not edit by hand
│   └── lib/
│       ├── projects.ts        # Types and helpers around the generated JSON
│       └── utils.ts           # cn() class-merging helper
├── components.json            # shadcn config
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Single source of truth

The root `README.md` is the canonical source. The site's data is regenerated from it on every build, so:

- Adding a project means a one-line edit to the README — never to the site.
- The README always reflects what users see on the site, and vice versa.
- No structured data file to keep in sync; no drift between the two surfaces.

If you want to extend the data model (e.g. add hardware tier tags), the right place to do it is the parser: enrich `scripts/parse-readme.mjs` to extract additional metadata from each line.

## Deployment

This site is **not deployed yet**. It ships as part of a second launch wave after the main repo has gathered initial traction.

When ready:

1. Import this repo into a new Vercel project.
2. In project settings, set **Root Directory** to `site`.
3. Framework preset auto-detects Next.js.
4. Deploy.

No environment variables required for v1.

## Future work

- Optional GitHub Action to refresh project star counts daily and embed them into the page.
- Hardware-tier filter (currently only category + search).
- Per-project detail pages (`/p/[slug]`) with star history, dependents, install command snippets.
- Open Graph image generation per category.
