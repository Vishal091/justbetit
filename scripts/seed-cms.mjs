import { createClient } from "next-sanity";
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2026-10-30";
if(!projectId){console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local.");process.exit(1);}
if(!token){console.error("Missing SANITY_API_WRITE_TOKEN in .env.local. Use a local editor/write token, seed once, then remove it.");process.exit(1);}
const client=createClient({projectId,dataset,apiVersion,token,useCdn:false});
const sports=[
 {_id:"category-nfl",_type:"category",title:"NFL",slug:{_type:"slug",current:"nfl"},sportKey:"americanfootball_nfl",description:"Matchup previews, player props, betting coverage and DFS.",navigationOrder:1,enabled:true},
 {_id:"category-cfb",_type:"category",title:"College Football",slug:{_type:"slug",current:"cfb"},sportKey:"americanfootball_ncaaf",description:"College football matchups, ATS/totals and slate notes.",navigationOrder:2,enabled:true},
 {_id:"category-nba",_type:"category",title:"NBA",slug:{_type:"slug",current:"nba"},sportKey:"basketball_nba",description:"Daily game previews, player props and basketball research.",navigationOrder:3,enabled:true},
 {_id:"category-mlb",_type:"category",title:"MLB",slug:{_type:"slug",current:"mlb"},sportKey:"baseball_mlb",description:"Baseball matchups, hitting trends and daily research.",navigationOrder:4,enabled:true},
 {_id:"category-ufc",_type:"category",title:"UFC / MMA",slug:{_type:"slug",current:"ufc"},sportKey:"mma_mixed_martial_arts",description:"Fight previews, betting guides and DFS coverage.",navigationOrder:5,enabled:true}
];
const author={_id:"author-jbi-staff",_type:"author",name:"Just-Bet-It Staff",slug:{_type:"slug",current:"just-bet-it-staff"},bio:"Editorial team at Just-Bet-It."};
const toolRows=[
 ["tool-passing","Advanced passing","advanced-passing","Explore advanced passing context and compare quarterback and team profiles.","category-nfl","https://jbi-advanced-passing.cookthebookies.chatgpt.site/","AP",1],
 ["tool-rushing","Basic rushing","basic-rushing","Review rushing data through a focused, easy-to-scan view.","category-nfl","https://advanced-rushing-data.cookthebookies.chatgpt.site/","BR",2],
 ["tool-rankings","Advanced rushing rankings","advanced-rushing-rankings","Compare rushing output and rankings with additional context.","category-nfl","https://nfl-advanced-rushing-rankings.cookthebookies.chatgpt.site/","AR",3],
 ["tool-alignment","Alignment matchups","alignment-matchups","Explore player alignment and matchup context.","category-nfl","https://nfl-alignment-matchups.cookthebookies.chatgpt.site/","AM",4],
 ["tool-coverage","Coverage scheme analytics","coverage-scheme-analytics","Investigate defensive coverage trends and scheme-level context.","category-nfl","https://jbi-defensive-coverage-analytics.cookthebookies.chatgpt.site/","CS",5],
 ["tool-mlb","MLB daily matchups","mlb-daily-matchups","Open the daily MLB matchup research app hosted on Streamlit.","category-mlb","https://dailymatchups-b5vzfmbskcwfnvskb6faqt.streamlit.app/","MLB",6]
];
const tools=toolRows.map(([id,title,slug,description,sport,url,iconLabel,order])=>({_id:id,_type:"tool",title,slug:{_type:"slug",current:slug},description,sport:{_type:"reference",_ref:sport},url,iconLabel,status:"available",navigationOrder:order}));
const settings={
 _id:"siteSettings",_type:"siteSettings",siteName:"Just-Bet-It",tagline:"Research first. Read the game with context.",
 heroEyebrow:"Sports intelligence, without the noise",heroTitle:"Read the game. Not the hype.",
 heroDescription:"Matchup previews, player-prop context and research tools that make the numbers easier to understand. Start with the evidence. Build your own view of the slate.",
 heroPrimaryLabel:"Explore latest analysis",heroPrimaryHref:"/articles",heroSecondaryLabel:"Explore data tools",heroSecondaryHref:"/#tools",
 storiesTitle:"Analysis worth your attention.",storiesDescription:"Game previews, player-prop research, ATS/totals and slate notes—organized so you can get to the coverage you need.",
 sportsTitle:"One home for the whole slate.",sportsDescription:"Explore sport-specific articles, betting coverage and DFS archives.",
 toolsTitle:"Go deeper than the headline.",toolsDescription:"Purpose-built research tools help break down passing, rushing, alignment, coverage and MLB matchups.",
 propalyticsUrl:"https://propalytics.bet/",propalyticsTitle:"Bring the numbers into focus.",propalyticsDescription:"Continue to Propalytics for its connected sports analytics and member features. Account access remains on the separate service.",
 aboutTitle:"Better questions. Clearer context.",aboutDescription:"Just-Bet-It publishes sports analysis, matchup previews, player-prop research and data-led editorial coverage. The site brings articles, sport archives and specialist tools into one clear place.",
 principles:[{title:"Evidence before opinion",description:"Lead with context and the data behind a takeaway."},{title:"Research with a clear path",description:"Find sport archives, coverage types and specialist tools without hunting through menus."},{title:"Responsible by design",description:"Keep limitations and the entertainment-only disclaimer visible."}],
 archiveTitle:"Find the coverage you need.",archiveDescription:"Browse sport-specific articles, betting coverage and DFS collections from the original Just-Bet-It site.",
 faqTitle:"Clarity before you click.",faqDescription:"A few quick answers about the content, external tools and product links.",
 faqItems:[{question:"Does Just-Bet-It place bets?",answer:"No. Just-Bet-It publishes sports research and editorial coverage. It is not a sportsbook and does not place wagers."},{question:"Are all articles available to everyone?",answer:"Some coverage may be marked for Propalytics members. Those articles direct readers to the existing Propalytics service for access."},{question:"Are the research tools hosted on this website?",answer:"Some tools are separate hosted destinations. Each external tool is clearly labelled and opens in a new tab."},{question:"Do analysis or prop picks guarantee an outcome?",answer:"No. Sports are uncertain. Research can provide context, but it cannot guarantee a result or remove risk."},{question:"Where can I send feedback?",answer:"Use the Give Feedback page to reach the Just-Bet-It team."}],
 navLinks:[{label:"Analysis",href:"/articles",order:1},{label:"Sports",href:"/#sports",order:2},{label:"Data suite",href:"/#tools",order:3},{label:"Propalytics",href:"https://propalytics.bet/",external:true,order:4},{label:"About",href:"/about-us",order:5}],
 footerLinks:[{group:"Explore",label:"Latest analysis",href:"/articles",order:1},{group:"Explore",label:"Sports coverage",href:"/#sports",order:2},{group:"Explore",label:"Data suite",href:"/#tools",order:3},{group:"Explore",label:"Apparel",href:"/apparel",order:4},{group:"Products",label:"Propalytics",href:"https://propalytics.bet/",external:true,order:1},{group:"Support & legal",label:"About Just-Bet-It",href:"/about-us",order:1},{group:"Support & legal",label:"Give feedback",href:"/give-feedback",order:2},{group:"Support & legal",label:"Terms and Conditions",href:"/terms-and-conditions",order:3},{group:"Support & legal",label:"Privacy Policy",href:"/privacy-policy-2",order:4}],
 disclaimer:"This site is for entertainment purposes only and does not involve real-money betting. Sports outcomes are uncertain. Research does not guarantee a result. Use responsible judgment and follow the rules in your jurisdiction.",
 socialLinks:[{network:"X",url:"https://x.com/Justbetit33"}]
};
const articles=[
 {_id:"legacy-nfl-week-8",_type:"article",title:"NFL Week 8 Sunday Slate Game Previews",slug:{_type:"slug",current:"nfl-week-8-sunday-slate-game-previews"},excerpt:"A slate-level look at matchups, availability and the factors that can shift a game script.",sport:{_type:"reference",_ref:"category-nfl"},contentCategory:"Game preview",author:{_type:"reference",_ref:author._id},publishedAt:"2026-10-28T12:00:00.000Z",featured:true,accessLevel:"members",body:[],sourceUrl:"https://just-bet-it.com/nfl-week-8-sunday-slate-game-previews/"},
 {_id:"legacy-cfb-week-8",_type:"article",title:"CFB Week 8 Top ATS / Total Picks",slug:{_type:"slug",current:"cfb-week-8-top-ats-total-picks"},excerpt:"College football slate notes and spread/total coverage from the editorial archive.",sport:{_type:"reference",_ref:"category-cfb"},contentCategory:"ATS / totals",author:{_type:"reference",_ref:author._id},publishedAt:"2026-10-23T12:00:00.000Z",featured:false,accessLevel:"public",body:[],sourceUrl:"https://just-bet-it.com/cfb-week-8-top-ats-total-picks/"},
 {_id:"legacy-nba-previews",_type:"article",title:"10/29/26 NBA Game Previews",slug:{_type:"slug",current:"10-29-26-nba-game-previews"},excerpt:"Daily matchup coverage with context around recent form and opponents on the schedule.",sport:{_type:"reference",_ref:"category-nba"},contentCategory:"Game preview",author:{_type:"reference",_ref:author._id},publishedAt:"2026-10-29T12:00:00.000Z",featured:false,accessLevel:"public",body:[],sourceUrl:"https://just-bet-it.com/10-29-26-nba-game-previews/"},
 {_id:"legacy-nba-props",_type:"article",title:"10/27/26 NBA Top Prop Picks",slug:{_type:"slug",current:"10-27-26-nba-top-prop-picks"},excerpt:"Player-prop editorial coverage from the NBA archive. Review context before forming a view.",sport:{_type:"reference",_ref:"category-nba"},contentCategory:"Player props",author:{_type:"reference",_ref:author._id},publishedAt:"2026-10-27T12:00:00.000Z",featured:false,accessLevel:"members",body:[],sourceUrl:"https://just-bet-it.com/10-27-26-nba-top-prop-picks/"}
];
const pages=[
 {_id:"page-about",_type:"sitePage",title:"About Just-Bet-It",slug:{_type:"slug",current:"about-us"},excerpt:"Just-Bet-It brings sports articles, matchup research, player-prop coverage and specialist data tools together in one place.",externalUrl:"https://just-bet-it.com/about-us/",externalLabel:"Read the original About page",status:"published"},
 {_id:"page-feedback",_type:"sitePage",title:"Give feedback",slug:{_type:"slug",current:"give-feedback"},excerpt:"Have a suggestion, correction or question about the site? The original feedback page remains available while this page is migrated.",externalUrl:"https://just-bet-it.com/give-feedback/",externalLabel:"Open the original feedback page",status:"published"},
 {_id:"page-apparel",_type:"sitePage",title:"Just-Bet-It apparel",slug:{_type:"slug",current:"apparel"},excerpt:"The original apparel destination is preserved while store content and product details are migrated.",externalUrl:"https://just-bet-it.com/apparel/",externalLabel:"Visit the original apparel page",status:"published"},
 {_id:"page-terms",_type:"sitePage",title:"Terms and Conditions",slug:{_type:"slug",current:"terms-and-conditions"},excerpt:"The original terms remain authoritative until their full text has been reviewed and migrated.",externalUrl:"https://just-bet-it.com/terms-and-conditions/",externalLabel:"Read the original Terms and Conditions",status:"published"},
 {_id:"page-privacy",_type:"sitePage",title:"Privacy Policy",slug:{_type:"slug",current:"privacy-policy-2"},excerpt:"The original privacy policy remains authoritative until its full text has been reviewed and migrated.",externalUrl:"https://just-bet-it.com/privacy-policy-2/",externalLabel:"Read the original Privacy Policy",status:"published"}
];
const documents=[...sports,author,...tools,settings,...articles,...pages];
const transaction=client.transaction();for(const document of documents)transaction.createIfNotExists(document);
const result=await transaction.commit();console.log("Seeded",documents.length,"starter CMS records when missing. Transaction:",result.transactionId);
