# Just-Bet-It

A premium, responsive sports research and analytics website prototype inspired by the clarity and product hierarchy of modern sports-analytics tools.

## Preview locally

This is a dependency-free static site; no package manager or build step is required.

1. Clone the repository.
2. Switch to `feat/premium-sports-analytics-redesign` or use the PR branch.
3. Open `index.html` in a browser, or run a static server from the repository root:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

The site can be deployed as a static project on Vercel, Netlify, GitHub Pages, or any static web host. Set the project root to the repository root. No build command is required; the output directory is `.`.

## Project files

- `index.html` — responsive homepage, editorial archive links, tool cards, product promotion, FAQs and footer.
- `SITE_AUDIT.md` — source-site information architecture, route inventory, social-profile notes, and pre-launch QA checklist.

## Current implementation

- Responsive dark UI with signal-lime accent.
- Responsive navigation and mobile menu.
- Search and sport filters for featured editorial cards.
- Sport-specific archive cards and external analytics-tool links.
- Propalytics conversion link.
- Accessible skip link, focus styles, semantic landmarks, and reduced-motion support.
- Visible entertainment-only disclaimer.
- No fabricated win-rate statistics, results claims, or testimonials.

## Before production

Review `SITE_AUDIT.md`. Direct retrieval of the source site intermittently failed during this pass, so internal path and external-tool links should be checked against current live destinations before launch. Only the publicly referenced X profile is linked; confirm ownership before production. Unverified social profiles are intentionally omitted.
