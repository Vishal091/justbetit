# Just-Bet-It Dynamic Website Setup

The dynamic implementation uses Next.js App Router, Sanity CMS and an optional server-side scores feed.

## Included
- CMS-managed articles, sports/categories, authors, research tools, site settings and official social links.
- Sanity Studio at /studio for authenticated editors.
- Article detail pages, searchable archive at /articles and sports pages at /sports/[sport].
- Public and Propalytics-member article fields. Member pages link to the existing Propalytics service; this project does not bypass or recreate its account system.
- Optional scores/schedules and odds-market endpoints. API secrets stay server-side.
- Dynamic sitemap, robots rules and SEO fields.
- Legacy links retained while content is migrated.

## Run locally
Install Node.js 20.9 or newer, copy .env.example to .env.local, run npm install and npm run dev. Visit http://localhost:3000. Run npm run typecheck and npm run build before production.

Without a Sanity project ID, the home page uses transitional legacy-link preview content and /studio shows setup guidance. Without a sports API key, the scores and odds panels explain how to enable data feeds.

## Connect Sanity CMS
1. Create a project at https://www.sanity.io/manage.
2. Set NEXT_PUBLIC_SANITY_PROJECT_ID to the project ID.
3. Set NEXT_PUBLIC_SANITY_DATASET to production, or your chosen dataset.
4. Set NEXT_PUBLIC_SANITY_API_VERSION to 2026-10-30. The embedded Studio uses the client-component boundary recommended for Next.js 16.
5. Restart locally or redeploy and open /studio; sign in with an authorized Sanity account.
6. Create Sports / Categories first, then Authors, Articles and Research Tools. Create a Site Settings document with ID siteSettings to control homepage copy, disclaimer, Propalytics URL and social links.
7. Publish documents. Published content is queried dynamically and route data revalidates about every 60 seconds.

Suggested sport categories: NFL (nfl / americanfootball_nfl), College Football (cfb / americanfootball_ncaaf), NBA (nba / basketball_nba), MLB (mlb / baseball_mlb), UFC / MMA (ufc / mma_mixed_martial_arts). Verify provider league coverage first.

## Enable scores and odds markets
1. Get a key from https://the-odds-api.com/.
2. Set THE_ODDS_API_KEY locally and in the host's server-side environment. Never prefix it with NEXT_PUBLIC_ or commit it.
3. Redeploy and select a league in the home-page feed.
4. Review provider coverage, quotas and licensing terms. The homepage has separate scores/schedule and odds-market panels. The odds board loads on sport/market changes and manual refresh so editors can control provider quota usage.

The API route allowlists sport keys and fetches data on the server so the key is not exposed in browser code.

## Deploy on Vercel
1. Import the repository and select the Next.js framework preset.
2. Keep the root directory at the repository root.
3. Set Sanity variables and, when available, THE_ODDS_API_KEY in Project Settings > Environment Variables. Use a test dataset for Preview if needed.
4. Set NEXT_PUBLIC_SITE_URL to the final canonical domain.
5. Deploy and test /, /articles, /sports/nfl, a published article, /studio and the sports endpoint.

## Content and membership migration
Import legacy articles in batches, preserving slugs, dates, authors, images and SEO. Use the source URL field while the canonical article remains on WordPress. Mark member content as members and link to Propalytics. Set up redirects before retiring legacy URLs.

This first dynamic milestone does not create a new first-party account, payment, newsletter or subscription system. If membership should move onto Just-Bet-It, design the authentication and billing migration separately to avoid duplicate accounts.

## Pre-production checklist
- [ ] Connect Sanity and verify editor permissions.
- [ ] Create settings singleton and confirm official social links.
- [ ] Create initial sport/category, author, article and tool records.
- [ ] Add sports API key, verify provider league coverage and monitor quota.
- [ ] Verify member access with the content owner and Propalytics.
- [ ] Confirm legal wording, legal entity, policies and jurisdiction-specific help text.
- [ ] Run typecheck, production build, responsive QA and link checks after installing dependencies.
- [ ] Configure DNS, HTTPS, redirects, analytics and privacy compliance.

Never commit CMS write tokens, service-role keys, billing secrets or sports-provider API keys.