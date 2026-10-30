import type {Metadata,Viewport} from "next";
import "./globals.css";
import {SiteHeader,SiteFooter} from "@/components/client-ui";
import {getCategories,getSiteSettings,getTools} from "@/sanity/content";
const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||"https://just-bet-it.com").replace(/\/$/,"");
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Just-Bet-It | Sports Research, Analysis & Data Tools",template:"%s | Just-Bet-It"},description:"Sports analysis, matchup previews, player-prop research and purpose-built data tools from Just-Bet-It.",openGraph:{siteName:"Just-Bet-It",type:"website",title:"Just-Bet-It — Read the game. Not the hype.",description:"Matchup previews, player-prop context and sports research tools in one place."},twitter:{card:"summary_large_image",title:"Just-Bet-It — Sports Research & Analysis",description:"Matchup research, player-prop context and data tools."},robots:{index:true,follow:true}};
export const viewport:Viewport={themeColor:"#0b0e0c",colorScheme:"dark"};
export const revalidate=60;
export default async function RootLayout({children}:{children:React.ReactNode}){
 const[settings,sports,tools]=await Promise.all([getSiteSettings(),getCategories(),getTools()]);
 return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><div className="announcement"><div className="shell announcement-inner"><span>{settings.tagline}</span><a href={settings.propalyticsUrl} target="_blank" rel="noopener noreferrer">Explore Propalytics ↗</a></div></div><SiteHeader sports={sports} settings={settings}/>{children}<SiteFooter settings={settings} tools={tools}/></body></html>;
}
