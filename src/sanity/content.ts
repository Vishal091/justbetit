import {sanityClient,isSanityConfigured} from "./client";
export type SportCategory={_id:string;title:string;slug:string;sportKey?:string;description?:string;navigationOrder?:number};
export type Article={_id:string;title:string;slug:string;excerpt:string;sport:string;sportSlug:string;category?:string;author?:string;publishedAt?:string;featured?:boolean;accessLevel?:"public"|"members";sourceUrl?:string;heroImageUrl?:string;heroImageAlt?:string;seoTitle?:string;seoDescription?:string;body?:Array<Record<string,unknown>>};
export type ResearchTool={_id:string;title:string;slug:string;description:string;sport?:string;sportSlug?:string;url?:string;iconLabel?:string;status:"available"|"coming-soon"|"hidden";navigationOrder?:number};
export type NavLink={label:string;href:string;external?:boolean;enabled?:boolean;order?:number};
export type FooterLink={group:string;label:string;href:string;external?:boolean;enabled?:boolean;order?:number};
export type FaqItem={question:string;answer:string};
export type Principle={title:string;description:string};
export type SitePage={_id:string;title:string;slug:string;excerpt?:string;body?:Array<Record<string,unknown>>;seoTitle?:string;seoDescription?:string;externalUrl?:string;externalLabel?:string};
export type SiteSettings={
 siteName:string;tagline:string;heroEyebrow:string;heroTitle:string;heroDescription:string;heroPrimaryLabel:string;heroPrimaryHref:string;heroSecondaryLabel:string;heroSecondaryHref:string;
 storiesTitle:string;storiesDescription:string;sportsTitle:string;sportsDescription:string;toolsTitle:string;toolsDescription:string;
 propalyticsUrl:string;propalyticsTitle:string;propalyticsDescription:string;aboutTitle:string;aboutDescription:string;principles:Principle[];
 archiveTitle:string;archiveDescription:string;faqTitle:string;faqDescription:string;faqItems:FaqItem[];
 disclaimer:string;navLinks:NavLink[];footerLinks:FooterLink[];socialLinks:Array<{network:string;url:string}>;
};
const DEFAULT_SETTINGS:SiteSettings={
 siteName:"Just-Bet-It",tagline:"Research first. Read the game with context.",
 heroEyebrow:"Sports intelligence, without the noise",heroTitle:"Read the game. Not the hype.",
 heroDescription:"Matchup previews, player-prop context and research tools that make the numbers easier to understand. Start with the evidence. Build your own view of the slate.",
 heroPrimaryLabel:"Explore latest analysis",heroPrimaryHref:"/articles",heroSecondaryLabel:"Explore data tools",heroSecondaryHref:"/#tools",
 storiesTitle:"Analysis worth your attention.",storiesDescription:"Game previews, player-prop research, ATS/totals and slate notes—organized so you can get to the coverage you need.",
 sportsTitle:"One home for the whole slate.",sportsDescription:"Explore sport-specific articles, betting coverage and DFS archives. Sports and their order are managed from the CMS.",
 toolsTitle:"Go deeper than the headline.",toolsDescription:"Purpose-built research tools help break down passing, rushing, alignment, coverage and MLB matchups. Each hosted tool opens as a separate destination.",
 propalyticsUrl:"https://propalytics.bet/",propalyticsTitle:"Bring the numbers into focus.",propalyticsDescription:"Continue to Propalytics for its connected sports analytics and member features. Account access remains on the separate service.",
 aboutTitle:"Better questions. Clearer context.",aboutDescription:"Just-Bet-It publishes sports analysis, matchup previews, player-prop research and data-led editorial coverage. The site brings articles, sport archives and specialist tools into one clear place.",
 principles:[{title:"Evidence before opinion",description:"Lead with context and the data behind a takeaway."},{title:"Research with a clear path",description:"Find sport archives, coverage types and specialist tools without hunting through menus."},{title:"Responsible by design",description:"Keep limitations and the entertainment-only disclaimer visible."}],
 archiveTitle:"Find the coverage you need.",archiveDescription:"Browse sport-specific articles, betting coverage and DFS collections from the original Just-Bet-It site.",
 faqTitle:"Clarity before you click.",faqDescription:"A few quick answers about the content, external tools and product links.",
 faqItems:[{question:"Does Just-Bet-It place bets?",answer:"No. Just-Bet-It publishes sports research and editorial coverage. It is not a sportsbook and does not place wagers."},{question:"Are all articles available to everyone?",answer:"Some coverage may be marked for Propalytics members. Those articles direct readers to the existing Propalytics service for access."},{question:"Are the research tools hosted on this website?",answer:"Some tools are separate hosted destinations. Each external tool is clearly labelled and opens in a new tab."},{question:"Do analysis or prop picks guarantee an outcome?",answer:"No. Sports are uncertain. Research can provide context, but it cannot guarantee a result or remove risk."},{question:"Where can I send feedback?",answer:"Use the Give Feedback page to reach the Just-Bet-It team."}],
 disclaimer:"This site is for entertainment purposes only and does not involve real-money betting. Sports outcomes are uncertain. Research does not guarantee a result. Use responsible judgment and follow the rules in your jurisdiction.",
 navLinks:[{label:"Analysis",href:"/articles",order:1},{label:"Sports",href:"/#sports",order:2},{label:"Data suite",href:"/#tools",order:3},{label:"Propalytics",href:"https://propalytics.bet/",external:true,order:4},{label:"About",href:"/about-us",order:5}],
 footerLinks:[{group:"Explore",label:"Latest analysis",href:"/articles",order:1},{group:"Explore",label:"Sports coverage",href:"/#sports",order:2},{group:"Explore",label:"Data suite",href:"/#tools",order:3},{group:"Explore",label:"Apparel",href:"/apparel",order:4},{group:"Products",label:"Propalytics",href:"https://propalytics.bet/",external:true,order:1},{group:"Support & legal",label:"About Just-Bet-It",href:"/about-us",order:1},{group:"Support & legal",label:"Give feedback",href:"/give-feedback",order:2},{group:"Support & legal",label:"Terms and Conditions",href:"/terms-and-conditions",order:3},{group:"Support & legal",label:"Privacy Policy",href:"/privacy-policy-2",order:4}],
 socialLinks:[{network:"X",url:"https://x.com/Justbetit33"}]
};
export const FALLBACK_CATEGORIES:SportCategory[]=[
 {_id:"fallback-nfl",title:"NFL",slug:"nfl",sportKey:"americanfootball_nfl",description:"Matchup previews, player props, betting coverage and DFS.",navigationOrder:1},
 {_id:"fallback-cfb",title:"College Football",slug:"cfb",sportKey:"americanfootball_ncaaf",description:"College football matchups, ATS/totals and slate notes.",navigationOrder:2},
 {_id:"fallback-nba",title:"NBA",slug:"nba",sportKey:"basketball_nba",description:"Daily game previews, player props and basketball research.",navigationOrder:3},
 {_id:"fallback-mlb",title:"MLB",slug:"mlb",sportKey:"baseball_mlb",description:"Baseball matchups, hitting trends and daily research.",navigationOrder:4},
 {_id:"fallback-ufc",title:"UFC / MMA",slug:"ufc",sportKey:"mma_mixed_martial_arts",description:"Fight previews, betting guides and DFS coverage.",navigationOrder:5}
];
export const FALLBACK_ARTICLES:Article[]=[
 {_id:"legacy-nfl",title:"NFL Week 8 Sunday Slate Game Previews",slug:"nfl-week-8-sunday-slate-game-previews",excerpt:"A slate-level look at matchups, availability and the factors that can shift a game script.",sport:"NFL",sportSlug:"nfl",category:"Game preview",author:"Just-Bet-It Staff",publishedAt:"2026-10-28T12:00:00.000Z",featured:true,accessLevel:"members",sourceUrl:"https://just-bet-it.com/nfl-week-8-sunday-slate-game-previews/"},
 {_id:"legacy-cfb",title:"CFB Week 8 Top ATS / Total Picks",slug:"cfb-week-8-top-ats-total-picks",excerpt:"College football slate notes and spread/total coverage from the editorial archive.",sport:"College Football",sportSlug:"cfb",category:"ATS / totals",author:"Just-Bet-It Staff",publishedAt:"2026-10-23T12:00:00.000Z",accessLevel:"public",sourceUrl:"https://just-bet-it.com/cfb-week-8-top-ats-total-picks/"},
 {_id:"legacy-nba",title:"10/29/26 NBA Game Previews",slug:"10-29-26-nba-game-previews",excerpt:"Daily matchup coverage with context around recent form and opponents on the schedule.",sport:"NBA",sportSlug:"nba",category:"Game preview",author:"Just-Bet-It Staff",publishedAt:"2026-10-29T12:00:00.000Z",accessLevel:"public",sourceUrl:"https://just-bet-it.com/10-29-26-nba-game-previews/"},
 {_id:"legacy-nba-props",title:"10/27/26 NBA Top Prop Picks",slug:"10-27-26-nba-top-prop-picks",excerpt:"Player-prop editorial coverage from the NBA archive. Review context before forming a view.",sport:"NBA",sportSlug:"nba",category:"Player props",author:"Just-Bet-It Staff",publishedAt:"2026-10-27T12:00:00.000Z",accessLevel:"members",sourceUrl:"https://just-bet-it.com/10-27-26-nba-top-prop-picks/"}
];
export const FALLBACK_TOOLS:ResearchTool[]=[
 {_id:"tool-passing",title:"Advanced passing",slug:"advanced-passing",description:"Explore advanced passing context and compare quarterback and team profiles.",sport:"NFL",sportSlug:"nfl",url:"https://jbi-advanced-passing.cookthebookies.chatgpt.site/",iconLabel:"AP",status:"available",navigationOrder:1},
 {_id:"tool-rushing",title:"Basic rushing",slug:"basic-rushing",description:"Review rushing data through a focused, easy-to-scan view.",sport:"NFL",sportSlug:"nfl",url:"https://advanced-rushing-data.cookthebookies.chatgpt.site/",iconLabel:"BR",status:"available",navigationOrder:2},
 {_id:"tool-rankings",title:"Advanced rushing rankings",slug:"advanced-rushing-rankings",description:"Compare rushing output and rankings with additional context.",sport:"NFL",sportSlug:"nfl",url:"https://nfl-advanced-rushing-rankings.cookthebookies.chatgpt.site/",iconLabel:"AR",status:"available",navigationOrder:3},
 {_id:"tool-alignment",title:"Alignment matchups",slug:"alignment-matchups",description:"Explore player alignment and matchup context.",sport:"NFL",sportSlug:"nfl",url:"https://nfl-alignment-matchups.cookthebookies.chatgpt.site/",iconLabel:"AM",status:"available",navigationOrder:4},
 {_id:"tool-coverage",title:"Coverage scheme analytics",slug:"coverage-scheme-analytics",description:"Investigate defensive coverage trends and scheme-level context.",sport:"NFL",sportSlug:"nfl",url:"https://jbi-defensive-coverage-analytics.cookthebookies.chatgpt.site/",iconLabel:"CS",status:"available",navigationOrder:5},
 {_id:"tool-mlb",title:"MLB daily matchups",slug:"mlb-daily-matchups",description:"Open the daily MLB matchup research app hosted on Streamlit.",sport:"MLB",sportSlug:"mlb",url:"https://dailymatchups-b5vzfmbskcwfnvskb6faqt.streamlit.app/",iconLabel:"MLB",status:"available",navigationOrder:6}
];
export const FALLBACK_PAGES:SitePage[]=[
 {_id:"page-about",title:"About Just-Bet-It",slug:"about-us",excerpt:"Just-Bet-It brings sports articles, matchup research, player-prop coverage and specialist data tools together in one place.",externalUrl:"https://just-bet-it.com/about-us/",externalLabel:"Read the original About page"},
 {_id:"page-feedback",title:"Give feedback",slug:"give-feedback",excerpt:"Have a suggestion, correction or question about the site? The original feedback page remains available while this page is migrated.",externalUrl:"https://just-bet-it.com/give-feedback/",externalLabel:"Open the original feedback page"},
 {_id:"page-apparel",title:"Just-Bet-It apparel",slug:"apparel",excerpt:"The original apparel destination is preserved while the store content and product details are migrated.",externalUrl:"https://just-bet-it.com/apparel/",externalLabel:"Visit the original apparel page"},
 {_id:"page-terms",title:"Terms and Conditions",slug:"terms-and-conditions",excerpt:"The original terms remain authoritative until their full text has been reviewed and migrated.",externalUrl:"https://just-bet-it.com/terms-and-conditions/",externalLabel:"Read the original Terms and Conditions"},
 {_id:"page-privacy",title:"Privacy Policy",slug:"privacy-policy-2",excerpt:"The original privacy policy remains authoritative until its full text has been reviewed and migrated.",externalUrl:"https://just-bet-it.com/privacy-policy-2/",externalLabel:"Read the original Privacy Policy"}
];
const ARTICLE_FIELDS='_id,title,"slug":slug.current,excerpt,"sport":sport->title,"sportSlug":sport->slug.current,"category":contentCategory,"author":author->name,publishedAt,featured,accessLevel,sourceUrl,seoTitle,seoDescription,"heroImageUrl":heroImage.asset->url,"heroImageAlt":heroImage.alt';
const PAGE_FIELDS='_id,title,"slug":slug.current,excerpt,body,seoTitle,seoDescription,externalUrl,externalLabel,publishedAt';
export async function getSiteSettings():Promise<SiteSettings>{
 if(!isSanityConfigured)return DEFAULT_SETTINGS;
 try{
  const data=await sanityClient.fetch<Partial<SiteSettings>|null>('*[_type=="siteSettings" && _id=="siteSettings"][0]{siteName,tagline,heroEyebrow,heroTitle,heroDescription,heroPrimaryLabel,heroPrimaryHref,heroSecondaryLabel,heroSecondaryHref,storiesTitle,storiesDescription,sportsTitle,sportsDescription,toolsTitle,toolsDescription,propalyticsUrl,propalyticsTitle,propalyticsDescription,aboutTitle,aboutDescription,principles[]{title,description},archiveTitle,archiveDescription,faqTitle,faqDescription,faqItems[]{question,answer},disclaimer,navLinks[]{label,href,external,enabled,order},footerLinks[]{group,label,href,external,enabled,order},socialLinks[]{network,url}}',{}, {next:{revalidate:60}});
  if(!data)return DEFAULT_SETTINGS;
  return {...DEFAULT_SETTINGS,...data,principles:Array.isArray(data.principles)?data.principles:DEFAULT_SETTINGS.principles,faqItems:Array.isArray(data.faqItems)?data.faqItems:DEFAULT_SETTINGS.faqItems,navLinks:Array.isArray(data.navLinks)?data.navLinks.filter(x=>x.enabled!==false).sort((a,b)=>(a.order||0)-(b.order||0)):DEFAULT_SETTINGS.navLinks,footerLinks:Array.isArray(data.footerLinks)?data.footerLinks.filter(x=>x.enabled!==false).sort((a,b)=>(a.order||0)-(b.order||0)):DEFAULT_SETTINGS.footerLinks,socialLinks:Array.isArray(data.socialLinks)?data.socialLinks:DEFAULT_SETTINGS.socialLinks};
 }catch(error){console.error("CMS settings query failed.",error);return DEFAULT_SETTINGS;}
}
export async function getCategories():Promise<SportCategory[]>{
 if(!isSanityConfigured)return FALLBACK_CATEGORIES;
 try{const data=await sanityClient.fetch<SportCategory[]>('*[_type=="category" && enabled==true] | order(navigationOrder asc,title asc){_id,title,"slug":slug.current,sportKey,description,navigationOrder}',{}, {next:{revalidate:60}});return data?.length?data:FALLBACK_CATEGORIES;}
 catch(error){console.error("CMS categories query failed.",error);return FALLBACK_CATEGORIES;}
}
export async function getArticles(options?:{limit?:number;sportSlug?:string;contentCategory?:string}):Promise<Article[]>{
 const limit=Math.max(1,Math.min(options?.limit||12,100));
 if(!isSanityConfigured){let list=FALLBACK_ARTICLES;if(options?.sportSlug)list=list.filter(x=>x.sportSlug===options.sportSlug);if(options?.contentCategory)list=list.filter(x=>x.category===options.contentCategory);return list.slice(0,limit);}
 try{
  let filter='*[_type=="article" && defined(slug.current) && defined(publishedAt) && publishedAt<=now()';
  if(options?.sportSlug)filter+=' && sport->slug.current==$sportSlug';
  if(options?.contentCategory)filter+=' && contentCategory==$contentCategory';
  filter+=']';
  return (await sanityClient.fetch<Article[]>(filter+' | order(featured desc,publishedAt desc)[0...$limit]{'+ARTICLE_FIELDS+'}',{limit,sportSlug:options?.sportSlug||"",contentCategory:options?.contentCategory||""},{next:{revalidate:60}}))||[];
 }catch(error){console.error("CMS articles query failed.",error);return [];}
}
export async function getArticleBySlug(slug:string):Promise<Article|null>{
 if(!isSanityConfigured)return FALLBACK_ARTICLES.find(x=>x.slug===slug)||null;
 try{const result=await sanityClient.fetch<Article|null>(' *[_type=="article" && slug.current==$slug && defined(publishedAt) && publishedAt<=now()][0]{'+ARTICLE_FIELDS+',body}',{slug},{next:{revalidate:60}});return result||FALLBACK_ARTICLES.find(x=>x.slug===slug)||null;}
 catch(error){console.error("CMS article page query failed.",error);return FALLBACK_ARTICLES.find(x=>x.slug===slug)||null;}
}
export async function getTools():Promise<ResearchTool[]>{
 if(!isSanityConfigured)return FALLBACK_TOOLS;
 try{const data=await sanityClient.fetch<ResearchTool[]>('*[_type=="tool" && status!="hidden"] | order(navigationOrder asc,title asc){_id,title,"slug":slug.current,description,"sport":sport->title,"sportSlug":sport->slug.current,url,iconLabel,status,navigationOrder}',{}, {next:{revalidate:60}});return data?.length?data:FALLBACK_TOOLS;}
 catch(error){console.error("CMS tools query failed.",error);return FALLBACK_TOOLS;}
}
export async function getSitePages():Promise<SitePage[]>{
 if(!isSanityConfigured)return FALLBACK_PAGES;
 try{const data=await sanityClient.fetch<SitePage[]>('*[_type=="sitePage" && status=="published" && defined(slug.current)] | order(title asc){'+PAGE_FIELDS+'}',{}, {next:{revalidate:60}});return data?.length?data:FALLBACK_PAGES;}
 catch(error){console.error("CMS website pages query failed.",error);return FALLBACK_PAGES;}
}
export async function getSitePageBySlug(slug:string):Promise<SitePage|null>{
 if(!isSanityConfigured)return FALLBACK_PAGES.find(x=>x.slug===slug)||null;
 try{const result=await sanityClient.fetch<SitePage|null>(' *[_type=="sitePage" && slug.current==$slug && status=="published"][0]{'+PAGE_FIELDS+'}',{slug},{next:{revalidate:60}});return result||FALLBACK_PAGES.find(x=>x.slug===slug)||null;}
 catch(error){console.error("CMS page detail query failed.",error);return FALLBACK_PAGES.find(x=>x.slug===slug)||null;}
}
export function formatDate(value?:string):string{if(!value)return"Research";const date=new Date(value);return Number.isNaN(date.getTime())?"Research":date.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"});}
