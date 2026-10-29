import { NextRequest,NextResponse } from "next/server";
export const dynamic="force-dynamic";
const ALLOWED=new Set(["americanfootball_nfl","americanfootball_ncaaf","basketball_nba","baseball_mlb","mma_mixed_martial_arts"]);
export async function GET(request:NextRequest){
 const sport=request.nextUrl.searchParams.get("sport")||"americanfootball_nfl";
 if(!ALLOWED.has(sport))return NextResponse.json({configured:false,error:"This league is not enabled by the sports feed."},{status:400});
 const apiKey=process.env.THE_ODDS_API_KEY;
 if(!apiKey)return NextResponse.json({configured:false,message:"Add THE_ODDS_API_KEY in the hosting environment to enable live and recent scores. Keep this secret server-side."},{status:503});
 const endpoint=new URL("https://api.the-odds-api.com/v4/sports/"+sport+"/scores/");endpoint.searchParams.set("apiKey",apiKey);endpoint.searchParams.set("daysFrom","1");endpoint.searchParams.set("dateFormat","iso");
 try{
  const upstream=await fetch(endpoint,{next:{revalidate:60},signal:AbortSignal.timeout(10000)});
  if(!upstream.ok){const details=await upstream.text();console.error("Sports provider failed:",upstream.status,details.slice(0,300));return NextResponse.json({configured:true,error:upstream.status===401?"The provider rejected the API key.":"The provider did not return scores. Check your plan and league coverage."},{status:upstream.status===429?429:502});}
  const payload:unknown=await upstream.json();
  const events=Array.isArray(payload)?payload.map((event:Record<string,unknown>)=>({id:String(event.id||""),commence_time:String(event.commence_time||""),home_team:String(event.home_team||"Home"),away_team:String(event.away_team||"Away"),completed:Boolean(event.completed),scores:Array.isArray(event.scores)?event.scores.map((score:{name?:string;score?:string|number})=>({name:String(score.name||""),score:String(score.score??"–")})):null})):[];
  return NextResponse.json({configured:true,sport,events},{headers:{"Cache-Control":"private, max-age=0, no-store"}});
 }catch(error){console.error("Sports provider unavailable.",error);return NextResponse.json({configured:true,error:"The sports provider timed out or could not be reached."},{status:502});}
}