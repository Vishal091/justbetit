# Just-Bet-It Dynamic Website

This repository contains the public Just-Bet-It editorial and research website. It is not a sportsbook or a separate betting analytics SaaS.

## Public website sections
- Premium homepage with editorial highlights, sport navigation, research tools, Propalytics promotion, brand/about section, archive directory and FAQ.
- Dynamic article archive, sport filters, article pages and member-only labels.
- Sport hubs for NFL, College Football, NBA, MLB and UFC/MMA.
- Category archives matching the original URL patterns: articles, betting and DFS for each sport.
- Editable About, Give Feedback, Apparel, Terms and Privacy pages. Until exact source copy is migrated, the canonical legacy URL is preserved.
- CMS-managed navigation, footer links, social links, tool directory and homepage copy.

## Run locally
Install Node.js 22, copy .env.example to .env.local, run npm install and npm run dev. Visit http://localhost:3000. Run npm run typecheck and npm run build before production.

Without a Sanity project ID, the site still renders with the researched Just-Bet-It structure and transitional article content. The /studio route explains how to connect the CMS.

## Connect the CMS
1. Create a project at https://www.sanity.io/manage.
2. Set NEXT_PUBLIC_SANITY_PROJECT_ID to the project ID.
3. Set NEXT_PUBLIC_SANITY_DATASET to production, or the chosen dataset.
4. Set NEXT_PUBLIC_SANITY_API_VERSION to 2026-10-30.
5. Add SANITY_API_WRITE_TOKEN locally in .env.local only, then run npm run seed:cms to create starter sports, tools, settings and website pages.
6. Remove the write token after seeding. Open /studio and sign in with an authorized Sanity account.
7. Edit the Site Settings singleton to control homepage sections, navigation, footer links, social links and disclaimer. Manage pages, articles, sports, authors and data tools in their Studio sections.

## Vercel deployment
1. Import the GitHub repository and select the Next.js framework preset.
2. Keep Root Directory at the repository root and leave build/output commands on Vercel defaults.
3. Add NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and NEXT_PUBLIC_SANITY_API_VERSION as required.
4. Configure the Sanity project ID and dataset on Preview first, then test /studio.
5. Confirm the canonical domain, internal paths and external destinations before merging to production.

## Content migration and link preservation
The researched link inventory is maintained in SITE_AUDIT.md. Article cards use the new internal article routes; transitional article records can send readers to the original WordPress article until the complete body is imported. Category routes reproduce the original sport archive pattern. External research tools and Propalytics remain separate destinations.

The original About, feedback, apparel and legal URLs are retained until their exact source content is migrated. Do not invent or replace legal wording. Only publicly referenced social profiles are included; confirm account ownership before launch.

## Production checklist
- [ ] Connect and seed Sanity.
- [ ] Import legacy article bodies, images, authors, dates and SEO metadata.
- [ ] Review each sport archive, tool link and footer destination.
- [ ] Verify social handles with the site owner.
- [ ] Review legal copy and responsible-use wording against the authoritative source.
- [ ] Test mobile layout, accessibility, metadata, redirects and the canonical domain.
