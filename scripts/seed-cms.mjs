import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-30";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local.");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local. Create a project token with editor/write access, run this seed once, then remove the token from your local environment when finished.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const sports = [
  { _id: "category-nfl", _type: "category", title: "NFL", slug: { _type: "slug", current: "nfl" }, sportKey: "americanfootball_nfl", description: "NFL matchup previews, player props, DFS and slate analysis.", navigationOrder: 1, enabled: true },
  { _id: "category-cfb", _type: "category", title: "College Football", slug: { _type: "slug", current: "cfb" }, sportKey: "americanfootball_ncaaf", description: "College football matchup coverage, ATS/totals and slate notes.", navigationOrder: 2, enabled: true },
  { _id: "category-nba", _type: "category", title: "NBA", slug: { _type: "slug", current: "nba" }, sportKey: "basketball_nba", description: "NBA game previews, player props and basketball analysis.", navigationOrder: 3, enabled: true },
  { _id: "category-mlb", _type: "category", title: "MLB", slug: { _type: "slug", current: "mlb" }, sportKey: "baseball_mlb", description: "MLB game previews, baseball trends and daily matchup research.", navigationOrder: 4, enabled: true },
  { _id: "category-ufc", _type: "category", title: "UFC / MMA", slug: { _type: "slug", current: "ufc" }, sportKey: "mma_mixed_martial_arts", description: "UFC fight guides, matchup analysis and DFS coverage.", navigationOrder: 5, enabled: true }
];

const author = {
  _id: "author-jbi-staff", _type: "author",
  name: "Just-Bet-It Staff",
  slug: { _type: "slug", current: "just-bet-it-staff" },
  bio: "Editorial team at Just-Bet-It."
};

const tools = [
  { _id: "tool-passing", title: "Advanced passing", slug: "advanced-passing", description: "Explore advanced passing context and compare quarterback and team profiles.", sport: "category-nfl", url: "https://jbi-advanced-passing.cookthebookies.chatgpt.site/", iconLabel: "AP", navigationOrder: 1 },
  { _id: "tool-rushing", title: "Basic rushing", slug: "basic-rushing", description: "Review rushing data through a focused, easy-to-scan view.", sport: "category-nfl", url: "https://advanced-rushing-data.cookthebookies.chatgpt.site/", iconLabel: "BR", navigationOrder: 2 },
  { _id: "tool-rushing-rankings", title: "Advanced rushing rankings", slug: "advanced-rushing-rankings", description: "Compare rushing output and rankings with additional context.", sport: "category-nfl", url: "https://nfl-advanced-rushing-rankings.cookthebookies.chatgpt.site/", iconLabel: "AR", navigationOrder: 3 },
  { _id: "tool-alignment", title: "Alignment matchups", slug: "alignment-matchups", description: "Explore how player alignment and matchup context can frame a game.", sport: "category-nfl", url: "https://nfl-alignment-matchups.cookthebookies.chatgpt.site/", iconLabel: "AM", navigationOrder: 4 },
  { _id: "tool-coverage", title: "Coverage scheme analytics", slug: "coverage-scheme-analytics", description: "Investigate defensive coverage trends and scheme-level context.", sport: "category-nfl", url: "https://jbi-defensive-coverage-analytics.cookthebookies.chatgpt.site/", iconLabel: "CS", navigationOrder: 5 },
  { _id: "tool-mlb", title: "MLB daily matchups", slug: "mlb-daily-matchups", description: "Open the daily MLB matchup research app hosted on Streamlit.", sport: "category-mlb", url: "https://dailymatchups-b5vzfmbskcwfnvskb6faqt.streamlit.app/", iconLabel: "MLB", navigationOrder: 6 }
].map((tool) => ({
  _id: tool._id, _type: "tool", title: tool.title,
  slug: { _type: "slug", current: tool.slug }, description: tool.description,
  sport: { _type: "reference", _ref: tool.sport }, url: tool.url,
  iconLabel: tool.iconLabel, status: "available", navigationOrder: tool.navigationOrder
}));

const settings = {
  _id: "siteSettings", _type: "siteSettings",
  siteName: "Just-Bet-It",
  tagline: "Research first. Read the game with context.",
  heroTitle: "Read the game. Not the hype.",
  heroDescription: "Matchup previews, player-prop context and research tools that make the numbers easier to understand. Start with the evidence. Build your own view of the slate.",
  propalyticsUrl: "https://propalytics.bet/",
  disclaimer: "This site is for entertainment purposes only and does not involve real-money betting. Sports outcomes are uncertain. Research does not guarantee a result. Use responsible judgment and follow the rules in your jurisdiction.",
  socialLinks: []
};

const articles = [
  {
    _id: "legacy-nfl-week-8", _type: "article",
    title: "NFL Week 8 Sunday Slate Game Previews",
    slug: { _type: "slug", current: "nfl-week-8-sunday-slate-game-previews" },
    excerpt: "A slate-level look at matchups, availability and the factors that can shift a game script.",
    sport: { _type: "reference", _ref: "category-nfl" }, contentCategory: "Game preview",
    author: { _type: "reference", _ref: author._id },
    publishedAt: "2026-10-28T12:00:00.000Z", featured: true, accessLevel: "members", body: [],
    sourceUrl: "https://just-bet-it.com/nfl-week-8-sunday-slate-game-previews/"
  },
  {
    _id: "legacy-cfb-week-8", _type: "article",
    title: "CFB Week 8 Top ATS / Total Picks",
    slug: { _type: "slug", current: "cfb-week-8-top-ats-total-picks" },
    excerpt: "College football slate notes and spread/total coverage from the editorial archive.",
    sport: { _type: "reference", _ref: "category-cfb" }, contentCategory: "ATS / totals",
    author: { _type: "reference", _ref: author._id },
    publishedAt: "2026-10-23T12:00:00.000Z", featured: false, accessLevel: "public", body: [],
    sourceUrl: "https://just-bet-it.com/cfb-week-8-top-ats-total-picks/"
  },
  {
    _id: "legacy-nba-previews", _type: "article",
    title: "10/29/26 NBA Game Previews",
    slug: { _type: "slug", current: "10-29-26-nba-game-previews" },
    excerpt: "Daily matchup coverage with context around recent form and opponents on the schedule.",
    sport: { _type: "reference", _ref: "category-nba" }, contentCategory: "Game preview",
    author: { _type: "reference", _ref: author._id },
    publishedAt: "2026-10-29T12:00:00.000Z", featured: false, accessLevel: "public", body: [],
    sourceUrl: "https://just-bet-it.com/10-29-26-nba-game-previews/"
  },
  {
    _id: "legacy-nba-props", _type: "article",
    title: "10/27/26 NBA Top Prop Picks",
    slug: { _type: "slug", current: "10-27-26-nba-top-prop-picks" },
    excerpt: "Player-prop editorial coverage from the NBA archive. Review context before forming a view.",
    sport: { _type: "reference", _ref: "category-nba" }, contentCategory: "Player props",
    author: { _type: "reference", _ref: author._id },
    publishedAt: "2026-10-27T12:00:00.000Z", featured: false, accessLevel: "members", body: [],
    sourceUrl: "https://just-bet-it.com/10-27-26-nba-top-prop-picks/"
  }
];

const documents = [...sports, author, ...tools, settings, ...articles];
const transaction = client.transaction();
for (const document of documents) transaction.createIfNotExists(document);
const result = await transaction.commit();
console.log("Seed complete:", documents.length, "CMS documents were created when missing.");
console.log("Transaction ID:", result.transactionId);
console.log("Existing document IDs are not overwritten. You can now open /studio and edit the seeded content.");
