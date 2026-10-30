# Just-Bet-It — Sports Intelligence Workspace

A dynamic sports analytics workspace built with Next.js and deployed on Vercel.

## Product areas
- Overview dashboard with event slate, bookmaker coverage, quota status and a market watchlist.
- Edge Finder comparing best available bookmaker price with average no-vig probability from returned books.
- Daily Market Board with filters for sport, region, market, search and minimum price-relative EV.
- Player Props explorer for supported NBA, NFL and MLB prop markets, including alternate lines where the provider returns them.
- PRO research chat backed by Vercel AI Gateway and LITE coaching mode for bankroll education.
- Bankroll Lab with implied probability, fixed-unit and fractional Kelly scenario calculations.
- Existing Sanity editorial Studio and article archive remain available at /studio and /articles after Sanity is configured.

## Required Vercel configuration
Set \`THE_ODDS_API_KEY\` under Project Settings → Environment Variables, with Preview and Production targets. This powers game odds, schedules embedded in odds events, and supported player props. The key is only read server-side.

Enable Secure Backend Access with OIDC Federation in Vercel Project Settings → Security for AI Gateway. The research endpoint reads the OIDC token from the Vercel request context. Alternatively configure \`AI_GATEWAY_API_KEY\` and optional \`AI_GATEWAY_MODEL\`.

The content CMS still uses \`NEXT_PUBLIC_SANITY_PROJECT_ID\`, \`NEXT_PUBLIC_SANITY_DATASET\` and \`NEXT_PUBLIC_SANITY_API_VERSION\`. It is separate from the market-data workspace.

## Run locally
Install Node.js 22 or newer, copy .env.example to .env.local, add API keys, run npm install, then npm run dev.

## Important methodology
The edge finder calculates each bookmaker's no-vig probabilities for the same outcome and line, averages them, and compares that market consensus with the best available price. Its "market EV" is a market-relative calculation, not an independently validated probability model or a historical hit-rate projection. No player-season statistics, injuries or lineups are fabricated.

Player props are requested one event and market at a time. Availability depends on sport, event, bookmaker region and data-provider plan. Refreshes are user-triggered or cached to control request usage.

## Deployment
Vercel uses the Next.js framework preset and Node 22. Import the GitHub repository and keep the project root at the repository root. GitHub Actions runs type-check and production build.
