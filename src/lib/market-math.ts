export type RawOutcome = { name?: string; description?: string; player_name?: string; price?: number; point?: number };
export type RawMarket = { key?: string; outcomes?: RawOutcome[]; last_update?: string };
export type RawBookmaker = { key?: string; title?: string; last_update?: string; markets?: RawMarket[] };
export type RawEvent = { id?: string; sport_key?: string; sport_title?: string; commence_time?: string; home_team?: string; away_team?: string; bookmakers?: RawBookmaker[] };
export type MarketEdge = {
  id:string; eventId:string; sportKey:string; sportTitle:string; commenceTime:string; matchup:string;
  marketKey:string; marketLabel:string; selection:string; player:string|null; side:string; point:number|null;
  bestPrice:number; bestBook:string; fairProbability:number; impliedProbability:number;
  edgePct:number; expectedValuePct:number; bookmakerCount:number; lastUpdated:string|null;
};
export type NormalizedEvent = {
  id:string; sportKey:string; sportTitle:string; commenceTime:string; homeTeam:string; awayTeam:string;
  bookmakerCount:number; lastUpdated:string|null; edges:MarketEdge[];
};

const MARKET_LABELS:Record<string,string>={
 h2h:"Moneyline",h2h_3_way:"3-way moneyline",spreads:"Spread",alternate_spreads:"Alternate spread",
 totals:"Total",alternate_totals:"Alternate total",team_totals:"Team total",
 player_points:"Player points",player_points_alternate:"Alt. player points",
 player_rebounds:"Player rebounds",player_rebounds_alternate:"Alt. player rebounds",
 player_assists:"Player assists",player_assists_alternate:"Alt. player assists",
 player_threes:"Player threes",player_threes_alternate:"Alt. player threes",
 player_points_rebounds_assists:"Points + rebounds + assists",
 player_points_rebounds_assists_alternate:"Alt. points + rebounds + assists",
 player_points_rebounds:"Points + rebounds",player_points_assists:"Points + assists",
 player_rebounds_assists:"Rebounds + assists",player_blocks:"Player blocks",
 player_steals:"Player steals",player_turnovers:"Player turnovers",
 player_pass_yds:"Passing yards",player_pass_tds:"Passing touchdowns",
 player_pass_completions:"Pass completions",player_pass_attempts:"Pass attempts",
 player_rush_yds:"Rushing yards",player_rush_attempts:"Rush attempts",
 player_receptions:"Receptions",player_reception_yds:"Receiving yards",
 player_rush_reception_yds:"Rush + receiving yards",batter_hits:"Batter hits",
 batter_total_bases:"Total bases",batter_home_runs:"Home runs",batter_rbis:"RBIs",
 batter_runs:"Runs",pitcher_strikeouts:"Pitcher strikeouts",pitcher_outs:"Pitcher outs",
 pitcher_hits_allowed:"Pitcher hits allowed",pitcher_walks:"Pitcher walks"
};
export function marketLabel(key:string):string{return MARKET_LABELS[key]||key.replaceAll("_"," ").replace(/\b\w/g,s=>s.toUpperCase());}
export function americanToImpliedProbability(price:number):number{
 if(!Number.isFinite(price)||price===0)return 0;
 return price<0?(-price)/((-price)+100):100/(price+100);
}
export function americanToDecimal(price:number):number{
 if(!Number.isFinite(price)||price===0)return 1;
 return price<0?1+100/(-price):1+price/100;
}
function round(value:number,digits=3){const factor=10**digits;return Math.round(value*factor)/factor;}
function lineBucket(marketKey:string,point?:number):string{
 if(typeof point!=="number"||!Number.isFinite(point))return "";
 return String(round(marketKey.includes("spread")?Math.abs(point):point,2));
}
function validPrice(value:unknown):value is number{return typeof value==="number"&&Number.isFinite(value)&&value!==0;}

