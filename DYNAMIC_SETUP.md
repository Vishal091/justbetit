# Dynamic Just-Bet-It Setup

## Environment variables

### Sports markets
1. Create an account with The Odds API at https://the-odds-api.com/.
2. Copy your API key.
3. In Vercel → justbetit → Settings → Environment Variables, create:
   - Key: \`THE_ODDS_API_KEY\`
   - Value: your private provider key
   - Targets: Preview and Production
4. Redeploy. The key is used only by server routes.

The API provides current moneyline, spread and total odds from supported bookmakers. Selected player props are retrieved per event using the event-odds endpoint. Coverage and usage costs vary by sport, market, region, book and plan.

### AI Research Chat
Enable Secure Backend Access with OIDC Federation under Vercel Project Settings → Security. The research route forwards the per-request Vercel OIDC token to AI Gateway. Alternatively create an AI Gateway key and add \`AI_GATEWAY_API_KEY\` to Vercel Preview and Production. Optional model override: \`AI_GATEWAY_MODEL\`.

### Editorial CMS
The existing Sanity Studio remains at /studio and needs a Sanity project ID and dataset. This CMS is independent of the live sports-data connection.

## What is implemented
- Dashboard overview and data connection status.
- Edge finder with best-price comparison and no-vig consensus.
- Daily market board with filters and refresh controls.
- Player-prop market explorer for supported NBA, NFL and MLB markets.
- PRO research chat and LITE coaching chat through Vercel AI Gateway.
- Bankroll scenario calculator for implied probability, fixed units and fractional Kelly.

## Calculation notes
For each bookmaker market and exact line, implied probabilities are converted from American odds and normalized to remove the bookmaker's overround. The normalized probabilities from available books are averaged to form a market consensus. The best listed price for each selection is compared with this consensus.

\`Price gap (pp) = consensus probability − best-price implied probability\`

\`Market-relative EV = consensus probability × best-price decimal odds − 1\`

These are price-comparison diagnostics. They are not a predictive model or independently validated true probabilities. The site does not claim player hit rates without a connected historical stats source.

## Production checklist
- [ ] Add and test \`THE_ODDS_API_KEY\` on Preview.
- [ ] Confirm plan supports desired sports, book region and player-prop markets.
- [ ] Enable OIDC federation or configure \`AI_GATEWAY_API_KEY\` for Research Chat.
- [ ] Add Sanity project settings if the editorial CMS is required.
- [ ] Verify legal disclaimers, age/jurisdiction requirements and privacy notice with the business owner.
- [ ] Verify domain, canonical URL, redirects and analytics before production rollout.
