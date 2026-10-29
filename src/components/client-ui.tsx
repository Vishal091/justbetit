"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Article, ResearchTool, SiteSettings, SportCategory } from "@/sanity/content";
import { formatDate } from "@/lib/format-date";

export function SiteHeader({ sports, siteName, propalyticsUrl }: { sports: SportCategory[]; siteName: string; propalyticsUrl: string }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell nav-wrap">
    <Link className="brand" href="/" aria-label={siteName + " home"} onClick={() => setOpen(false)}><span className="brand-mark">J<span>/</span></span><span className="brand-name">JUST<span>BET</span>IT</span></Link>
    <button type="button" className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((v) => !v)}>{open ? "×" : "☰"}</button>
    <nav id="primary-navigation" className={open ? "nav open" : "nav"} aria-label="Main navigation">
      <Link href="/articles" onClick={() => setOpen(false)}>Analysis</Link><div className="nav-sports"><Link href="/#sports" onClick={() => setOpen(false)}>Sports</Link><div className="sports-dropdown">{sports.map((s) => <Link key={s._id} href={"/sports/" + s.slug} onClick={() => setOpen(false)}>{s.title}</Link>)}</div></div>
      <Link href="/#tools" onClick={() => setOpen(false)}>Data suite</Link><a href={propalyticsUrl} target="_blank" rel="noopener noreferrer">Propalytics ↗</a><Link href="/#about" onClick={() => setOpen(false)}>About</Link>
    </nav><div className="nav-actions"><a className="btn btn-ghost" href={propalyticsUrl} target="_blank" rel="noopener noreferrer">Log in ↗</a><a className="btn btn-primary" href={propalyticsUrl} target="_blank" rel="noopener noreferrer">Explore Propalytics ↗</a></div>
  </div></header>;
}

