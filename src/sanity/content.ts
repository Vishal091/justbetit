import { sanityClient, isSanityConfigured } from "./client";
export type SportCategory = { _id: string; title: string; slug: string; sportKey?: string; description?: string; navigationOrder?: number };
export type Article = { _id: string; title: string; slug: string; excerpt: string; sport: string; sportSlug: string; category?: string; author?: string; publishedAt?: string; featured?: boolean; accessLevel?: "public" | "members"; sourceUrl?: string; heroImageUrl?: string; heroImageAlt?: string; seoTitle?: string; seoDescription?: string; body?: Array<Record<string, unknown>> };
export type ResearchTool = { _id: string; title: string; slug: string; description: string; sport?: string; sportSlug?: string; url?: string; iconLabel?: string; status: "available" | "coming-soon" | "hidden"; navigationOrder?: number };
export type SiteSettings = { siteName: string; tagline: string; heroTitle: string; heroDescription: string; propalyticsUrl: string; disclaimer: string; socialLinks: Array<{ network: string; url: string }> };

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Just-Bet-It", tagline: "Research first. Read the game with context.", heroTitle: "Read the game. Not the hype.",
  heroDescription: "Matchup previews, player-prop context and research tools that make the numbers easier to understand. Start with the evidence. Build your own view of the slate.",
  propalyticsUrl: "https://propalytics.bet/",
  disclaimer: "This site is for entertainment purposes only and does not involve real-money betting. Sports outcomes are uncertain. Research does not guarantee a result. Use responsible judgment and follow the rules in your jurisdiction.",
  socialLinks: [{ network: "X", url: "https://x.com/Justbetit33" }]
};
export const FALLBACK_CATEGORIES: SportCategory[] = [
  { _id: "fallback-nfl", title: "NFL", slug: "nfl", sportKey: "americanfootball_nfl", navigationOrder: 1 },
  { _id: "fallback-cfb", title: "College Football", slug: "cfb", sportKey: "americanfootball_ncaaf", navigationOrder: 2 },
  { _id: "fallback-nba", title: "NBA", slug: "nba", sportKey: "basketball_nba", navigationOrder: 3 },
  { _id: "fallback-mlb", title: "MLB", slug: "mlb", sportKey: "baseball_mlb", navigationOrder: 4 },
  { _id: "fallback-ufc", title: "UFC / MMA", slug: "ufc", sportKey: "mma_mixed_martial_arts", navigationOrder: 5 }
];
export const FALLBACK_ARTICLES: Article[] = [
  { _id: "legacy-nfl", title: "NFL Week 8 Sunday Slate Game Previews", slug: "nfl-week-8-sunday-slate-game-previews", excerpt: "A slate-level look at matchups, availability and the factors that can shift a game script.", sport: "NFL", sportSlug: "nfl", category: "Game preview", author: "Just-Bet-It Staff", publishedAt: "2026-10-28T12:00:00.000Z", featured: true, accessLevel: "members", sourceUrl: "https://just-bet-it.com/nfl-week-8-sunday-slate-game-previews/" },
  { _id: "legacy-cfb", title: "CFB Week 8 Top ATS / Total Picks", slug: "cfb-week-8-top-ats-total-picks", excerpt: "College football slate notes and spread/total coverage from the editorial archive.", sport: "College Football", sportSlug: "cfb", category: "ATS / totals", author: "Just-Bet-It Staff", publishedAt: "2026-10-23T12:00:00.000Z", accessLevel: "public", sourceUrl: "https://just-bet-it.com/cfb-week-8-top-ats-total-picks/" },
  { _id: "legacy-nba", title: "10/29/26 NBA Game Previews", slug: "10-29-26-nba-game-previews", excerpt: "Daily matchup coverage with context around recent form and opponents on the schedule.", sport: "NBA", sportSlug: "nba", category: "Game preview", author: "Just-Bet-It Staff", publishedAt: "2026-10-29T12:00:00.000Z", accessLevel: "public", sourceUrl: "https://just-bet-it.com/10-29-26-nba-game-previews/" },
  { _id: "legacy-nba-props", title: "10/27/26 NBA Top Prop Picks", slug: "10-27-26-nba-top-prop-picks", excerpt: "Player-prop editorial coverage from the NBA archive. Review context before forming a view.", sport: "NBA", sportSlug: "nba", category: "Player props", author: "Just-Bet-It Staff", publishedAt: "2026-10-27T12:00:00.000Z", accessLevel: "members", sourceUrl: "https://just-bet-it.com/10-27-26-nba-top-prop-picks/" }
];
export const FALLBACK_TOOLS: ResearchTool[] = [
  { _id: "tool-passing", title: "Advanced passing", slug: "advanced-passing", description: "Explore advanced passing context and compare quarterback and team profiles.", sport: "NFL", sportSlug: "nfl", url: "https://jbi-advanced-passing.cookthebookies.chatgpt.site/", iconLabel: "AP", status: "available", navigationOrder: 1 },
  { _id: "tool-rushing", title: "Basic rushing", slug: "basic-rushing", description: "Review rushing data through a focused, easy-to-scan view.", sport: "NFL", sportSlug: "nfl", url: "https://advanced-rushing-data.cookthebookies.chatgpt.site/", iconLabel: "BR", status: "available", navigationOrder: 2 },
  { _id: "tool-rankings", title: "Advanced rushing rankings", slug: "advanced-rushing-rankings", description: "Compare rushing output and rankings with additional context.", sport: "NFL", sportSlug: "nfl", url: "https://nfl-advanced-rushing-rankings.cookthebookies.chatgpt.site/", iconLabel: "AR", status: "available", navigationOrder: 3 },
  { _id: "tool-alignment", title: "Alignment matchups", slug: "alignment-matchups", description: "Explore how player alignment and matchup context can frame a game.", sport: "NFL", sportSlug: "nfl", url: "https://nfl-alignment-matchups.cookthebookies.chatgpt.site/", iconLabel: "AM", status: "available", navigationOrder: 4 },
  { _id: "tool-coverage", title: "Coverage scheme analytics", slug: "coverage-scheme-analytics", description: "Investigate defensive coverage trends and scheme-level context.", sport: "NFL", sportSlug: "nfl", url: "https://jbi-defensive-coverage-analytics.cookthebookies.chatgpt.site/", iconLabel: "CS", status: "available", navigationOrder: 5 },
  { _id: "tool-mlb", title: "MLB daily matchups", slug: "mlb-daily-matchups", description: "Open the daily MLB matchup research app hosted on Streamlit.", sport: "MLB", sportSlug: "mlb", url: "https://dailymatchups-b5vzfmbskcwfnvskb6faqt.streamlit.app/", iconLabel: "MLB", status: "available", navigationOrder: 6 }
];
const LIST_FIELDS = '_id,title,"slug":slug.current,excerpt,"sport":sport->title,"sportSlug":sport->slug.current,"category":contentCategory,"author":author->name,publishedAt,featured,accessLevel,sourceUrl,seoTitle,seoDescription,"heroImageUrl":heroImage.asset->url,"heroImageAlt":heroImage.alt';
const PAGE_FIELDS = LIST_FIELDS + ",body";

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return DEFAULT_SETTINGS;
  try {
    const data = await sanityClient.fetch<Partial<SiteSettings> | null>('*[_type == "siteSettings" && _id == "siteSettings"][0]{siteName,tagline,heroTitle,heroDescription,propalyticsUrl,disclaimer,socialLinks[]{network,url}}', {}, { next: { revalidate: 60 } });
    return { ...DEFAULT_SETTINGS, ...(data || {}), socialLinks: Array.isArray(data?.socialLinks) ? data!.socialLinks! : DEFAULT_SETTINGS.socialLinks };
  } catch (error) { console.error("CMS settings query failed.", error); return DEFAULT_SETTINGS; }
}
export async function getCategories(): Promise<SportCategory[]> {
  if (!isSanityConfigured) return FALLBACK_CATEGORIES;
  try { return (await sanityClient.fetch<SportCategory[]>('*[_type == "category" && enabled == true] | order(navigationOrder asc,title asc){_id,title,"slug":slug.current,sportKey,description,navigationOrder}', {}, { next: { revalidate: 60 } })) || []; }
  catch (error) { console.error("CMS category query failed.", error); return FALLBACK_CATEGORIES; }
}
export async function getArticles(options?: { limit?: number; sportSlug?: string }): Promise<Article[]> {
  const limit = Math.max(1, Math.min(options?.limit || 12, 100));
  if (!isSanityConfigured) { const list = options?.sportSlug ? FALLBACK_ARTICLES.filter((a) => a.sportSlug === options.sportSlug) : FALLBACK_ARTICLES; return list.slice(0, limit); }
  try {
    const filter = '*[_type == "article" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()' + (options?.sportSlug ? ' && sport->slug.current == $sportSlug' : "") + ']';
    const query = filter + ' | order(featured desc,publishedAt desc)[0...$limit]{' + LIST_FIELDS + '}';
    return (await sanityClient.fetch<Article[]>(query, { limit, sportSlug: options?.sportSlug || "" }, { next: { revalidate: 60 } })) || [];
  } catch (error) { console.error("CMS article query failed.", error); return []; }
}
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch<Article | null>(' *[_type == "article" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0]{' + PAGE_FIELDS + '}', { slug }, { next: { revalidate: 60 } }); }
  catch (error) { console.error("CMS article page query failed.", error); return null; }
}
export async function getTools(): Promise<ResearchTool[]> {
  if (!isSanityConfigured) return FALLBACK_TOOLS;
  try { return (await sanityClient.fetch<ResearchTool[]>('*[_type == "tool" && status != "hidden"] | order(navigationOrder asc,title asc){_id,title,"slug":slug.current,description,"sport":sport->title,"sportSlug":sport->slug.current,url,iconLabel,status,navigationOrder}', {}, { next: { revalidate: 60 } })) || []; }
  catch (error) { console.error("CMS tool query failed.", error); return []; }
}
export function formatDate(value?: string) {
  if (!value) return "Research";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Research" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}