import { NextRequest,NextResponse } from "next/server";
import { analyzeMarketEdges,type RawEvent } from "@/lib/market-math";
export const dynamic="force-dynamic";
const SPORTS=new Set(["basketball_nba","basketball_ncaab","basketball_wnba","americanfootball_nfl","americanfootball_ncaaf","baseball_mlb","icehockey_nhl","soccer_epl","soccer_uefa_champs_league"]);
const REGIONS=new Set(["us","us2","uk","eu","au"]);
export async function GET(request:NextRequest){
 const sport=request.nextUrl.searchParams.get("sport")||"basketball_nba";
 const region=request.nextUrl.searchParams.get("region")||"us";
 if(!SPORTS.has(sport))return NextResponse.json({configured:false,error:"This sport is not enabled."},{status:400});
 if(!REGIONS.has(region))return NextResponse.json({configured:false,error:"Unsupported bookmaker region."},{status:400});
 const apiKey=process.env.THE_ODDS_API_KEY;
 if(!apiKey)return NextResponse.json({configured:false,provider:"The Odds API",sport,region,message:"Connect The Odds API to load live bookmaker prices. Add THE_ODDS_API_KEY to Vercel Project Settings → Environment Variables, then redeploy."},{status:503});
 const url=new URL("https://api.the-odds-api.com/v4/sports/"+sport+"/odds/");
 url.searchParams.set("apiKey",apiKey);url.searchParams.set("regions",region);url.searchParams.set("markets","h2h,spreads,totals");url.searchParams.set("oddsFormat","american");url.searchParams.set("dateFormat","iso");
 try{
  const upstream=await fetch(url,{next:{revalidate:60},signal:AbortSignal.timeout(12000)});
  const remaining=upstream.headers.get("x-requests-remaining"),used=upstream.headers.get("x-requests-used");
  if(!upstream.ok){
   const details=await upstream.text();console.error("Odds board provider error",upstream.status,details.slice(0,400));
   const message=upstream.status===401?"The provider rejected the key. Check THE_ODDS_API_KEY.":upstream.status===429?"The provider quota or rate limit has been reached.":"The odds provider could not return this league/region.";
   return NextResponse.json({configured:true,error:message,providerStatus:upstream.status},{status:upstream.status===429?429:502});
  }
  const raw=await upstream.json() as RawEvent[];
  const events=analyzeMarketEdges(Array.isArray(raw)?raw:[]);
  const edges=events.flatMap(event=>event.edges).sort((a,b)=>b.expectedValuePct-a.expectedValuePct);
  return NextResponse.json({configured:true,provider:"The Odds API",sport,region,updatedAt:new Date().toISOString(),
   quota:{remaining:remaining===null?null:Number(remaining),used:used===null?null:Number(used)},events,edges,
   summary:{eventCount:events.length,bookmakerCount:Math.max(0,...events.map(event=>event.bookmakerCount)),positivePriceGaps:edges.filter(edge=>edge.expectedValuePct>0).length}
  },{headers:{"Cache-Control":"private, max-age=0, no-store"}});
 }catch(error){console.error("Odds board request failed",error);return NextResponse.json({configured:true,error:"The odds provider timed out or could not be reached."},{status:502});}
}