export function ArticleGrid({ articles, sports, showSearch = true }: { articles: Article[]; sports: SportCategory[]; showSearch?: boolean }) {
  const [sport, setSport] = useState("all"); const [query, setQuery] = useState("");
  const visible = useMemo(() => articles.filter((a) => (sport === "all" || a.sportSlug === sport) && [a.title,a.excerpt,a.sport,a.category,a.author].join(" ").toLowerCase().includes(query.trim().toLowerCase())), [articles,sport,query]);
  return <div className="article-browser"><div className="filter-row"><div className="filter-tabs" role="group" aria-label="Filter articles by sport">
    <button className={sport === "all" ? "filter-tab active" : "filter-tab"} aria-pressed={sport === "all"} type="button" onClick={() => setSport("all")}>All coverage</button>
    {sports.map((s) => <button className={sport === s.slug ? "filter-tab active" : "filter-tab"} key={s._id} aria-pressed={sport === s.slug} type="button" onClick={() => setSport(s.slug)}>{s.title}</button>)}
  </div>{showSearch && <label className="search-box"><span className="sr-only">Search articles</span><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." /></label>}</div>
  <div className="story-grid">{visible.map((a,i) => { const body = <><div className={"story-art " + (a.sportSlug || "default")}><span className="art-word" aria-hidden="true">{(a.sport || "JBI").toUpperCase()}</span><div className="art-sport"><span />{a.sport} / {(a.category || "ANALYSIS").toUpperCase()}</div></div><div className="story-body"><div className="story-meta"><span className="badge">{a.accessLevel === "members" ? "Member read" : (a.category || "Analysis")}</span><span>{formatDate(a.publishedAt)}</span></div><h3>{a.title}</h3><p>{a.excerpt}</p><div className="story-foot"><span className="byline">{a.author || "JUST-BET-IT STAFF"}</span><span className="arrow-circle">↗</span></div></div></>; const cls = "story-card" + (i === 0 ? " featured" : ""); return a.sourceUrl ? <a className={cls} href={a.sourceUrl} target="_blank" rel="noopener noreferrer" key={a._id}>{body}</a> : <Link className={cls} href={"/articles/" + a.slug} key={a._id}>{body}</Link>; })}</div>
  {!visible.length && <div className="empty-state"><strong>No articles found.</strong><p>Try another sport or keyword, or publish new coverage in the CMS.</p></div>}</div>;
}

type Score = { name: string; score: string };
type Game = { id: string; home_team: string; away_team: string; commence_time: string; completed?: boolean; scores?: Score[] | null };
type Feed = { configured?: boolean; events?: Game[]; message?: string; error?: string };
const SPORTS = [{label:"NFL",key:"americanfootball_nfl"},{label:"College football",key:"americanfootball_ncaaf"},{label:"NBA",key:"basketball_nba"},{label:"MLB",key:"baseball_mlb"},{label:"MMA",key:"mma_mixed_martial_arts"}];
function gameStatus(g: Game) { if(g.completed)return "FINAL"; if(g.scores?.length)return "SCORES AVAILABLE"; return new Date(g.commence_time).toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}); }
export function LiveScores() {
  const [sport,setSport]=useState(SPORTS[0].key); const [games,setGames]=useState<Game[]>([]); const [message,setMessage]=useState("Loading sports schedule…"); const [loading,setLoading]=useState(true); const [updated,setUpdated]=useState<string|null>(null);
  const refresh=useCallback(async()=>{setLoading(true);try{const response=await fetch("/api/sports?sport="+encodeURIComponent(sport),{cache:"no-store"});const data=await response.json() as Feed;if(!response.ok||!data.configured){setGames([]);setMessage(data.message||data.error||"Live scores are not configured yet.");}else{setGames(data.events||[]);setMessage((data.events||[]).length?"":"No upcoming or recently completed games were returned.");setUpdated(new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}));}}catch{setGames([]);setMessage("The sports feed could not be reached.");}finally{setLoading(false);}},[sport]);
  useEffect(()=>{void refresh();const timer=window.setInterval(()=>void refresh(),60000);return()=>window.clearInterval(timer);},[refresh]);
  return <section className="live-section" aria-labelledby="live-heading"><div className="live-head"><div><div className="eyebrow"><span className="pulse-dot" /> Sports data feed</div><h2 id="live-heading">The slate, in motion.</h2><p>Scores and schedules from the connected provider. Refreshes automatically when configured.</p></div><div className="live-controls"><label><span className="sr-only">Choose sport</span><select value={sport} onChange={(e)=>setSport(e.target.value)}>{SPORTS.map((s)=><option key={s.key} value={s.key}>{s.label}</option>)}</select></label><button className="btn btn-ghost" type="button" disabled={loading} onClick={()=>void refresh()}>{loading?"Refreshing…":"↻ Refresh"}</button></div></div>
  {games.length ? <div className="score-grid">{games.slice(0,6).map((g)=><article className="score-card" key={g.id}><div className="score-card-top"><span>{gameStatus(g)}</span><span className="score-small">{g.completed?"FINAL":"GAME"}</span></div><div className="score-team"><span>{g.away_team}</span><strong>{g.scores?.find((s)=>s.name===g.away_team)?.score ?? "–"}</strong></div><div className="score-team"><span>{g.home_team}</span><strong>{g.scores?.find((s)=>s.name===g.home_team)?.score ?? "–"}</strong></div></article>)}</div> : <div className="live-empty"><span className="live-empty-icon">{loading?"…":"↗"}</span><div><strong>{loading?"Connecting to sports feed":"Sports feed needs setup"}</strong><p>{message}</p></div>{!loading&&<a className="text-link" href="https://the-odds-api.com/" target="_blank" rel="noopener noreferrer">Get API key ↗</a>}</div>}
  <div className="live-foot"><span>Availability and refresh frequency depend on the provider plan and league coverage.</span>{updated&&<span>Last refreshed {updated}</span>}</div></section>;
}

export function SiteFooter({settings,sports,tools}:{settings:SiteSettings;sports:SportCategory[];tools:ResearchTool[]}) {
  return <footer className="site-footer"><div className="shell"><div className="footer-main">
    <div className="footer-brand"><Link className="brand" href="/"><span className="brand-mark">J<span>/</span></span><span className="brand-name">JUST<span>BET</span>IT</span></Link><p>Sports analysis, matchup research and purpose-built data tools—organized around clarity, context and responsible use.</p><div className="social-row">{settings.socialLinks.filter(s=>s.url).map(s=><a className="social-link" key={s.network} href={s.url} target="_blank" rel="noopener noreferrer">{s.network} ↗</a>)}</div></div>
    <div className="footer-col"><h4>Explore</h4><Link href="/articles">Latest analysis</Link>{sports.slice(0,5).map(s=><Link key={s._id} href={"/sports/"+s.slug}>{s.title}</Link>)}<Link href="/#tools">Data suite</Link></div>
    <div className="footer-col"><h4>Research tools</h4>{tools.filter(t=>t.status==="available").slice(0,5).map(t=>t.url?<a key={t._id} href={t.url} target="_blank" rel="noopener noreferrer">{t.title} ↗</a>:null)}<a href={settings.propalyticsUrl} target="_blank" rel="noopener noreferrer">Propalytics ↗</a></div>
    <div className="footer-col"><h4>Support &amp; legal</h4><a href="https://just-bet-it.com/about-us/" target="_blank" rel="noopener noreferrer">About Just-Bet-It ↗</a><a href="https://just-bet-it.com/give-feedback/" target="_blank" rel="noopener noreferrer">Give feedback ↗</a><a href="https://just-bet-it.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">Terms and Conditions ↗</a><a href="https://just-bet-it.com/privacy-policy-2/" target="_blank" rel="noopener noreferrer">Privacy Policy ↗</a><Link href="/studio">CMS / Admin</Link></div>
  </div><div className="footer-bottom"><p className="disclaimer">{settings.disclaimer}</p><p className="copyright">© {new Date().getFullYear()} JUST-BET-IT</p></div></div></footer>;
}