type Aggregate={event:RawEvent;marketKey:string;player:string;side:string;point:number|null;bestPrice:number;bestBook:string;bestUpdated:string|null};
export function analyzeMarketEdges(events:RawEvent[]):NormalizedEvent[]{
 const fairBySelection=new Map<string,{total:number;count:number;books:Set<string>}>();
 const bestBySelection=new Map<string,Aggregate>();
 for(const event of events){
  for(const bookmaker of event.bookmakers||[]){
   for(const market of bookmaker.markets||[]){
    const marketKey=market.key||"unknown";
    const outcomes=(market.outcomes||[]).filter(item=>item.name&&validPrice(item.price));
    if(outcomes.length<2)continue;
    const groups=new Map<string,RawOutcome[]>();
    for(const outcome of outcomes){
     const player=outcome.description||outcome.player_name||"";
     const key=[marketKey,player,lineBucket(marketKey,outcome.point)].join("|");
     const current=groups.get(key)||[];current.push(outcome);groups.set(key,current);
    }
    for(const [lineGroup,groupOutcomes] of groups){
     if(groupOutcomes.length<2)continue;
     const probabilities=groupOutcomes.map(item=>americanToImpliedProbability(item.price as number));
     const totalProbability=probabilities.reduce((sum,value)=>sum+value,0);
     if(totalProbability<=0)continue;
     const bookName=bookmaker.title||bookmaker.key||"Sportsbook";
     const updated=market.last_update||bookmaker.last_update||null;
     groupOutcomes.forEach((outcome,index)=>{
      const player=outcome.description||outcome.player_name||"";
      const side=outcome.name||"Selection";
      const point=typeof outcome.point==="number"?outcome.point:null;
      const selectionKey=[String(event.id||""),marketKey,player,lineBucket(marketKey,point),side].join("|");
      const fair=probabilities[index]/totalProbability;
      const fairAggregate=fairBySelection.get(selectionKey)||{total:0,count:0,books:new Set<string>()};
      fairAggregate.total+=fair;fairAggregate.count+=1;fairAggregate.books.add(bookName);
      fairBySelection.set(selectionKey,fairAggregate);
      const current=bestBySelection.get(selectionKey);
      if(!current|| (outcome.price as number)>current.bestPrice){
       bestBySelection.set(selectionKey,{event,marketKey,player,side,point,bestPrice:outcome.price as number,bestBook:bookName,bestUpdated:updated});
      }
     });
    }
   }
  }
 }
 const byEvent=new Map<string,MarketEdge[]>();
 for(const [selectionKey,best] of bestBySelection){
  const fairAggregate=fairBySelection.get(selectionKey);
  if(!fairAggregate||fairAggregate.count<1)continue;
  const fairProbability=fairAggregate.total/fairAggregate.count;
  const impliedProbability=americanToImpliedProbability(best.bestPrice);
  const expectedValuePct=(fairProbability*americanToDecimal(best.bestPrice)-1)*100;
  const eventId=String(best.event.id||"");
  const label=(best.player?best.player+" ":"")+best.side+(best.point===null?"":" "+(best.point>0?"+":"")+best.point);
  const edge:MarketEdge={
   id:selectionKey,eventId,sportKey:best.event.sport_key||"",sportTitle:best.event.sport_title||best.event.sport_key||"Sports",
   commenceTime:best.event.commence_time||"",matchup:[best.event.away_team||"Away",best.event.home_team||"Home"].join(" @ "),
   marketKey:best.marketKey,marketLabel:marketLabel(best.marketKey),selection:label,player:best.player||null,side:best.side,point:best.point,
   bestPrice:best.bestPrice,bestBook:best.bestBook,fairProbability:round(fairProbability,5),
   impliedProbability:round(impliedProbability,5),edgePct:round((fairProbability-impliedProbability)*100,2),
   expectedValuePct:round(expectedValuePct,2),bookmakerCount:fairAggregate.books.size,lastUpdated:best.bestUpdated
  };
  const rows=byEvent.get(eventId)||[];rows.push(edge);byEvent.set(eventId,rows);
 }
 return events.map(event=>{
  const id=String(event.id||"");
  const edges=(byEvent.get(id)||[]).sort((a,b)=>b.expectedValuePct-a.expectedValuePct);
  const books=event.bookmakers||[];
  const updates=books.flatMap(book=>[...(book.markets||[]).map(m=>m.last_update||""),book.last_update||""]).filter(Boolean).sort();
  return {id,sportKey:event.sport_key||"",sportTitle:event.sport_title||event.sport_key||"Sports",commenceTime:event.commence_time||"",
   homeTeam:event.home_team||"Home",awayTeam:event.away_team||"Away",bookmakerCount:books.length,lastUpdated:updates.at(-1)||null,edges};
 });
}
