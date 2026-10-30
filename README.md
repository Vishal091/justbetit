# Just-Bet-It

A premium, dynamic sports editorial and research website built with Next.js and Sanity CMS, deployed on Vercel.

## Website
- Responsive homepage with editorial highlights, sport navigation, research tools, Propalytics promotion, about section, archive directory and FAQ.
- Dynamic editorial archive, article pages, sport hubs and sport-specific articles/betting/DFS archives.
- CMS-managed homepage sections, navigation, footer links, social profiles and disclaimer.
- CMS-managed sports, articles, authors, external research tools and website pages.
- Propalytics remains an external product and account destination.
- Original About, Feedback, Apparel, Terms and Privacy destinations are preserved until exact source copy is migrated.
- No invented testimonials, win-rate claims, betting statistics or fake live odds.

## Run locally
Install Node.js 22, copy .env.example to .env.local, run npm install and npm run dev. Visit http://localhost:3000. Read DYNAMIC_SETUP.md for CMS setup.

## CMS
Sanity Studio is available at /studio after configuring NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET. Use npm run seed:cms after adding a local SANITY_API_WRITE_TOKEN to create initial records. Editors can manage Site Settings, pages, articles, sports, authors and data tools.

## Deploy
Import this GitHub repository into Vercel, use the Next.js framework preset, keep the root directory at the repository root, and use automatic build/output defaults.
