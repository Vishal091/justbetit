import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/client-ui";
import { getCategories,getSiteSettings,getTools } from "@/sanity/content";
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||"https://just-bet-it.com";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Just-Bet-It | Sports Research & Analytics",template:"%s | Just-Bet-It"},description:"Sports analysis, matchup previews, player-prop research and sports data tools. Research first. Read the game with context.",openGraph:{siteName:"Just-Bet-It",type:"website",title:"Just-Bet-It | Sports Research & Analytics",description:"Matchup previews, player-prop context and data tools for sports research."},twitter:{card:"summary_large_image",title:"Just-Bet-It | Sports Research & Analytics",description:"Research first. Read the game with context."},robots:{index:true,follow:true}};
export const viewport:Viewport={themeColor:"#0b0e0c",colorScheme:"dark"};
export const revalidate=60;
export default async function RootLayout({children}:{children:React.ReactNode}) {
  const [settings,sports,tools]=await Promise.all([getSiteSettings(),getCategories(),getTools()]);
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><div className="announcement"><div className="shell announcement-inner"><span>{settings.tagline}</span><a href={settings.propalyticsUrl} target="_blank" rel="noopener noreferrer">Explore Propalytics ↗</a></div></div><SiteHeader sports={sports} siteName={settings.siteName} propalyticsUrl={settings.propalyticsUrl}/>{children}<SiteFooter settings={settings} sports={sports} tools={tools}/></body></html>;
}