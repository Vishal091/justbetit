import type { Metadata,Viewport } from "next";
import "./globals.css";
import {AppShell} from "@/components/app-shell";
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||"https://just-bet-it.com";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Just-Bet-It | Sports Intelligence",template:"%s | Just-Bet-It"},description:"A sports research workspace for bookmaker price comparison, player props, matchup context and bankroll education.",openGraph:{siteName:"Just-Bet-It",type:"website",title:"Just-Bet-It | Sports Intelligence",description:"Compare sports markets, research matchups and understand probabilities."},twitter:{card:"summary_large_image",title:"Just-Bet-It | Sports Intelligence",description:"Sports market research and analytics."},robots:{index:true,follow:true}};
export const viewport:Viewport={themeColor:"#0b0e0c",colorScheme:"dark"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><AppShell>{children}</AppShell></body></html>;}