type OddsLine = { name: string; price: number; point?: number; bookmaker: string };
type OddsGame = { id: string; commence_time: string; home_team: string; away_team: string; lines: OddsLine[] };
type OddsResponse = { configured?: boolean; events?: OddsGame[]; message?: string; error?: string };
const ODDS_MARKETS = [{ label: "Moneyline", key: "h2h" }, { label: "Spread", key: "spreads" }, { label: "Total", key: "totals" }];
function formatAmerican(price: number) { return price > 0 ? "+" + price : String(price); }
function formatKickoff(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "Scheduled" : parsed.toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}
export function OddsBoard() {
  const [sport, setSport] = useState(SPORTS[0].key);
  const [market, setMarket] = useState("h2h");
  const [games, setGames] = useState<OddsGame[]>([]);
  const [message, setMessage] = useState("Loading current market prices…");
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState<string | null>(null);
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/odds?sport=" + encodeURIComponent(sport) + "&market=" + encodeURIComponent(market), { cache: "no-store" });
      const data = await response.json() as OddsResponse;
      if (!response.ok || !data.configured) { setGames([]); setMessage(data.message || data.error || "Odds data is not configured yet."); }
      else {
        setGames(data.events || []);
        setMessage((data.events || []).length ? "" : "No upcoming games or market prices were returned for this league and market.");
        setUpdated(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
      }
    } catch { setGames([]); setMessage("The odds feed could not be reached. Please try again."); }
    finally { setLoading(false); }
  }, [sport, market]);
  useEffect(() => { void refresh(); }, [refresh]);
  return <section className="odds-section" aria-labelledby="odds-heading">
    <div className="live-head">
      <div><div className="eyebrow">Market snapshot</div><h2 id="odds-heading">Lines across the slate.</h2><p>Compare prices returned by the connected provider across available bookmakers in the selected region.</p></div>
      <div className="live-controls">
        <label><span className="sr-only">Choose sport for odds</span><select value={sport} onChange={(event) => setSport(event.target.value)}>{SPORTS.filter((item) => item.key !== "mma_mixed_martial_arts").map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label>
        <button className="btn btn-ghost" type="button" disabled={loading} onClick={() => void refresh()}>{loading ? "Loading…" : "↻ Refresh lines"}</button>
      </div>
    </div>
    <div className="odds-market-tabs" role="group" aria-label="Choose odds market">
      {ODDS_MARKETS.map((item) => <button key={item.key} type="button" aria-pressed={market === item.key} className={market === item.key ? "odds-market-tab active" : "odds-market-tab"} onClick={() => setMarket(item.key)}>{item.label}</button>)}
    </div>
    {games.length ? <div className="odds-games">{games.slice(0, 12).map((game) => <article className="odds-game" key={game.id}>
      <div className="odds-game-header"><div><span className="odds-league-label">{SPORTS.find((item) => item.key === sport)?.label || "SPORTS"} / {ODDS_MARKETS.find((item) => item.key === market)?.label}</span><h3>{game.away_team} <span>at</span> {game.home_team}</h3></div><time>{formatKickoff(game.commence_time)}</time></div>
      {game.lines.length ? <div className="odds-lines">{game.lines.slice(0, 8).map((line, index) => <div className="odds-line" key={line.name + "-" + String(line.point ?? "") + "-" + index}><div className="odds-selection"><strong>{line.name}{typeof line.point === "number" ? " " + (line.point > 0 ? "+" : "") + line.point : ""}</strong><small>{line.bookmaker}</small></div><strong className="odds-price">{formatAmerican(line.price)}</strong></div>)}</div> : <p className="odds-no-lines">No prices returned for this market.</p>}
    </article>)}</div> : <div className="live-empty"><span className="live-empty-icon">{loading ? "…" : "↗"}</span><div><strong>{loading ? "Loading market prices" : "Odds feed needs setup"}</strong><p>{message}</p></div>{!loading && <a className="text-link" href="https://the-odds-api.com/" target="_blank" rel="noopener noreferrer">Provider details ↗</a>}</div>}
    <div className="live-foot"><span>Prices are informational, may be delayed, and reflect the bookmakers and region available in the connected plan.</span>{updated && <span>Updated {updated}</span>}</div>
  </section>;
}
