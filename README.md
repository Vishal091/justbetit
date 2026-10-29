# Just-Bet-It

A dynamic sports research and analytics website using Next.js, Sanity CMS and an optional live-sports data feed.

## Run locally
Install Node.js 20.9 or newer, copy .env.example to .env.local, run npm install, then npm run dev and visit http://localhost:3000.

Without a Sanity project ID, the site uses transitional legacy-link preview content and /studio shows CMS setup instructions. Without a sports API key, the scores panel explains how to enable the feed.

## Capabilities
- Sanity editorial CMS at /studio.
- Dynamic article pages, searchable archive, sport filters and sport pages.
- CMS-managed sports, authors, site copy, official social links and tool directory.
- Optional server-side scores/schedule feed backed by The Odds API.
- Public/member article labels that preserve the existing Propalytics membership destination.
- Dynamic sitemap, robots rules and per-article SEO.
- Responsive dark design and accessible navigation.

## Environment
Required for dynamic publishing: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and NEXT_PUBLIC_SANITY_API_VERSION.
Optional for score data: THE_ODDS_API_KEY.

Set variables in your host, not in source control. Read DYNAMIC_SETUP.md for setup and deployment.

## Deployment
Import this repository into Vercel, select the Next.js preset, configure environment variables and the canonical site URL, then deploy. Other Node.js hosts can run npm run build and npm start.

The CMS and live feed need their service projects and credentials before they can fetch configured data.