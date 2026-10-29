# Just-Bet-It site audit and redesign notes

Audit date: 30 October 2026  
Target site: https://just-bet-it.com/  
Redesign repository: https://github.com/Vishal091/justbetit  
Reference product: https://linemaker.ai/

## Repository status

The repository was empty when inspected. The redesign starts from a static, dependency-free `index.html` on `feat/premium-sports-analytics-redesign`. There was no existing framework, component library, or application behavior to preserve.

## Product and information architecture

The site's broad proposition is sports editorial and analysis supported by external research tools and Propalytics. The redesign groups the experience into:

- Analysis: game previews, ATS/totals, player props, DFS and archive access.
- Sport hubs: NFL, college football (CFB), NBA, MLB and UFC/MMA.
- Data suite: NFL passing and rushing tools, alignment matchups, coverage analytics and an MLB daily-matchups app.
- Propalytics: a separate product destination for account and research features.
- Support and brand: About, feedback, apparel and legal policy destinations.

The broader About copy also references NHL, PGA, NCAAB and WNBA coverage. Those were not presented as fully wired sport hubs because the current indexable menu set was not confirmed for each.

## Link inventory represented in the build

### Primary product / conversion
- Propalytics: https://propalytics.bet/
- About: https://just-bet-it.com/about-us/
- Feedback: https://just-bet-it.com/give-feedback/
- Apparel: https://just-bet-it.com/apparel/
- Terms: https://just-bet-it.com/terms-and-conditions/
- Privacy: https://just-bet-it.com/privacy-policy-2/

### Sport archive paths wired in the homepage
- NFL articles: https://just-bet-it.com/category/nfl-articles/
- NFL betting: https://just-bet-it.com/category/nfl-betting/
- NFL DFS: https://just-bet-it.com/category/nfl-dfs/
- CFB articles: https://just-bet-it.com/category/cfb-articles/
- CFB betting: https://just-bet-it.com/category/cfb-betting/
- CFB DFS: https://just-bet-it.com/category/cfb-dfs/
- NBA articles: https://just-bet-it.com/category/nba-articles/
- NBA betting: https://just-bet-it.com/category/nba-betting/
- NBA DFS: https://just-bet-it.com/category/nba-dfs/
- MLB articles: https://just-bet-it.com/category/mlb-articles/
- MLB betting: https://just-bet-it.com/category/mlb-betting/
- MLB DFS: https://just-bet-it.com/category/mlb-dfs/
- UFC articles: https://just-bet-it.com/category/ufc-articles/
- UFC betting: https://just-bet-it.com/category/ufc-betting/
- UFC DFS: https://just-bet-it.com/category/ufc-dfs/

### External tools represented in the data suite
- Advanced passing: https://jbi-advanced-passing.cookthebookies.chatgpt.site/
- Basic rushing: https://advanced-rushing-data.cookthebookies.chatgpt.site/
- Advanced rushing rankings: https://nfl-advanced-rushing-rankings.cookthebookies.chatgpt.site/
- Alignment matchups: https://nfl-alignment-matchups.cookthebookies.chatgpt.site/
- Defensive coverage analytics: https://jbi-defensive-coverage-analytics.cookthebookies.chatgpt.site/
- MLB daily matchups: https://dailymatchups-b5vzfmbskcwfnvskb6faqt.streamlit.app/

External services open in a new tab, with `rel="noopener noreferrer"`.

### Article examples shown
The cards link to the existing site's editorial destinations and are examples of its content categories:
- https://just-bet-it.com/nfl-week-8-sunday-slate-game-previews/
- https://just-bet-it.com/cfb-week-8-top-ats-total-picks/
- https://just-bet-it.com/10-29-26-nba-game-previews/
- https://just-bet-it.com/10-27-26-nba-top-prop-picks/
- MLB archive: https://just-bet-it.com/category/mlb-articles/
- UFC archive: https://just-bet-it.com/category/ufc-articles/

## Social-link verification

Social-profile verification is **not complete**. Public indexed posts identify `Just-Bet-It @Justbetit33` on X, including recent posts about the brand's sports content. The direct X page could not be fetched in this audit environment, so confirm account ownership before launch. Posts promote TikTok videos, but the canonical TikTok profile URL/handle could not be conclusively verified; it is intentionally not linked in the current footer. Search did not reliably confirm official Instagram, Facebook, YouTube, Discord, Twitch or other brand profiles, so those are not invented in the interface.

- Publicly referenced X profile (owner confirmation recommended): https://x.com/Justbetit33
- TikTok profile: not verified; no footer link

## Important verification limitation

The source site could be searched and key navigation/content patterns were found, but direct live retrieval of the homepage and several internal paths intermittently failed in this browsing environment (cache miss or inaccessible URL responses). Accordingly, the URLs above are inventory entries wired into the prototype—not a claim that every individual URL returned HTTP 200 during this pass. Before production launch, test every internal and external destination, canonical URL, redirect, login wall and mobile behavior.

## UX / visual direction

- Dark charcoal base, warm off-white typography and a restrained signal-lime accent.
- Large headline and a research-workspace illustration, without fabricated win rates, market odds, performance results or testimonials.
- Clear navigation to analysis, sports, tools and Propalytics.
- Sport filtering and article search operate client-side.
- Mobile navigation works with keyboard/expanded-state semantics.
- Responsive cards, reduced-motion support, visible focus states and skip-to-content link.
- External services are identified as separate destinations.
- Original site's entertainment-only disclaimer and responsible-use wording remain visible in the footer.

## Pre-launch QA checklist

- [ ] Verify official social profile URLs and replace provisional destinations.
- [ ] Check each internal archive/article, support and legal URL; correct any redirects or changed slugs.
- [ ] Check every tool and Propalytics link on mobile and desktop.
- [ ] Confirm current article titles/dates and whether each page is public or member-gated.
- [ ] Replace static example dashboard and illustrative Propalytics mockup with authorized screenshots or real product integrations if desired.
- [ ] Confirm exact gambling-help wording, jurisdiction, legal entity name and privacy/terms pages with the site owner.
- [ ] Add analytics/consent controls only as appropriate to the actual deployment.
- [ ] Run automated link, accessibility and responsive checks against the deployed preview.
