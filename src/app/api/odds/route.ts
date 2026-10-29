import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const ALLOWED_SPORTS = new Set([
  "americanfootball_nfl",
  "americanfootball_ncaaf",
  "basketball_nba",
  "baseball_mlb"
]);
const ALLOWED_MARKETS = new Set(["h2h", "spreads", "totals"]);

type ProviderOutcome = { name?: string; price?: number; point?: number };
type ProviderMarket = { key?: string; outcomes?: ProviderOutcome[] };
type ProviderBookmaker = { key?: string; title?: string; markets?: ProviderMarket[] };
type ProviderEvent = {
  id?: string;
  commence_time?: string;
  home_team?: string;
  away_team?: string;
  bookmakers?: ProviderBookmaker[];
};
type BestLine = { name: string; price: number; point?: number; bookmaker: string };

export async function GET(request: NextRequest) {
  const sport = request.nextUrl.searchParams.get("sport") || "americanfootball_nfl";
  const market = request.nextUrl.searchParams.get("market") || "h2h";
  if (!ALLOWED_SPORTS.has(sport)) {
    return NextResponse.json({ configured: false, error: "This league is not enabled by the odds feed." }, { status: 400 });
  }
  if (!ALLOWED_MARKETS.has(market)) {
    return NextResponse.json({ configured: false, error: "This odds market is not enabled." }, { status: 400 });
  }
  const apiKey = process.env.THE_ODDS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ configured: false, message: "Add THE_ODDS_API_KEY in the hosting environment to enable current market prices. Keep this secret server-side." }, { status: 503 });
  }

  const endpoint = new URL("https://api.the-odds-api.com/v4/sports/" + sport + "/odds/");
  endpoint.searchParams.set("apiKey", apiKey);
  endpoint.searchParams.set("regions", "us");
  endpoint.searchParams.set("markets", market);
  endpoint.searchParams.set("oddsFormat", "american");
  endpoint.searchParams.set("dateFormat", "iso");

  try {
    const upstream = await fetch(endpoint, { next: { revalidate: 90 }, signal: AbortSignal.timeout(10000) });
    if (!upstream.ok) {
      const details = await upstream.text();
      console.error("Odds provider request failed:", upstream.status, details.slice(0, 300));
      return NextResponse.json({
        configured: true,
        error: upstream.status === 401 ? "The odds provider rejected the API key." :
          upstream.status === 429 ? "The odds API quota/rate limit was reached. Wait before refreshing or review your plan." :
          "The odds provider did not return prices. Check the API plan and league/market coverage."
      }, { status: upstream.status === 429 ? 429 : 502 });
    }

    const payload: unknown = await upstream.json();
    const events = Array.isArray(payload) ? (payload as ProviderEvent[]).map((event) => {
      const best = new Map<string, BestLine>();
      for (const bookmaker of event.bookmakers || []) {
        for (const providerMarket of bookmaker.markets || []) {
          if (providerMarket.key !== market) continue;
          for (const outcome of providerMarket.outcomes || []) {
            if (!outcome.name || typeof outcome.price !== "number" || !Number.isFinite(outcome.price)) continue;
            const line: BestLine = {
              name: outcome.name,
              price: outcome.price,
              point: typeof outcome.point === "number" ? outcome.point : undefined,
              bookmaker: bookmaker.title || bookmaker.key || "Sportsbook"
            };
            const key = line.name + "|" + String(line.point ?? "");
            const existing = best.get(key);
            if (!existing || line.price > existing.price) best.set(key, line);
          }
        }
      }
      const lines = Array.from(best.values()).sort((a, b) => a.name.localeCompare(b.name) || (a.point ?? 0) - (b.point ?? 0));
      return {
        id: String(event.id || ""),
        commence_time: String(event.commence_time || ""),
        home_team: String(event.home_team || "Home"),
        away_team: String(event.away_team || "Away"),
        lines
      };
    }) : [];

    return NextResponse.json({ configured: true, sport, market, events }, {
      headers: { "Cache-Control": "private, max-age=0, no-store" }
    });
  } catch (error) {
    console.error("Odds provider is unavailable.", error);
    return NextResponse.json({ configured: true, error: "The odds provider timed out or could not be reached." }, { status: 502 });
  }
}