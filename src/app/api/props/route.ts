import { NextRequest,NextResponse } from "next/server";
import { analyzeMarketEdges,type RawEvent,marketLabel } from "@/lib/market-math";
export const dynamic="force-dynamic";
const PROP_MARKETS:Record<string,Set<string>>={
 basketball_nba:new Set(["player_points","player_points_alternate","player_rebounds","player_rebounds_alternate","player_assists","player_assists_alternate","player_threes","player_threes_alternate","player_points_rebounds_assists","player_points_rebounds_assists_alternate","player_points_rebounds","player_points_assists","player_rebounds_assists","player_blocks","player_steals","player_turnovers"]),
 americanfootball_nfl:new Set(["player_pass_yds","player_pass_yds_alternate","player_pass_tds","player_pass_completions","player_pass_attempts","player_rush_yds","player_rush_yds_alternate","player_rush_attempts","player_receptions","player_reception_yds","player_reception_yds_alternate","player_rush_reception_yds","player_rush_reception_tds"]),
 baseball_mlb:new Set(["batter_hits","batter_total_bases","batter_home_runs","batter_rbis","batter_runs","batter_hits_runs_rbis","pitcher_strikeouts","pitcher_outs","pitcher_hits_allowed","pitcher_earned_runs","pitcher_walks"])
};
export async function GET(request:NextRequest){
 const sport=request.nextUrl.searchParams.get("sport")||"basketball_nba",eventId=request.nextUrl.searchParams.get("eventId")||"",market=request.nextUrl.searchParams.get("market")||"player_points",region=request.nextUrl.searchParams.get("region")||"us";
 if(!PROP_MARKETS[sport]||!PROP_MARKETS[sport].has(market))return NextResponse.json({configured:false,error:"That player-prop market is not enabled for this sport."},{status:400});
 if(!/^[a-zA-Z0-9_-]{8,80}$/.test(eventId))return NextResponse.json({configured:false,error:"Select a valid event before loading player props."},{status:400});
 if(!new Set(["us","us2","uk","eu","au"]).has(region))return NextResponse.json({configured:false,error:"Unsupported bookmaker region."},{status:400});
 const apiKey=process.env.THE_ODDS_API_KEY;
 if(!apiKey)return NextResponse.json({configured:false,message:"Add THE_ODDS_API_KEY to Vercel to load player-prop lines."},{status:503});
 const url=new URL("https://api.the-odds-api.com/v4/sports/"+sport+"/events/"+eventId+"/odds/");
 url.searchParams.set("apiKey",apiKey);url.searchParams.set("regions",region);url.searchParams.set("markets",market);url.searchParams.set("oddsFormat","american");url.searchParams.set("dateFormat","iso");
 try{
  const upstream=await fetch(url,{next:{revalidate:60},signal:AbortSignal.timeout(12000)});
  if(!upstream.ok){const body=await upstream.text();console.error("Player props provider error",upstream.status,body.slice(0,400));const message=upstream.status===401?"The provider rejected the API key.":upstream.status===429?"The provider quota/rate limit has been reached.":"This prop market is not available for the current event, bookmaker region or API plan.";return NextResponse.json({configured:true,error:message},{status:upstream.status===429?429:502});}
  const raw=await upstream.json() as RawEvent;
  const analyzed=analyzeMarketEdges([{...raw,sport_key:sport,sport_title:raw.sport_title||sport,bookmakers:raw.bookmakers||[]}]);
  const props=analyzed.flatMap(item=>item.edges).filter(edge=>edge.marketKey===market&&edge.player).sort((a,b)=>b.expectedValuePct-a.expectedValuePct);
  return NextResponse.json({configured:true,sport,eventId,market,marketLabel:marketLabel(market),updatedAt:new Date().toISOString(),props},{headers:{"Cache-Control":"private, max-age=0, no-store"}});
 }catch(error){console.error("Player props request failed",error);return NextResponse.json({configured:true,error:"The player-prop feed timed out or could not be reached."},{status:502});}
}
